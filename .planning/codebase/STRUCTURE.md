# Codebase Structure

**Analysis Date:** 2026-06-09

## Directory Layout

```
email-body-artifact/
├── .github/
│   └── workflows/
│       ├── ci.yml          # Build, typecheck, pack dry-run, kind-specific gate
│       └── release.yml     # Release automation
├── .planning/
│   └── codebase/           # GSD mapper output (this directory)
├── skills/
│   └── email-body-matcher/
│       └── SKILL.md        # LLM classification prompt for the matcher skill
├── src/
│   └── index.ts            # Single TypeScript entry point — exports the artifact manifest
├── LICENSE                 # Apache-2.0
├── README.md               # Human-facing description and capability list
├── package.json            # npm manifest + cinatra registry metadata block
└── tsconfig.json           # Standalone strict TypeScript config (targets src/)
```

## Directory Purposes

**`src/`:**
- Purpose: TypeScript source for the artifact package.
- Contains: Single file `index.ts` exporting `emailBodyArtifactManifest`.
- Key files: `src/index.ts`

**`skills/`:**
- Purpose: LLM skill prompt files consumed by the Cinatra platform.
- Contains: One subdirectory per named skill, each containing a `SKILL.md`.
- Key files: `skills/email-body-matcher/SKILL.md`

**`skills/email-body-matcher/`:**
- Purpose: Houses the `email-body-matcher` skill referenced by the manifest.
- Contains: `SKILL.md` — structured markdown prompt with classification criteria, confidence bands, and JSON output contract.

**`.github/workflows/`:**
- Purpose: CI/CD automation.
- Contains: `ci.yml` (build/validate gate), `release.yml` (release pipeline).

**`.planning/codebase/`:**
- Purpose: GSD codebase mapper output — consumed by `/gsd-plan-phase` and `/gsd-execute-phase`.
- Generated: Yes (by GSD tooling).
- Committed: Yes.

## Key File Locations

**Entry Points:**
- `src/index.ts`: Exports `emailBodyArtifactManifest` — the sole public TypeScript symbol.

**Configuration:**
- `package.json`: npm metadata and `cinatra` registry block (apiVersion, kind, artifact config).
- `tsconfig.json`: Standalone strict TypeScript config targeting `src/`, emitting to `dist/`.
- `.npmrc`: npm registry configuration (existence noted; contents not read).

**Core Logic:**
- `src/index.ts`: Manifest declaration (accepted MIME types, matcher skill reference, confidence threshold).
- `skills/email-body-matcher/SKILL.md`: Classification logic as an LLM prompt.

**CI/CD:**
- `.github/workflows/ci.yml`: Package shape validation, typecheck, test, pack dry-run.
- `.github/workflows/release.yml`: Release automation.

## Naming Conventions

**Files:**
- TypeScript sources: `camelCase.ts` (e.g., `index.ts`)
- Skill prompts: `SKILL.md` (uppercase, fixed name per skill directory convention)
- Workflow files: `kebab-case.yml`

**Directories:**
- Skill directories: `kebab-case` matching the skill name (e.g., `email-body-matcher`)
- Source directory: `src/` (singular)
- Skills directory: `skills/` (plural)

**Exports:**
- Named exports only; no default exports. Const name uses camelCase with full descriptive suffix: `emailBodyArtifactManifest`.

## Where to Add New Code

**New matcher skill:**
- Create a new subdirectory under `skills/` using kebab-case: `skills/<skill-name>/SKILL.md`
- Reference the skill in `src/index.ts` under `skills.matchers` as `@cinatra-ai/email-body-artifact:<skill-name>`
- Mirror the reference in the `cinatra.artifact.skills.matchers` array in `package.json`

**New accepted MIME type:**
- Add the MIME type string to `accepts.file.mimeTypes` in both `src/index.ts` and the `cinatra.artifact` block in `package.json` (both must stay in sync)

**Additional TypeScript utilities:**
- Add files to `src/` — they will be picked up by `tsconfig.json` via `src/**/*.ts`

**New CI gate:**
- Append steps to `.github/workflows/ci.yml` under the `kind-gates` job

## Special Directories

**`dist/`:**
- Purpose: TypeScript compiler output (declarations + source maps).
- Generated: Yes (by `tsc`).
- Committed: No (not present in repo; generated at build time in the monorepo).

**`.planning/`:**
- Purpose: GSD planning artifacts.
- Generated: Yes.
- Committed: Yes.

---

*Structure analysis: 2026-06-09*
