# Multi-File Refactoring

## Planning Before Executing

Large refactors touch many files. Ask Claude to plan first:

```
> I want to rename the UserService class to AuthService across the entire codebase.
> Before making changes, show me all the files that would be affected.
```

Claude uses Grep to find all references and presents a list:

```
Files referencing UserService:
- src/services/UserService.js (definition)
- src/api/routes/auth.js (import)
- src/middleware/auth.js (import)
- src/tests/UserService.test.js (tests)
- src/types/index.ts (type export)
```

Review this list before proceeding.

## Renaming Across the Codebase

Once you approve the plan:

```
> Go ahead and rename UserService to AuthService in all those files
```

Claude will:
1. Rename the file (`UserService.js` → `AuthService.js`)
2. Update the class/function name inside the file
3. Update all import statements across the codebase
4. Update test file names and references
5. Update type exports and documentation

## Moving Functions Between Files

When reorganizing code structure:

```
> Move the validateEmail and validatePassword functions from utils.js to a new validation.js file
```

Claude:
1. Reads the source file to get the function code
2. Creates the new file with the functions
3. Updates the source file to remove the moved functions
4. Finds and updates all import statements that referenced the old location

## Updating Imports and Tests

After any refactor, imports and tests must stay in sync:

```
> Update all imports to use the new file paths
> Run the tests to make sure nothing is broken
```

Claude systematically:
- Greps for old import paths
- Edits each file with the updated path
- Runs the test suite to verify

## Verifying with Build and Lint

Always verify after a refactor:

```
> Run the build and lint to check for any issues
```

This catches:
- **Broken imports** — build errors from missing modules
- **Unused variables** — lint warnings from leftover references
- **Type errors** — TypeScript catching mismatched types

## Common Refactoring Patterns

| Refactor | What Claude Does |
|----------|-----------------|
| **Rename** | Find all references, update name everywhere |
| **Move** | Relocate code, update all import paths |
| **Extract** | Pull code into a new function/file, replace original with a call |
| **Inline** | Replace function call with its body, remove the function |
| **Change signature** | Update function parameters and all call sites |

## Best Practices

- **Plan first, execute second** — always review the affected file list
- **Commit before refactoring** — so you can revert if things go wrong
- **Make one type of change at a time** — rename first, then restructure
- **Run tests after each step** — catch issues early, not at the end
- **Use git diff to review** — verify Claude changed exactly what you expected

## Key Takeaways

- Ask Claude to identify all affected files before starting a refactor
- Claude handles renames, moves, and import updates across the codebase
- Always verify with build, lint, and tests after refactoring
- Commit before starting so you have a clean rollback point
- Make incremental changes and test between each step
