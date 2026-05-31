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

const manifestPath = path.join(skillRoot, "assets", "layouts", "template-manifest.json");
const designTokensPath = path.join(skillRoot, "assets", "design-tokens.json");
let skillManifest = null;
let designTokens = null;
if (fs.existsSync(manifestPath)) {
  try {
    skillManifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
  } catch (error) {
    result.critical.push({ artifact: "template-manifest.json", issue: "invalid JSON", detail: error.message });
  }
} else {
  result.critical.push({ artifact: "template-manifest.json", issue: "missing skill manifest" });
}

if (fs.existsSync(designTokensPath)) {
  try {
    designTokens = JSON.parse(fs.readFileSync(designTokensPath, "utf8"));
  } catch (error) {
    result.critical.push({ artifact: "design-tokens.json", issue: "invalid JSON", detail: error.message });
  }
} else {
  result.major.push({ artifact: "design-tokens.json", issue: "missing design token file" });
}

function layoutLockFor(profile) {
  return skillManifest?.layout_locks?.[profile] || null;
}

const brief = readArtifactJson("brief.json", false);
const taskTier = brief?.tier || brief?.task_tier || brief?.delivery_tier || null;
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
  if (!brief.tier) result.warning.push({ artifact: "brief.json", issue: "missing tier" });
  if (!brief.audience_expertise_level) {
    result.info.push({ artifact: "brief.json", issue: "missing audience_expertise_level for language calibration" });
  }
  if ((brief.tier === "express" || brief.delivery_status === "internal-draft") && brief.client_ready === true) {
    result.critical.push({ artifact: "brief.json", issue: "express/internal-draft cannot be marked client-ready" });
  }
}

const confirmationLog = readArtifactJson("confirmation_log.json", false);
const requiresConfirmationLog = ["partner-ready", "client-ready", "pipeline"].includes(taskTier);
if (confirmationLog) {
  requireFields(confirmationLog, "confirmation_log.json", ["project_id", "tier", "nodes"], "major");
  const nodes = arr(confirmationLog.nodes);
  const nodeByName = new Map(nodes.map((node) => [node.node, node]));
  const requiredNodes = taskTier === "client-ready" || taskTier === "pipeline"
    ? ["CN1_framework", "CN2_layout", "CN3_html_preview"]
    : taskTier === "partner-ready"
      ? ["CN1_framework", "CN2_layout"]
      : [];
  for (const name of requiredNodes) {
    const node = nodeByName.get(name);
    if (!node) {
      result.major.push({ artifact: "confirmation_log.json", issue: `missing confirmation node: ${name}` });
      continue;
    }
    for (const field of ["status", "requested_at", "user_signal"]) {
      if (!node[field]) result.major.push({ artifact: "confirmation_log.json", node: name, issue: `missing ${field}` });
    }
    if (["pending", "blocked", "pending_user_answers", "pending_framework_confirmation", "pending_layout_confirmation", "pending_html_preview_confirmation"].includes(node.status)) {
      result.major.push({ artifact: "confirmation_log.json", node: name, issue: `confirmation status blocks build: ${node.status}` });
    }
  }
} else if (requiresConfirmationLog) {
  result.warning.push({ artifact: "confirmation_log.json", issue: "missing confirmation log for gated workflow" });
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
    const isBodyPage = !/cover|agenda|section/i.test(page.page_role || page.page_family || "");
    if (isBodyPage) {
      for (const field of ["story_subtitle", "evidence_object", "insight_type", "recommended_page_family", "layout_reason", "content_density_status", "title_fit"]) {
        if (!page[field]) result.warning.push({ page: id, artifact: "storyline_map.json", issue: `missing ${field}` });
      }
      const fitStatus = page.title_fit?.fit_status;
      if (["rewrite_required", "split_page_required"].includes(fitStatus)) {
        result.major.push({ page: id, artifact: "storyline_map.json", issue: `title_fit blocks build: ${fitStatus}` });
      }
      if (page.evidence_items_count === undefined) {
        result.warning.push({ page: id, artifact: "storyline_map.json", issue: "missing evidence_items_count" });
      }
    }
    if (/^(背景|现状|数据|情况|分析|介绍|说明)/.test(page.claim_title || "")) {
      result.major.push({ page: id, artifact: "storyline_map.json", issue: "claim_title looks like a topic, not a conclusion" });
    }
  }
}

