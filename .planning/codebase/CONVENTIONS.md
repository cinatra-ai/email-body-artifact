# Coding Conventions

**Analysis Date:** 2026-06-09

## Naming Patterns

**Files:**
- Kebab-case for filenames: `index.ts`, `SKILL.md`
- Skill directories use kebab-case: `skills/email-body-matcher/`

**Functions / Variables:**
- camelCase for exported constants: `emailBodyArtifactManifest` (`src/index.ts`)
- Descriptive, noun-phrase names for manifest objects

**Types:**
- PascalCase for imported types: `SemanticArtifactManifest` (from `@cinatra-ai/sdk-extensions`)

## Code Style

**Formatting:**
- No `.prettierrc` or `.eslintrc` detected — formatting is not enforced by tooling in this repo
- TypeScript strict mode enabled (`"strict": true` in `tsconfig.json`), with `"noImplicitAny": false` as the sole relaxation
- `verbatimModuleSyntax: true` enforces `import type` for type-only imports (see `src/index.ts` line 1)

**Linting:**
- No ESLint or Biome config detected

## Import Organization

**Order:**
1. Type-only imports first using `import type` syntax (enforced by `verbatimModuleSyntax`)
2. No runtime imports in `src/index.ts` — the file exports only a typed constant

**Path Aliases:**
- None configured

## Error Handling

**Patterns:**
- Not applicable — the single source file (`src/index.ts`) is a pure manifest declaration with no runtime logic or error paths
- CI validation errors are surfaced via `process.exit(2)` in inline Node.js scripts within `.github/workflows/ci.yml`

## Logging

**Framework:** Not applicable (no runtime code)

**Patterns:**
- CI scripts use `console.error(...)` for validation failures in `.github/workflows/ci.yml`

## Comments

**When to Comment:**
- Module-level block comments document intent, distinctions, and constraints (see `src/index.ts` lines 3–8)
- Inline comments explain why something is NOT done (e.g., `// text/html is not in the LLM capability registry`)
- CI workflow steps carry detailed inline comments explaining skip logic and ordering rationale

**JSDoc/TSDoc:**
- Not used — the codebase exports a single constant; no JSDoc annotations present

## Function Design

**Size:** Not applicable — the repo exports one constant, no functions

**Parameters:** Not applicable

**Return Values:** Not applicable

## Module Design

**Exports:**
- Named exports only: `export const emailBodyArtifactManifest` in `src/index.ts`
- No default exports
- `package.json` `"main"` and `"types"` both point directly to `./src/index.ts` (source mirror pattern — the monorepo builds/typechecks)

**Barrel Files:**
- `src/index.ts` serves as the single barrel/entry point

## Cinatra Extension Conventions

**Manifest duplication pattern:**
- The `cinatra` block in `package.json` and the exported `emailBodyArtifactManifest` in `src/index.ts` are kept in sync manually — both declare identical `accepts`, `skills`, and `matcherConfidenceThreshold` values

**First-party peer dependency rule:**
- All `@cinatra-ai/*` packages MUST be declared as optional `peerDependencies` (never `dependencies` or `devDependencies`); enforced by CI gate in `.github/workflows/ci.yml`

**Skill definitions:**
- Skills live under `skills/<skill-name>/SKILL.md` as plain Markdown with YAML front matter (`name`, `description`)
- Skill prompt content uses structured sections: "What IS", "What is NOT", "Confidence guidance", "Output contract"
- Output contract for matcher skills: JSON only, no markdown wrapper, fields `matches`, `confidence`, `rationale`

---

*Convention analysis: 2026-06-09*
