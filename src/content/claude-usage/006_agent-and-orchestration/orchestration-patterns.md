# Orchestration Patterns

Orchestration is about combining tools effectively to accomplish complex tasks. These patterns represent proven approaches for common workflows.

## Pattern 1: Explore-Then-Act

**Use an Agent/Explore first, then make changes.**

1. Launch an Explore agent to understand the codebase area
2. Review the agent's findings
3. Make targeted modifications based on understanding

This prevents blind edits and reduces errors. Best for unfamiliar codebases or modules you have not recently read.

## Pattern 2: Search-Read-Modify

**The most common editing workflow.**

1. **Glob** — find files matching a pattern
2. **Read** — examine the relevant files
3. **Edit** — make targeted changes

```
Glob("**/auth/*.js")     → find files
Read("src/auth/login.js") → understand code
Edit("src/auth/login.js") → make changes
```

This is sequential by nature — each step depends on the previous result.

## Pattern 3: Parallel Research

**Launch multiple Explore agents for independent research.**

When you need to understand several unrelated areas:

- Agent 1: "Explore the authentication system"
- Agent 2: "Explore the database models"
- Agent 3: "Explore the API routes"

All three run in parallel, and you synthesize their findings to plan implementation.

## Pattern 4: Plan-Then-Execute

**Use a Plan agent before implementing.**

1. Launch a Plan agent with the task description
2. Review the proposed plan
3. Execute the plan step by step

Best for large or cross-cutting changes where you need to understand the full scope before starting.

## Error Recovery

When something goes wrong, do not brute force:

- **Do not** retry the same failing command in a loop
- **Do** try an alternative approach
- **Do** diagnose the root cause before retrying
- **Do** consider if a different tool would work better

## Choosing Agent vs Direct Tools

| Scenario | Approach |
|----------|----------|
| Read a known file | Direct: Read tool |
| Find files by name | Direct: Glob tool |
| Search for a pattern | Direct: Grep tool |
| Simple directed search (1-2 queries) | Direct tools |
| Complex exploration (>3 queries) | Agent (Explore) |
| Cross-referencing multiple files | Agent |
| Understanding unfamiliar code | Agent (Explore) |
| Planning large changes | Agent (Plan) |

## Output Efficiency

When reporting results:

- **Be concise** — lead with action, skip filler
- **Share relevant file paths** — always absolute, never relative
- **Include code snippets only when load-bearing** — do not recap code you merely read
- **Avoid unnecessary preamble** — get straight to findings

## Anti-Patterns to Avoid

| Anti-Pattern | Better Approach |
|--------------|-----------------|
| Reading files one at a time | Parallel speculative reads |
| Using Agent for a single file read | Use Read directly |
| Sleep loops waiting for results | Use run_in_background and wait for notification |
| Searching broadly then not narrowing | Use Glob first, then targeted Grep |
| Editing without reading first | Always Read before Edit |
