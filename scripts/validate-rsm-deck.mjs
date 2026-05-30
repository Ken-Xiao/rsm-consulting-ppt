#!/usr/bin/env node
/*
 * RSM deck validator
 *
 * Usage:
 *   node scripts/validate-rsm-deck.mjs outputs/rsm_deck
 *
 * The validator is intentionally dependency-free. It checks the artifacts that
 * the skill requires before a deck can be called manager-ready or client-ready.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const args = process.argv.slice(2);
const rootArg = args.find((arg) => !arg.startsWith("--") && arg !== args[args.indexOf("--skill-root") + 1]);
const root = rootArg ? path.resolve(rootArg) : process.cwd();
const argSkillRoot = args.includes("--skill-root") ? args[args.indexOf("--skill-root") + 1] : null;
const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const skillRoot = argSkillRoot ? path.resolve(argSkillRoot) : path.resolve(scriptDir, "..");

const result = {
  root,
  status: "pass",
  critical: [],
  major: [],
  warning: [],
  info: [],
};

function exists(rel) {
  return fs.existsSync(path.join(root, rel));
}

function readJson(rel, required = true) {
  const file = path.join(root, rel);
  if (!fs.existsSync(file)) {
    if (required) result.critical.push({ artifact: rel, issue: "missing file" });
    return null;
  }
  try {
    return JSON.parse(fs.readFileSync(file, "utf8"));
  } catch (error) {
    result.critical.push({ artifact: rel, issue: "invalid JSON", detail: error.message });
    return null;
  }
}

function requireFields(obj, rel, fields, severity = "critical") {
  if (!obj) return;
  for (const field of fields) {
    if (obj[field] === undefined || obj[field] === null || obj[field] === "") {
      result[severity].push({ artifact: rel, issue: `missing required field: ${field}` });
    }
  }
}

function arr(value) {
  return Array.isArray(value) ? value : [];
}

function artifactPath(rel) {
  const direct = path.join(root, rel);
  const nested = path.join(root, "artifacts", rel);
  if (fs.existsSync(direct)) return direct;
  if (fs.existsSync(nested)) return nested;
  return direct;
}

function readArtifactJson(name, required = true) {
  const direct = path.relative(root, artifactPath(name));
  return readJson(direct, required);
}

const brief = readArtifactJson("brief.json", false);
if (brief) {
  requireFields(brief, "brief.json", [
    "audience",
    "client_question",
    "subject",
    "data_sources",
    "target_pages",
    "visual_profile",
    "delivery_context",
  ], "major");
  if (brief.client_question && !/(是否|如何|优先|能否|应否|什么|哪些|怎么)/.test(brief.client_question)) {
    result.warning.push({ artifact: "brief.json", issue: "client_question may be a topic rather than a decision question" });
  }
}

const consultingPyramid = readArtifactJson("consulting_pyramid.json", false);
if (consultingPyramid) {
  requireFields(consultingPyramid, "consulting_pyramid.json", [
    "client_question",
    "client_answer",
    "executive_question",
    "deck_answer",
    "chapter_answers",
  ], "major");
  if (arr(consultingPyramid.chapter_answers).length === 0) {
    result.major.push({ artifact: "consulting_pyramid.json", issue: "chapter_answers is empty" });
  }
}

const storyline = readArtifactJson("storyline_map.json", false);
if (storyline) {
  const pages = arr(storyline.pages || storyline);
  if (pages.length === 0) result.major.push({ artifact: "storyline_map.json", issue: "no pages found" });
  for (const page of pages) {
    const id = page.page_id || "unknown";
    for (const field of ["claim_title", "page_role", "logic_relationship", "chapter_answer_link"]) {
      if (!page[field]) result.major.push({ page: id, artifact: "storyline_map.json", issue: `missing ${field}` });
    }
    if (/^(背景|现状|数据|情况|分析|介绍|说明)/.test(page.claim_title || "")) {
      result.major.push({ page: id, artifact: "storyline_map.json", issue: "claim_title looks like a topic, not a conclusion" });
    }
  }
}

const presetMap = readArtifactJson("preset_map.json", false);
if (presetMap) {
  const pages = arr(presetMap.pages || presetMap);
  for (const page of pages) {
    const id = page.page_id || "unknown";
    for (const field of ["visual_profile", "page_family", "density_level", "render_strategy", "editable_elements", "rasterized_elements", "qa_focus"]) {
      if (!page[field]) result.major.push({ page: id, artifact: "preset_map.json", issue: `missing ${field}` });
    }
    if (!page.exhibit_structure && !/cover|agenda|section/i.test(page.page_family || "")) {
      result.major.push({ page: id, artifact: "preset_map.json", issue: "body page missing exhibit_structure" });
    }
  }
}

const conclusionMatrix = readArtifactJson("conclusion_evidence_matrix.json", false);
if (conclusionMatrix) {
  for (const item of arr(conclusionMatrix.conclusions || conclusionMatrix)) {
    const id = item.conclusion_id || "unknown";
    for (const field of ["conclusion", "evidence", "limitations", "language_strength", "pages"]) {
      if (!item[field]) result.major.push({ conclusion_id: id, artifact: "conclusion_evidence_matrix.json", issue: `missing ${field}` });
    }
  }
}

const manifestPath = path.join(skillRoot, "assets", "layouts", "template-manifest.json");
if (fs.existsSync(manifestPath)) {
  try {
    const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
    const seen = new Set();
    for (const tpl of arr(manifest.templates)) {
      if (seen.has(tpl.preset_family)) {
        result.major.push({ artifact: "template-manifest.json", issue: `duplicate preset_family: ${tpl.preset_family}` });
      }
      seen.add(tpl.preset_family);
      const tplFile = path.join(skillRoot, tpl.template_file || "");
      if (!fs.existsSync(tplFile)) {
        result.critical.push({ artifact: "template-manifest.json", preset_family: tpl.preset_family, issue: "template_file does not exist" });
      }
      for (const field of ["preset_family", "visual_profile", "template_file", "required_fields", "render_tracks", "editable_elements", "qa_focus"]) {
        if (!tpl[field]) result.major.push({ artifact: "template-manifest.json", preset_family: tpl.preset_family, issue: `missing ${field}` });
      }
    }
  } catch (error) {
    result.critical.push({ artifact: "template-manifest.json", issue: "invalid JSON", detail: error.message });
  }
} else {
  result.critical.push({ artifact: "template-manifest.json", issue: "missing skill manifest" });
}

const chartDir = path.join(root, "chart_data");
if (fs.existsSync(chartDir)) {
  for (const file of fs.readdirSync(chartDir).filter((f) => f.endsWith(".json"))) {
    const rel = path.join("chart_data", file);
    const chart = readJson(rel, false);
    if (!chart) continue;
    for (const field of ["chart_point_of_view", "unit", "period", "sample", "source", "lineage_ids"]) {
      if (!chart[field]) result.major.push({ artifact: rel, issue: `missing chart field: ${field}` });
    }
  }
}

const review = readArtifactJson("review_report.json", false);
if (review) {
  if (!review.logic_gate_review) result.warning.push({ artifact: "review_report.json", issue: "missing logic_gate_review" });
  if (!review.language_rewrite_review) result.warning.push({ artifact: "review_report.json", issue: "missing language_rewrite_review" });
  if (!review.editable_component_review) result.warning.push({ artifact: "review_report.json", issue: "missing editable_component_review" });
  if (!review.quality_scorecard) result.warning.push({ artifact: "review_report.json", issue: "missing quality_scorecard" });
}

if (!exists("draft/contact_sheet.png") && !exists("contact_sheet.png") && !exists("final/contact_sheet.png")) {
  result.warning.push({ artifact: "contact_sheet.png", issue: "contact sheet not found" });
}

if (result.critical.length > 0) result.status = "critical";
else if (result.major.length > 0) result.status = "major";
else if (result.warning.length > 0) result.status = "warning";

console.log(JSON.stringify(result, null, 2));
process.exit(result.critical.length > 0 ? 2 : result.major.length > 0 ? 1 : 0);
