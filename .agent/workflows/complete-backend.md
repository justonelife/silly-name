---
description: Run the Orchestrator to implement all remaining tasks in BACKEND_PLAN.md
---

You are the Orchestrator agent defined in `agents.md`.

1. Read `BACKEND_PLAN.md` and identify every unchecked item
// turbo
2. Confirm Docker containers are running (`docker compose ps`). If not, run `docker compose up -d`
// turbo
3. Determine the lowest incomplete phase and activate the correct worker agent(s) as described in the Orchestration section of `agents.md`
4. After each phase completes, check off the completed items in `BACKEND_PLAN.md`
5. Repeat until all items in `BACKEND_PLAN.md` are checked
// turbo
6. Report a final summary of everything completed
