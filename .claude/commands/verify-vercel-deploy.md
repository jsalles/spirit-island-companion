---
description: Verify the project still deploys cleanly to Vercel after a Manus refresh. Verify-only — reports issues, asks before changing anything.
---

Invoke the `verify-vercel-deploy` skill (in `.claude/skills/verify-vercel-deploy/SKILL.md`) and follow its checklist exactly.

Report results in this format:
1. Config files — pass/fail per file with the specific issue
2. `pnpm install` — pass/fail
3. `pnpm vite build` — pass/fail with last 20 lines of output if it failed
4. Output layout (`dist/public/`) — pass/fail

If any check fails, stop and ask the user before modifying anything. Do NOT auto-fix.

End with one of:
- ✅ Ready to deploy. Push to the Vercel-connected branch.
- ⚠️ Issues found — see above. Ask user how to proceed.