const insightLayoutMap = readArtifactJson("insight_layout_map.json", false);
if (insightLayoutMap) {
  const pages = arr(insightLayoutMap.pages || insightLayoutMap.insights || insightLayoutMap);
  for (const page of pages) {
    const id = page.page_id || page.insight_id || "unknown";
    for (const field of ["insight_type", "recommended_page_family", "page_role", "logic_relationship", "layout_reason"]) {
      if (!page[field]) result.major.push({ page: id, artifact: "insight_layout_map.json", issue: `missing ${field}` });
    }
    if (!page.required_evidence || arr(page.required_evidence).length === 0) {
      result.warning.push({ page: id, artifact: "insight_layout_map.json", issue: "missing required_evidence" });
    }
  }
} else if (storyline) {
  result.warning.push({ artifact: "insight_layout_map.json", issue: "missing insight-to-layout map before storyline/preset build" });
}

const presetMap = readArtifactJson("preset_map.json", false);

if (confirmationLog) {
  const nodeByName = new Map(arr(confirmationLog.nodes).map((node) => [node.node, node]));
  const cn1Status = nodeByName.get("CN1_framework")?.status;
  const cn2Status = nodeByName.get("CN2_layout")?.status;
  const pendingStatuses = new Set(["pending", "blocked", "pending_user_answers", "pending_framework_confirmation", "pending_layout_confirmation"]);
  if ((presetMap || storyline) && pendingStatuses.has(cn1Status)) {
    result.critical.push({ artifact: "confirmation_log.json", issue: `CN1_framework blocks storyline/preset build: ${cn1Status}` });
  }
  if (presetMap && pendingStatuses.has(cn2Status)) {
    result.major.push({ artifact: "confirmation_log.json", issue: `CN2_layout blocks build: ${cn2Status}` });
  }
} else if (presetMap) {
  result.warning.push({ artifact: "confirmation_log.json", issue: "missing confirmation log while preset_map exists" });
}

const contentDensity = readArtifactJson("content_density_report.json", false);
if (contentDensity) {
  requireFields(contentDensity, "content_density_report.json", ["status", "summary", "pages"], "major");
  for (const page of arr(contentDensity.pages)) {
    const id = page.page_id || "unknown";
    for (const field of ["evidence_items_count", "density_status", "required_action", "can_enter_layout_analysis"]) {
      if (page[field] === undefined || page[field] === null || page[field] === "") {
        result.major.push({ page: id, artifact: "content_density_report.json", issue: `missing ${field}` });
      }
    }
    if (["content_empty", "overloaded"].includes(page.density_status) && page.can_enter_layout_analysis !== false) {
      result.major.push({ page: id, artifact: "content_density_report.json", issue: `${page.density_status} page cannot enter layout analysis` });
    }
    if (page.density_status === "content_thin" && !page.required_action) {
      result.major.push({ page: id, artifact: "content_density_report.json", issue: "content_thin page requires a fix action" });
    }
  }
} else if (presetMap || storyline) {
  result.warning.push({ artifact: "content_density_report.json", issue: "missing content density precheck before layout build" });
}

const referenceLayoutProfile = readArtifactJson("reference_layout_profile.json", false);
if (referenceLayoutProfile) {
  requireFields(referenceLayoutProfile, "reference_layout_profile.json", [
    "profile_id",
    "source_path",
    "preview_count",
    "best_for",
    "slide_geometry",
    "layout_anatomy",
    "typography",
    "color_system",
    "page_families",
  ], "major");
  for (const family of arr(referenceLayoutProfile.page_families)) {
    const id = family.family_id || "unknown";
    for (const field of ["source_preview", "use_when", "required_content", "replication_notes"]) {
      if (!family[field]) result.major.push({ artifact: "reference_layout_profile.json", family_id: id, issue: `missing ${field}` });
    }
  }
}

