#!/usr/bin/env node
/*
 * Validate RSM template manifest and HTML layout files.
 *
 * Usage:
 *   node scripts/validate-layout-manifest.mjs
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const argSkillRoot = process.argv.includes("--skill-root")
  ? process.argv[process.argv.indexOf("--skill-root") + 1]
  : null;
const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const skillRoot = argSkillRoot ? path.resolve(argSkillRoot) : path.resolve(scriptDir, "..");
const manifestFile = path.join(skillRoot, "assets", "layouts", "template-manifest.json");
const profileRegistryFile = path.join(skillRoot, "references", "visual-profile-registry.md");
const report = {
  status: "pass",
  templates: 0,
  missing: [],
  duplicate: [],
  unregisteredProfiles: [],
  structuralWarnings: [],
  layoutLockWarnings: [],
  templatePlaceholders: [],
  profileCoverage: {},
};

const manifest = JSON.parse(fs.readFileSync(manifestFile, "utf8"));
const registeredProfiles = new Set();
if (fs.existsSync(profileRegistryFile)) {
  const registry = fs.readFileSync(profileRegistryFile, "utf8");
  let activeTable = null;
  for (const line of registry.split(/\r?\n/)) {
    if (line.startsWith("## Canonical Profiles")) activeTable = "profiles";
    else if (line.startsWith("## Supported Secondary Profiles")) activeTable = "profiles";
    else if (line.startsWith("## ")) activeTable = null;
    const match = line.match(/^\| `([^`]+)` \|/);
    if (activeTable === "profiles" && match) {
      registeredProfiles.add(match[1]);
    }
  }
}
const seen = new Set();
for (const tpl of manifest.templates || []) {
  report.templates += 1;
  if (seen.has(tpl.preset_family)) report.duplicate.push(tpl.preset_family);
  seen.add(tpl.preset_family);
  report.profileCoverage[tpl.visual_profile] = (report.profileCoverage[tpl.visual_profile] || 0) + 1;
  if (registeredProfiles.size > 0 && !registeredProfiles.has(tpl.visual_profile)) {
    report.unregisteredProfiles.push({ preset_family: tpl.preset_family, visual_profile: tpl.visual_profile });
  }
  const file = path.join(skillRoot, tpl.template_file);
  if (!fs.existsSync(file)) {
    report.missing.push({ preset_family: tpl.preset_family, template_file: tpl.template_file });
    continue;
  }
  const html = fs.readFileSync(file, "utf8");
  const placeholders = [...html.matchAll(/\{\{([^}]+)\}\}/g)].map((m) => m[1]);
  if (!Array.isArray(tpl.required_fields) || tpl.required_fields.length === 0) {
    report.structuralWarnings.push({ preset_family: tpl.preset_family, issue: "required_fields is empty or not an array" });
  }
  if (!Array.isArray(tpl.editable_elements) || tpl.editable_elements.length === 0) {
    report.structuralWarnings.push({ preset_family: tpl.preset_family, issue: "editable_elements is empty or not an array" });
  }
  if (placeholders.length > 0) {
    report.templatePlaceholders.push({ preset_family: tpl.preset_family, placeholders });
  }
}

for (const [profile, lock] of Object.entries(manifest.layout_locks || {})) {
  if (registeredProfiles.size > 0 && !registeredProfiles.has(profile)) {
    report.unregisteredProfiles.push({ layout_lock_profile: profile, visual_profile: profile });
  }
  if (!Array.isArray(lock.allowed) || lock.allowed.length === 0) {
    report.structuralWarnings.push({ visual_profile: profile, issue: "layout_locks.allowed is empty or not an array" });
    continue;
  }
  for (const family of [...(lock.allowed || []), ...(lock.fallback || [])]) {
    if (!seen.has(family)) {
      report.layoutLockWarnings.push({ visual_profile: profile, issue: `layout lock references unregistered preset_family: ${family}` });
    }
  }
}

if (report.missing.length || report.duplicate.length || report.unregisteredProfiles.length) report.status = "fail";
else if (report.structuralWarnings.length || report.layoutLockWarnings.length) report.status = "warning";

console.log(JSON.stringify(report, null, 2));
process.exit(report.status === "fail" ? 1 : 0);
