# Instruction Design

## Why Instruction Quality Matters

Claude follows skill instructions literally. Vague instructions produce inconsistent results. Precise instructions produce reliable, repeatable behavior. The quality of your SKILL.md directly determines the quality of Claude's output.

## Principles of Effective Instructions

### Be Specific and Unambiguous

| Vague (Bad) | Specific (Good) |
|-------------|-----------------|
| "Be careful with the database" | "Run `pg_dump` before any migration" |
| "Make sure tests pass" | "Run `npm run test` and stop if exit code is non-zero" |
| "Format the code properly" | "Run `prettier --write` on all changed files" |
| "Check for issues" | "Run `npm run lint` and fix all errors before committing" |

### Use Imperative Voice

Write instructions as direct commands:

- **Do**: "Run the test suite before building"
- **Don't**: "You might want to consider running the test suite"
- **Do**: "Create a new file at `src/components/Button.jsx`"
- **Don't**: "It would be good to create a file somewhere in components"

## Structured Sections

Organize skill instructions into clear sections:

```markdown
## WHEN to trigger
Conditions that activate this skill.

## WHAT to do
The specific actions to perform.

## HOW to do it
Step-by-step process with exact commands.

## WHAT NOT to do
Anti-patterns and forbidden actions.
```

## Examples and Anti-Examples

Always include both:

```markdown
## Examples (correct)
- Commit message: "Fix login validation for empty email fields"
- Commit message: "Add pagination to user list API endpoint"

## Anti-examples (incorrect)
- Commit message: "fix stuff" (too vague)
- Commit message: "Updated the login page to fix the bug where..." (too verbose)
```

## Handling Edge Cases

Define what Claude should do in unusual situations:

```markdown
## Edge cases
- If no tests exist, skip the test step and warn the user
- If the build fails, show the error output and suggest fixes
- If the target branch has conflicts, stop and ask the user to resolve
```

## Specifying Output Format

Tell Claude exactly what the result should look like:

```markdown
## Output format
- Report: bullet list of actions taken
- Include: file paths created or modified
- End with: summary of what changed and next steps
```

## Testing and Iterating

1. Invoke the skill with a typical request
2. Check if the output matches expectations
3. Identify gaps — where did Claude deviate or guess?
4. Add more specific instructions to close those gaps
5. Repeat until the skill is reliable

## Key Takeaways

- Be specific — replace vague words with exact commands and paths
- Use imperative voice for all instructions
- Include examples AND anti-examples to show boundaries
- Define edge cases explicitly
- Specify the output format
- Test skills by invoking them and iterating on the instructions