if (presetMap) {
  const pages = arr(presetMap.pages || presetMap);
  for (const page of pages) {
    const id = page.page_id || "unknown";
    for (const field of ["visual_profile", "canonical_family", "page_family", "token_set", "density_level", "render_strategy", "editable_elements", "rasterized_elements", "qa_focus", "design_token_status"]) {
      if (!page[field]) result.major.push({ page: id, artifact: "preset_map.json", issue: `missing ${field}` });
    }
    if (page.token_set && page.visual_profile && page.token_set !== page.visual_profile) {
      result.major.push({ page: id, artifact: "preset_map.json", issue: `token_set does not match visual_profile: ${page.token_set} vs ${page.visual_profile}` });
    }
    if (page.design_token_status && page.design_token_status !== "applied") {
      result.major.push({ page: id, artifact: "preset_map.json", issue: `design_token_status blocks build: ${page.design_token_status}` });
    }
    if (designTokens && page.visual_profile && !designTokens.token_sets?.[page.visual_profile]) {
      result.major.push({ page: id, artifact: "preset_map.json", issue: `visual_profile missing from design-tokens.json: ${page.visual_profile}` });
    }
    if (!page.exhibit_structure && !/cover|agenda|section/i.test(page.page_family || "")) {
      result.major.push({ page: id, artifact: "preset_map.json", issue: "body page missing exhibit_structure" });
    }
    const highFrequencyFamilies = new Set([
      "insurance_results_chart_card",
      "chart_plus_insight_panel",
      "paired_period_comparison",
      "stacked_contribution_split",
      "financial_metric_grid",
      "executive_takeaways",
      "management_action_plan",
      "practice_section_divider",
      "case_evidence_panel",
    ]);
    if (highFrequencyFamilies.has(page.page_family) && page.fill_level && page.fill_level !== "filled") {
      result.warning.push({ page: id, artifact: "preset_map.json", issue: "high-frequency page family should use fill_level=filled" });
    }
    if ((page.visible_placeholders || []).length > 0) {
      result.major.push({ page: id, artifact: "preset_map.json", issue: "visible placeholders remain", placeholders: page.visible_placeholders });
    }
    if (!page.visual_fullness && !/cover|agenda|section/i.test(page.page_family || "")) {
      result.warning.push({ page: id, artifact: "preset_map.json", issue: "missing visual_fullness" });
    } else if (page.visual_fullness && !/cover|agenda|section/i.test(page.page_family || "")) {
      const vf = page.visual_fullness;
      for (const field of ["body_occupancy_target_pct", "primary_visual_min_height_px", "primary_visual_width_pct", "supporting_layer_count", "content_density_status"]) {
        if (vf[field] === undefined) result.warning.push({ page: id, artifact: "preset_map.json", issue: `visual_fullness missing ${field}` });
      }
      if (typeof vf.primary_visual_min_height_px === "number" && vf.primary_visual_min_height_px < 430) {
        result.warning.push({ page: id, artifact: "preset_map.json", issue: "primary_visual_min_height_px below 430" });
      }
    }
    if (page.rhythm_score === undefined) {
      result.warning.push({ page: id, artifact: "preset_map.json", issue: "missing rhythm_score for visual rhythm audit" });
    } else if (typeof page.rhythm_score === "number" && (page.rhythm_score < 1 || page.rhythm_score > 5)) {
      result.warning.push({ page: id, artifact: "preset_map.json", issue: "rhythm_score should be 1-5" });
    }
    if (!page.color_temperature) {
      result.info.push({ page: id, artifact: "preset_map.json", issue: "missing color_temperature" });
    }
    if (!page.layout_lock_status) {
      result.major.push({ page: id, artifact: "preset_map.json", issue: "missing layout_lock_status" });
    } else if (page.layout_lock_status === "unlocked") {
      result.major.push({ page: id, artifact: "preset_map.json", issue: "layout_lock_status cannot be unlocked before build" });
    }
    if (!page.layout_lock_reason && !/cover|agenda|section/i.test(page.page_family || "")) {
      result.warning.push({ page: id, artifact: "preset_map.json", issue: "missing layout_lock_reason" });
    }
    const lock = layoutLockFor(page.visual_profile);
    if (!lock) {
      result.major.push({ page: id, artifact: "preset_map.json", issue: `no layout lock whitelist for visual_profile: ${page.visual_profile}` });
    } else {
      const allowed = new Set([...(lock.allowed || []), ...(lock.fallback || [])]);
      if (page.page_family && !allowed.has(page.page_family)) {
        const referenceDerivedComplete = page.source_reference_profile && page.source_preview && page.replication_scope && page.best_rsm_profile_match && page.adaptation_notes;
        if (!referenceDerivedComplete) {
          result.major.push({ page: id, artifact: "preset_map.json", issue: `page_family not allowed by layout lock and reference_derived fields are incomplete: ${page.page_family}` });
        }
      }
      if ((lock.fallback || []).includes(page.page_family) && !page.fallback_reason) {
        result.warning.push({ page: id, artifact: "preset_map.json", issue: "fallback page_family requires fallback_reason" });
      }
    }
  }
}

