---
name: verify-vercel-deploy
description: Use when the Manus-generated codebase has been refreshed (new export from Manus pasted over the working tree) and you need to confirm the project still deploys cleanly to Vercel without losing Manus-specific features.
---

# Verify Vercel Deploy After Manus Refresh

## Overview

This project was scaffolded by Manus and is deployed as a static Vite SPA on Vercel. Every time the codebase is re-exported from Manus, the new export can clobber Vercel-specific config or introduce new files. This skill is a verify-only checklist — report issues, don't auto-fix unless the user asks.

## When to Use

Triggers:
- User says they "updated the code from Manus", "pasted the latest Manus export", or similar
- `git status` shows changes to `vite.config.ts`, `package.json`, `.gitignore`, `vercel.json`, or new files under `client/src/`
- About to push to the Vercel-connected branch

Do NOT use for:
- Routine code edits unrelated to a Manus refresh
- Diagnosing runtime bugs (this is a deploy-readiness check, not a debugger)

## Checklist

Run these in order. Stop and report at the first failure.

### 1. Config files survived the refresh

- `vercel.json` exists at repo root with shape:
  ```json
  {
    "buildCommand": "pnpm vite build",
    "outputDirectory": "dist/public",
    "framework": "vite",
    "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
  }
  ```
- `.gitignore` contains `node_modules` and `dist`
- `package.json` devDependencies includes `vite-plugin-manus-runtime`
- `package.json` dependencies includes `@vercel/analytics` (Vercel Web Analytics)
- `package.json` dependencies includes `wouter` (URL-based routing — required for per-page analytics)
- `vite.config.ts` still has `build.outDir` resolving to `dist/public`
- `client/src/App.tsx` imports `Analytics` from `@vercel/analytics/react` and renders `<Analytics />` inside the provider tree
- `client/src/App.tsx` imports `Route`, `Switch`, `Redirect` from `wouter` and mounts the route tree (`/landing`, `/spirit-island/*`, `/final-girl/*`)

If any are missing, Manus regenerated and stripped them. Report which and ask before restoring.

### 2. Dependencies install

```bash
pnpm install
```

Must use pnpm — `pnpm-lock.yaml` is the lockfile and `patches/wouter@*.patch` is applied via pnpm's `patchedDependencies`. Switching to npm/yarn silently drops the patch.

### 3. Build succeeds

```bash
pnpm vite build
```

Expected output:
- `dist/public/index.html` (will be large — hundreds of kB — because `vite-plugin-manus-runtime` inlines the Manus runtime into it; this is correct)
- `dist/public/assets/index-*.js` and `index-*.css`
- `dist/public/__manus__/` copied through from `client/public/`

### 4. Quick visual smoke (optional)

```bash
pnpm preview
```

Open the preview URL and confirm the landing page loads (since the Final Girl + Spirit Island landing was added in a recent refresh, regressions here are likely on the next refresh).

## Things NOT to "fix"

Fresh agents reliably try to "improve" these — don't, unless the user asks:

| Symptom | Why it looks broken | Why it's fine |
|---|---|---|
| Vite warns `%VITE_ANALYTICS_ENDPOINT%` undefined | Umami analytics `<script>` ships with literal `%...%` placeholder | Intentional. Set the env var in Vercel only if analytics is wanted; otherwise the script just 404s harmlessly. This is the legacy Umami script — separate from Vercel Web Analytics below. |
| `@vercel/analytics` in dependencies + `<Analytics />` in `App.tsx` | Looks like third-party tracking that could be removed | Vercel Web Analytics — page views surface in the Vercel dashboard. Auto-enabled when the dependency is present and the component is mounted. Don't remove. Use `@vercel/analytics/react` (this is a Vite SPA, not Next.js — `/next` import will not work). |
| `wouter` `<Route nest>` blocks in `App.tsx` with `GameProvider` / `FinalGirlProvider` inside | Looks like odd nesting; might suggest moving providers up | Intentional. Providers mount only on their respective `/spirit-island/*` and `/final-girl/*` subtrees so each context's localStorage load only runs when that game is active. Don't hoist them to top level. |
| `useEffect(() => { if (!session) setLocation(...) }, ...)` in Setup/GameSession/FGSetup/FGSession | Looks like defensive guard noise | Required: if a user reloads at `/spirit-island/session` (or `/setup`), the in-memory `currentSession` is gone and the page would crash without redirect. Keep these guards. |
| Relative `setLocation('/rules')` (not `setLocation('/spirit-island/rules')`) inside pages mounted under a `<Route nest>` | Looks like a missing prefix | Required by wouter's `nest`: `useLocation()` inside a nested route is scoped to the parent base. Using `setLocation('/spirit-island/rules')` from inside `/spirit-island/*` produces `/spirit-island/spirit-island/rules` (404). Use relative paths within the subtree; use `setLocation('~/landing')` (tilde-slash prefix) to escape to root. |
| `vite-plugin-manus-runtime` in devDependencies | Looks like dev-only tooling | Runs at build time and inlines runtime into `index.html`. Removing it breaks the app in prod. |
| `vitePluginManusDebugCollector` in `vite.config.ts` | Looks like dev-only debug code that shouldn't ship | Guarded by `NODE_ENV === "production"` check inside `transformIndexHtml`. No prod impact. |
| `server/index.ts` and `build` script that bundles it | Looks like Vercel should deploy it as a serverless function | It's only for local `pnpm start`. Vercel uses `buildCommand` from `vercel.json` (just `vite build`) and serves `dist/public` as static. Do not add `api/` directory or convert to serverless. |
| `client/public/__manus__/version.json` missing | Looks like deleted asset | Removed intentionally in the recent refresh. Don't restore. |
| Bundle >500 kB warning | Vite suggests code-splitting | Acceptable for this app. Don't refactor unless asked. |

## Things that DO warrant fixing

- `vercel.json` deleted or shape changed → restore
- `.gitignore` reset to one-line `.DS_Store` → re-add `node_modules` and `dist`
- `vite-plugin-manus-runtime` removed from `package.json` → re-add to devDependencies
- `@vercel/analytics` removed from `package.json` or `<Analytics />` stripped from `App.tsx` → re-add (Manus refresh likely overwrote both)
- Routing collapsed back to state-based (App.tsx no longer imports from `wouter`, pages dispatch `SET_VIEW` again) → re-add the route tree. Per-page analytics breaks if the URL stops changing.
- Build script no longer outputs to `dist/public` → re-align `vite.config.ts` and `vercel.json`

In all cases, show the diff to the user and ask before committing.

## Quick command sequence

```bash
# from repo root
cat vercel.json                         # check shape
grep -E "node_modules|dist" .gitignore  # check ignores
grep vite-plugin-manus-runtime package.json
grep @vercel/analytics package.json
grep wouter package.json
grep -n "@vercel/analytics" client/src/App.tsx
grep -n "from 'wouter'" client/src/App.tsx
pnpm install
pnpm vite build
ls dist/public/                          # expect index.html, assets/, __manus__/
```

If all four succeed and the "don't fix" list is uncontested, the project is Vercel-ready. Push to the deploy branch.
