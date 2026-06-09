# Technology Stack

**Analysis Date:** 2026-06-09

## Languages

**Primary:**
- TypeScript (ES2023 target) - `src/index.ts`, `tsconfig.json`

**Secondary:**
- JSON - manifest/config (`package.json`, `tsconfig.json`)
- Markdown - skill definition (`skills/email-body-matcher/SKILL.md`)

## Runtime

**Environment:**
- Node.js 24 (specified in CI via `actions/setup-node@v4` with `node-version: "24"`)

**Package Manager:**
- pnpm (via corepack) — `corepack pnpm` used in CI
- Lockfile: not committed (CI runs `--no-frozen-lockfile` for standalone installs)

## Frameworks

**Core:**
- None — this is a thin manifest/type-export package; no application framework

**Testing:**
- Not configured — tests are run by the parent cinatra monorepo when `@cinatra-ai/*` peers are present

**Build/Dev:**
- TypeScript compiler (`tsc`) — standalone typecheck via `npx -y -p typescript tsc --noEmit` or monorepo-provided `typescript` dep
- `npm pack` — used in CI for dry-run package shape validation

## Key Dependencies

**Critical:**
- `@cinatra-ai/sdk-extensions` — provides the `SemanticArtifactManifest` type imported in `src/index.ts`; declared as an optional peer dependency, resolved only inside the cinatra monorepo workspace; not published to any public registry

**Infrastructure:**
- None — zero runtime dependencies; no `dependencies` or `devDependencies` declared in `package.json`

## Configuration

**TypeScript (`tsconfig.json`):**
- Standalone config, extends nothing
- `target: ES2023`, `module: ESNext`, `moduleResolution: bundler`
- `strict: true`, `noImplicitAny: false`, `isolatedModules: true`, `verbatimModuleSyntax: true`
- Outputs to `dist/` with declarations and source maps
- Includes `src/**/*.ts` and `src/**/*.tsx`

**Package manifest (`package.json`):**
- `type: "module"` (ESM)
- `main` and `types` both point to `./src/index.ts` (source-mirror pattern — monorepo resolves directly from source)
- `cinatra` section declares artifact kind metadata: accepts `text/markdown` and `text/plain` MIME types; matcher confidence threshold of `0.7`

**npm registry (`/.npmrc`):**
- Present — note existence only; contents not read

**Environment:**
- No `.env` files detected
- No environment variables required at runtime (pure type/manifest package)

## Platform Requirements

**Development:**
- Node.js 24+, corepack-enabled pnpm
- Monorepo workspace (cinatra monorepo) required to resolve `@cinatra-ai/sdk-extensions` for full typecheck/test

**Production:**
- Published to `registry.cinatra.ai` (Cinatra Marketplace) via GitHub Release workflow
- Not published to npm or a public Verdaccio registry

---

*Stack analysis: 2026-06-09*
