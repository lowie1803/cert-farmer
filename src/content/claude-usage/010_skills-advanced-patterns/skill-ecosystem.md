# Skill Ecosystem

## What Is a Skill Ecosystem?

A skill ecosystem is the complete set of skills that support a project's workflows. Rather than creating skills ad hoc, a well-designed ecosystem maps team workflows to skills systematically, covering the full development lifecycle.

## Mapping Workflows to Skills

Start by identifying your team's recurring workflows:

| Workflow | Current Process | Skill Opportunity |
|----------|----------------|-------------------|
| Code commit | Manual staging, write message, commit | `/commit` skill |
| Code review | Open PR, read diff, leave comments | `/review-pr` skill |
| Testing | Run test suite, check coverage | `/test` skill |
| Deployment | Build, verify, deploy, notify | `/deploy` skill |
| Content creation | Check structure, create files, validate | `/create-content` skill |
| Bug investigation | Read logs, trace code, identify root cause | `/investigate` skill |

## Standard Skill Categories

### Development Skills

- **commit**: Stage changes, generate message, create commit
- **review-pr**: Analyze PR changes, check standards, provide feedback
- **test**: Run tests, report coverage, identify failures
- **refactor**: Restructure code following project patterns

### Operations Skills

- **deploy**: Build, test, and deploy to target environment
- **monitor**: Check application health and performance
- **rollback**: Revert to a previous deployment

### Content Skills

- **create**: Generate new content following project templates
- **validate**: Check content structure, links, and formatting
- **migrate**: Transform content between formats

### Project Management Skills

- **backlog**: View and manage the project backlog
- **roadmap**: Check current roadmap status and priorities
- **status**: Generate project status summary

## Maintaining Consistency

Across your skill ecosystem, maintain consistency in:

- **Instruction style**: Same voice, same structure across all SKILL.md files
- **Error handling**: All skills should handle failures the same way
- **Output format**: Consistent reporting (bullet lists, summaries)
- **Tool usage**: Same tools for same purposes across skills

## Documenting for Team Adoption

Make skills discoverable for the whole team:

```markdown
## Available Skills
| Skill | Command | Description |
|-------|---------|-------------|
| Commit | /commit | Stage and commit with generated message |
| Review | /review-pr N | Review pull request #N |
| Deploy | /deploy [env] | Deploy to environment (default: prod) |
```

## Version Control Considerations

Skills live in the `.claude/` directory. Key decision:

- **Checked into git**: Team shares the same skills, skills evolve with the project
- **Git-ignored**: Each developer customizes their own skills locally

Most teams benefit from checking skills into version control so everyone uses the same processes.

## Key Takeaways

- A skill ecosystem systematically maps team workflows to skills
- Organize skills into categories: development, operations, content, project management
- Maintain consistency in style, error handling, and output format across all skills
- Document skills for team adoption with a clear reference table
- Check skills into version control for team-wide consistency
