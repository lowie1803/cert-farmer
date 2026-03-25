# Domain-Specific Skills

## What Are Domain-Specific Skills?

Domain-specific skills encode a team's best practices and conventions for a particular area of work. Instead of explaining your deployment process, code review standards, or content structure every time, you capture that knowledge in a skill that Claude follows consistently.

## Common Skill Categories

### Content Authoring Skills

For projects with structured content (documentation, courses, CMS):

```markdown
# Content Authoring Skill

## When to trigger
When adding or modifying lessons, quizzes, or modules.

## Process
1. Check module.json for the lesson list and IDs
2. Create markdown notes following existing format (~40-80 lines)
3. Create quiz JSON matching the schema: { questions: [...] }
4. Verify file names match the IDs in module.json
5. Validate JSON syntax before finishing
```

### Architecture Skills

For encoding codebase structure and patterns:

```markdown
# Architecture Skill

## When to trigger
When the user asks about app structure, routing, or component design.

## Key knowledge
- src/components/ — reusable UI components
- src/pages/ — route-level page components
- src/hooks/ — custom React hooks
- Path aliases: @/ maps to src/
- State management: React Context + localStorage
```

### Deployment Skills

For standardizing the build-test-deploy pipeline:

```markdown
# Deployment Skill

## Process
1. Run lint: npm run lint
2. Run tests: npm run test
3. Build: npm run build
4. Deploy: vercel --prod
5. Never deploy if any previous step fails
```

### Code Review Skills

For enforcing review standards:

```markdown
# Code Review Skill

## Checklist
- Check for hardcoded secrets or credentials
- Verify all new functions have error handling
- Ensure tests cover the changed code paths
- Confirm naming conventions match project standards
- Look for unused imports or dead code
```

## Skills as Institutional Knowledge

Domain-specific skills capture knowledge that typically lives in:

| Traditional Location | Problem | Skill Solution |
|---------------------|---------|----------------|
| Senior developer's head | Bus factor risk | Encoded in SKILL.md |
| Wiki page nobody reads | Gets outdated | Lives with the code |
| Onboarding document | One-time reference | Applied every time |
| Slack conversations | Lost in history | Permanently available |

## Building a Domain Skill

1. **Identify the domain**: What area of work needs consistency?
2. **Document current best practices**: How does the team do this today?
3. **Extract the steps**: Break the process into specific, ordered actions
4. **Add guardrails**: What mistakes should be prevented?
5. **Include examples**: Show correct and incorrect approaches
6. **Test and refine**: Use the skill and iterate

## Key Takeaways

- Domain-specific skills encode team best practices into reusable instructions
- Common categories: content authoring, architecture, deployment, code review
- Skills serve as living documentation that Claude actively follows
- Each domain skill should specify the exact process, tools, and guardrails
- Skills capture institutional knowledge and reduce dependence on individual expertise
