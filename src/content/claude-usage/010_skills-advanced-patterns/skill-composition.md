# Skill Composition

## Why Compose Skills?

As your skill library grows, individual skills can become building blocks for more complex workflows. Skill composition lets you layer, chain, and organize skills so they work together without duplication or conflict.

## Composition Patterns

### Layered Skills

A base skill provides foundational behavior, and specialized skills extend it:

```
Base: code-quality
  ├── Specialized: frontend-review (adds JSX/CSS checks)
  ├── Specialized: backend-review (adds API/DB checks)
  └── Specialized: security-review (adds vulnerability checks)
```

The base skill defines shared steps (run linter, check formatting), while each specialized skill adds domain-specific checks on top.

### Skill Chains

One skill's output feeds into another skill's input:

```
/validate-content  →  /build  →  /deploy
```

Each skill in the chain handles one stage. The validate skill checks content integrity, the build skill compiles the project, and the deploy skill pushes to production. Each can be invoked independently or as part of the chain.

### Referencing Other Skills

A SKILL.md can reference other skills in its instructions:

```markdown
## Process
1. First, invoke the /lint skill to check code quality
2. Then, invoke the /test skill to run the test suite
3. Only if both pass, proceed with deployment
```

## Organizing Skills Hierarchically

Group related skills by domain:

```
.claude/skills/
  development/
    commit/SKILL.md
    review/SKILL.md
    test/SKILL.md
  operations/
    deploy/SKILL.md
    monitor/SKILL.md
  content/
    create/SKILL.md
    validate/SKILL.md
```

This hierarchy makes skills easier to find and maintains clear boundaries between domains.

## Avoiding Conflicts

When composing skills, watch for these issues:

| Problem | Example | Solution |
|---------|---------|----------|
| Overlapping instructions | Two skills both define commit message format | Consolidate into one skill or make one authoritative |
| Contradictory rules | Skill A says "always add tests," Skill B says "skip tests for hotfixes" | Add explicit precedence rules |
| Circular dependencies | Skill A invokes Skill B, which invokes Skill A | Break the cycle with a shared base skill |
| Duplicate work | Two skills both run the linter | Extract linting into its own skill |

## Best Practices

- Keep individual skills focused on one responsibility
- Use layering when skills share a common foundation
- Use chaining when skills form a pipeline
- Document dependencies between skills
- Test composed skills end-to-end, not just individually

## Key Takeaways

- Skills can be composed through layering, chaining, and referencing
- Layered skills share a base with specialized extensions
- Skill chains form pipelines where output flows between stages
- Organize skills hierarchically by domain
- Watch for conflicts: overlapping instructions, contradictions, and circular dependencies