const layoutAnalysis = readArtifactJson("layout_analysis_report.json", false);
if (layoutAnalysis) {
  requireFields(layoutAnalysis, "layout_analysis_report.json", ["visual_profile", "status", "summary", "pages"], "major");
  if (!["confirmed", "assumed_user_requested_direct"].includes(layoutAnalysis.status)) {
    result.major.push({ artifact: "layout_analysis_report.json", issue: "status must be confirmed or assumed_user_requested_direct before build" });
  }
  const summary = layoutAnalysis.summary || {};
  for (const field of ["page_count", "layout_gaps", "content_thin_pages", "content_heavy_pages"]) {
    if (summary[field] === undefined) {
      result.major.push({ artifact: "layout_analysis_report.json", issue: `summary missing ${field}` });
    }
  }
  if ((summary.layout_gaps || 0) > 0) {
    result.major.push({ artifact: "layout_analysis_report.json", issue: "layout_gaps must be 0 before build" });
  }
  const refChoice = layoutAnalysis.reference_layout_choice;
  if (refChoice) {
    if (!refChoice.primary_visual_profile || !refChoice.selection_reason) {
      result.major.push({ artifact: "layout_analysis_report.json", issue: "reference_layout_choice missing primary_visual_profile or selection_reason" });
    }
    for (const pageRef of arr(refChoice.pages_using_reference)) {
      const id = pageRef.page_id || "unknown";
      for (const field of ["reference_profile", "reference_page_family", "source_preview", "replication_scope", "best_rsm_profile_match"]) {
        if (!pageRef[field]) result.major.push({ page: id, artifact: "layout_analysis_report.json", issue: `reference layout choice missing ${field}` });
      }
      for (const field of ["canonical_family", "token_set", "adaptation_notes"]) {
        if (!pageRef[field]) result.major.push({ page: id, artifact: "layout_analysis_report.json", issue: `reference layout choice missing ${field}` });
      }
    }
    if (!referenceLayoutProfile && arr(refChoice.pages_using_reference).length > 0) {
      result.warning.push({ artifact: "reference_layout_profile.json", issue: "layout_analysis_report uses reference layouts but reference_layout_profile.json is missing" });
    }
  }
  for (const page of arr(layoutAnalysis.pages)) {
    const id = page.page_id || "unknown";
    for (const field of ["canonical_family", "page_family", "token_set", "layout_lock_status", "density_level", "fullness_risk", "layout_reason", "design_token_status"]) {
      if (!page[field]) result.major.push({ page: id, artifact: "layout_analysis_report.json", issue: `missing ${field}` });
    }
    if (page.token_set && layoutAnalysis.visual_profile && page.token_set !== layoutAnalysis.visual_profile) {
      result.major.push({ page: id, artifact: "layout_analysis_report.json", issue: "token_set does not match layout visual_profile" });
    }
    if (page.design_token_status === "mixed_profile_risk") {
      result.major.push({ page: id, artifact: "layout_analysis_report.json", issue: "mixed_profile_risk blocks build" });
    }
    for (const field of ["insight_type", "evidence_items_count", "content_density_status", "title_fit_status"]) {
      if (page[field] === undefined || page[field] === null || page[field] === "") {
        result.warning.push({ page: id, artifact: "layout_analysis_report.json", issue: `missing ${field}` });
      }
    }
    if (page.title_fit_status === "rewrite_required") {
      result.major.push({ page: id, artifact: "layout_analysis_report.json", issue: "title_fit_status rewrite_required blocks build" });
    }
    if (page.fullness_risk === "high" && !page.user_confirmed_high_risk) {
      result.major.push({ page: id, artifact: "layout_analysis_report.json", issue: "fullness_risk high requires user_confirmed_high_risk" });
    }
  }
} else if (presetMap) {
  result.major.push({ artifact: "layout_analysis_report.json", issue: "missing layout analysis report for preset_map build" });
}

const htmlPreview = readArtifactJson("html_preview_report.json", false);
if (htmlPreview) {
  requireFields(htmlPreview, "html_preview_report.json", ["status", "visual_profile", "preview_pages", "summary"], "major");
  if (["pending_user_confirmation", "revise_required"].includes(htmlPreview.status)) {
    result.major.push({ artifact: "html_preview_report.json", issue: `status blocks batch build: ${htmlPreview.status}` });
  }
  if (htmlPreview.status === "preview_unavailable" && !htmlPreview.user_confirmed_continue) {
    result.major.push({ artifact: "html_preview_report.json", issue: "preview_unavailable requires user_confirmed_continue" });
  }
  const previewPages = arr(htmlPreview.preview_pages);
  if (previewPages.length > 0 && previewPages.length < 3) {
    result.warning.push({ artifact: "html_preview_report.json", issue: "fewer than 3 preview pages" });
  }
  for (const page of previewPages) {
    const id = page.page_id || "unknown";
    for (const field of ["page_family", "title_fit_status", "density_status", "fullness_risk"]) {
      if (!page[field]) result.warning.push({ page: id, artifact: "html_preview_report.json", issue: `missing ${field}` });
    }
    if (page.title_fit_status === "rewrite_required" || page.fullness_risk === "high") {
      result.major.push({ page: id, artifact: "html_preview_report.json", issue: "preview has blocking title/fullness issue" });
    }
  }
} else if (layoutAnalysis) {
  result.warning.push({ artifact: "html_preview_report.json", issue: "missing HTML key preview report after layout analysis" });
}

