# Parameterized Skills

## Making Skills Flexible

A rigid skill that does the same thing every time is useful, but a skill that adapts based on parameters is far more powerful. The Skill tool's `args` parameter enables this flexibility.

## The Args Parameter

When invoking a skill, Claude passes arguments via the Skill tool:

```
Skill tool call:
  skill: "commit"
  args: "-m 'Fix login bug'"
```

The user triggers this by typing:

```
/commit -m "Fix login bug"
```

## Designing for Parameters

Structure your SKILL.md to handle different arguments:

```markdown
# Deploy Skill

## Arguments
- No args: deploy to production (default)
- `staging`: deploy to staging environment
- `preview`: create a preview deployment

## Process
1. Run tests (always)
2. Run build (always)
3. Deploy based on argument:
   - Default/production: `vercel --prod`
   - staging: `vercel --target staging`
   - preview: `vercel` (creates preview URL)
```

## Conditional Behavior

Skills can branch logic based on the arguments received:

```markdown
## Behavior by argument

### When args contain a PR number (e.g., /review-pr 123)
1. Fetch PR #123 details using gh CLI
2. Read the changed files
3. Provide a code review

### When args contain "summary" (e.g., /review-pr 123 summary)
1. Fetch PR #123 details
2. Provide only a high-level summary, not line-by-line review

### When no args provided
1. Ask the user for the PR number
```

## Default Values

Always define what happens when no arguments are provided:

```markdown
## Defaults
- Environment: production (if not specified)
- Branch: current branch (if not specified)
- Verbosity: normal (use --verbose for detailed output)
```

## Argument Parsing Patterns

Common patterns used in skill instructions:

| Pattern | User Input | How to Handle |
|---------|-----------|---------------|
| Flag | `/commit -m "msg"` | Check if args contain `-m`, extract the message |
| Positional | `/review-pr 123` | First argument is the PR number |
| Named | `/deploy env=staging` | Parse key=value pairs |
| Boolean | `/test --verbose` | Check if flag is present |

## Example: Commit Skill with Args

```markdown
# Commit Skill

## Arguments
- `-m "message"`: Use the provided commit message
- No args: Analyze changes and generate a commit message

## Process
1. Run git status and git diff
2. If -m flag provided, use that message
3. If no -m flag, analyze the diff and draft a message
4. Stage relevant files (never use git add -A)
5. Create the commit
6. Run git status to verify
```

## Key Takeaways

- The Skill tool's `args` parameter makes skills flexible and reusable
- Design SKILL.md to handle different arguments with conditional behavior
- Always define default behavior when no arguments are provided
- Common patterns: flags, positional args, named args, boolean flags
- Document all accepted arguments in the SKILL.md file
