# Writing Your First Skill

## Overview

Creating a skill is straightforward: write a SKILL.md file with clear instructions that Claude will follow. This lesson walks through the process step by step.

## Step-by-Step Guide

### Step 1: Create the Directory

Create a new directory under `.claude/skills/` with a descriptive kebab-case name:

```bash
mkdir -p .claude/skills/deploy
```

### Step 2: Create SKILL.md

Create a `SKILL.md` file inside the directory:

```bash
touch .claude/skills/deploy/SKILL.md
```

### Step 3: Define When the Skill Should Trigger

Start with the trigger condition — when should Claude use this skill?

```markdown
## When to trigger
When the user asks to deploy the application or uses /deploy.
```

### Step 4: Specify the Tools to Use

List which Claude Code tools the skill needs:

```markdown
## Tools to use
- Bash: to run test, build, and deployment commands
- Read: to check configuration files before deploying
```

### Step 5: Write the Step-by-Step Process

Define the exact steps Claude should follow:

```markdown
## Process
1. Run the test suite: `npm run test`
2. If tests fail, stop and report the failures — do NOT proceed
3. Run the production build: `npm run build`
4. Check that the build output exists in `dist/`
5. Deploy using: `vercel --prod`
6. Report the deployment URL to the user
```

### Step 6: Add Examples

Show correct usage to eliminate ambiguity:

```markdown
## Examples
- `/deploy` — runs full test-build-deploy pipeline
- `/deploy staging` — deploys to staging environment instead of production
```

## Complete Example: Deploy Skill

```markdown
# Deploy Skill

## When to trigger
When the user asks to deploy or uses /deploy.

## Tools to use
- Bash: run commands
- Read: check config

## Process
1. Run `npm run test` — stop if tests fail
2. Run `npm run build`
3. Verify `dist/` directory exists
4. Run `vercel --prod` (or `vercel` for staging)
5. Report the deployment URL

## What NOT to do
- Never deploy if tests fail
- Never skip the build step
- Never deploy without confirming the target environment
```

## Testing Your Skill

After creating the SKILL.md file:

1. Start a new Claude Code session (or reload)
2. Type `/deploy` in the conversation
3. Verify Claude follows your instructions
4. Iterate on the SKILL.md based on results

## Key Takeaways

- Create a directory under `.claude/skills/` with a descriptive name
- Write a SKILL.md with trigger conditions, tools, process, and examples
- Be explicit about what to do AND what NOT to do
- Test by invoking the skill and refining the instructions