const conclusionMatrix = readArtifactJson("conclusion_evidence_matrix.json", false);
if (conclusionMatrix) {
  for (const item of arr(conclusionMatrix.conclusions || conclusionMatrix)) {
    const id = item.conclusion_id || "unknown";
    for (const field of ["conclusion", "evidence", "limitations", "language_strength", "pages"]) {
      if (!item[field]) result.major.push({ conclusion_id: id, artifact: "conclusion_evidence_matrix.json", issue: `missing ${field}` });
    }
    if (!item.evidence_credibility) {
      result.warning.push({ conclusion_id: id, artifact: "conclusion_evidence_matrix.json", issue: "missing evidence_credibility" });
    }
    if (!item.freshness_tier) {
      result.info.push({ conclusion_id: id, artifact: "conclusion_evidence_matrix.json", issue: "missing freshness_tier" });
    }
  }
}

const dataPool = readArtifactJson("data_pool.json", false);
if (dataPool) {
  for (const fact of arr(dataPool.facts || dataPool)) {
    const id = fact.fact_id || fact.id || "unknown";
    if (!fact.as_of_date && !fact.period) {
      result.warning.push({ fact_id: id, artifact: "data_pool.json", issue: "missing as_of_date or period" });
    }
    if (!fact.freshness_tier) {
      result.info.push({ fact_id: id, artifact: "data_pool.json", issue: "missing freshness_tier" });
    }
    if (!fact.evidence_credibility) {
      result.info.push({ fact_id: id, artifact: "data_pool.json", issue: "missing evidence_credibility" });
    }
  }
}

if (skillManifest) {
  try {
    const manifest = skillManifest;
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
    for (const [profile, lock] of Object.entries(manifest.layout_locks || {})) {
      for (const family of [...arr(lock.allowed), ...arr(lock.fallback)]) {
        if (!seen.has(family)) {
          result.warning.push({ artifact: "template-manifest.json", visual_profile: profile, issue: `layout lock references unregistered preset_family: ${family}` });
        }
      }
    }
  } catch (error) {
    result.critical.push({ artifact: "template-manifest.json", issue: "invalid JSON", detail: error.message });
  }
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
    if (!chart.chart_render_path) {
      result.info.push({ artifact: rel, issue: "missing chart_render_path for native chart priority check" });
    }
  }
}

const review = readArtifactJson("review_report.json", false);
if (review) {
  if (!review.logic_gate_review) result.warning.push({ artifact: "review_report.json", issue: "missing logic_gate_review" });
  if (!review.language_rewrite_review) result.warning.push({ artifact: "review_report.json", issue: "missing language_rewrite_review" });
  if (!review.editable_component_review) result.warning.push({ artifact: "review_report.json", issue: "missing editable_component_review" });
  if (!review.quality_scorecard) result.warning.push({ artifact: "review_report.json", issue: "missing quality_scorecard" });
  if (!review.logic_health_dashboard) result.info.push({ artifact: "review_report.json", issue: "missing logic_health_dashboard" });
  if (!review.deck_quality_radar) result.info.push({ artifact: "review_report.json", issue: "missing deck_quality_radar" });
  if (!review.content_freshness_audit) result.info.push({ artifact: "review_report.json", issue: "missing content_freshness_audit" });
  if (!review.language_calibration_review) result.info.push({ artifact: "review_report.json", issue: "missing language_calibration_review" });
}

if (!exists("draft/contact_sheet.png") && !exists("contact_sheet.png") && !exists("final/contact_sheet.png")) {
  result.warning.push({ artifact: "contact_sheet.png", issue: "contact sheet not found" });
}

if (result.critical.length > 0) result.status = "critical";
else if (result.major.length > 0) result.status = "major";
else if (result.warning.length > 0) result.status = "warning";

console.log(JSON.stringify(result, null, 2));
process.exit(result.critical.length > 0 ? 2 : result.major.length > 0 ? 1 : 0);
