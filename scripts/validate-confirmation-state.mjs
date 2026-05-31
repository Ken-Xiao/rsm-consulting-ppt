#!/usr/bin/env node
/*
 * Confirmation state validator
 *
 * Usage:
 *   node scripts/validate-confirmation-state.mjs <artifact_dir> --tier client-ready --stage S2.5
 */

import fs from "node:fs";
import path from "node:path";

const args = process.argv.slice(2);
const rootArg = args.find((arg) => !arg.startsWith("--") && arg !== args[args.indexOf("--tier") + 1] && arg !== args[args.indexOf("--stage") + 1]);
const root = rootArg ? path.resolve(rootArg) : process.cwd();
const tier = args.includes("--tier") ? args[args.indexOf("--tier") + 1] : "partner-ready";
const stage = args.includes("--stage") ? args[args.indexOf("--stage") + 1] : "S2.5";

const result = {
  root,
  tier,
  stage,
  status: "pass",
  critical: [],
  warning: [],
  info: [],
};

function artifactPath(name) {
  const direct = path.join(root, name);
  const nested = path.join(root, "artifacts", name);
  if (fs.existsSync(direct)) return direct;
  if (fs.existsSync(nested)) return nested;
  return direct;
}

function readJson(name) {
  const file = artifactPath(name);
  if (!fs.existsSync(file)) {
    result.critical.push({ artifact: name, issue: "missing file" });
    return null;
  }
  try {
    return JSON.parse(fs.readFileSync(file, "utf8"));
  } catch (error) {
    result.critical.push({ artifact: name, issue: "invalid JSON", detail: error.message });
    return null;
  }
}

const allowed = new Set(["confirmed", "confirmed_with_changes", "assumed_user_requested_direct", "preview_unavailable_confirmed"]);
const blocking = new Set([
  "pending",
  "blocked",
  "pending_user_answers",
  "pending_framework_confirmation",
  "pending_layout_confirmation",
  "pending_html_preview_confirmation",
  "revise_required",
]);

const requirementsByStage = {
  S0: [],
  S1: [],
  "S1.5": ["CN1_framework"],
  "S1.6": ["CN1_framework"],
  S2: ["CN1_framework", "CN2_layout"],
  "S2.5": ["CN1_framework", "CN2_layout"],
  "S2.6": ["CN1_framework", "CN2_layout"],
  S3: ["CN1_framework", "CN2_layout", "CN3_html_preview"],
  S4: ["CN1_framework", "CN2_layout", "CN3_html_preview"],
  S5: ["CN1_framework", "CN2_layout", "CN3_html_preview"],
  S6: ["CN1_framework", "CN2_layout", "CN3_html_preview"],
};

function requiredNodesFor(tierName, stageName) {
  if (["express", "quick-polish"].includes(tierName)) return [];
  const base = requirementsByStage[stageName] || [];
  if (tierName === "partner-ready") {
    return base.filter((node) => node !== "CN3_html_preview");
  }
  return base;
}

const requiredNodes = requiredNodesFor(tier, stage);
const logPath = artifactPath("confirmation_log.json");
let log = null;
if (fs.existsSync(logPath)) {
  log = readJson("confirmation_log.json");
} else if (requiredNodes.length > 0) {
  result.critical.push({ artifact: "confirmation_log.json", issue: "missing file" });
} else {
  result.info.push({ artifact: "confirmation_log.json", issue: "no confirmation log required for this tier/stage" });
}
if (log) {
  const nodes = Array.isArray(log.nodes) ? log.nodes : [];
  const byName = new Map(nodes.map((node) => [node.node, node]));

  for (const nodeName of requiredNodes) {
    const node = byName.get(nodeName);
    if (!node) {
      result.critical.push({ artifact: "confirmation_log.json", node: nodeName, issue: "missing required confirmation node" });
      continue;
    }
    if (blocking.has(node.status)) {
      result.critical.push({ artifact: "confirmation_log.json", node: nodeName, issue: `stage blocked by confirmation status: ${node.status}` });
      continue;
    }
    if (!allowed.has(node.status)) {
      result.critical.push({ artifact: "confirmation_log.json", node: nodeName, issue: `unsupported confirmation status: ${node.status}` });
    }
    if (!node.user_signal && node.status !== "assumed_user_requested_direct") {
      result.warning.push({ artifact: "confirmation_log.json", node: nodeName, issue: "missing user_signal" });
    }
    if (!node.artifact_versions_locked || node.artifact_versions_locked.length === 0) {
      result.warning.push({ artifact: "confirmation_log.json", node: nodeName, issue: "missing artifact_versions_locked" });
    }
  }

  if (requiredNodes.length === 0) {
    result.info.push({ artifact: "confirmation_log.json", issue: "no confirmation gate required for this tier/stage" });
  }
}

if (result.critical.length > 0) result.status = "critical";
else if (result.warning.length > 0) result.status = "warning";

console.log(JSON.stringify(result, null, 2));
process.exit(result.critical.length > 0 ? 2 : 0);
