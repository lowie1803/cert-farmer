# Search Strategies

## The Two-Phase Search Pattern

The most effective search strategy combines **Glob for discovery** and **Grep for content**:

1. **Phase 1 — Glob**: Find relevant files by name pattern
2. **Phase 2 — Grep**: Search those files for specific content
3. **Phase 3 — Read**: Open the most relevant files to understand context

This narrows a large codebase down to exactly the files you need.

## Choosing the Right Tool

| You want to... | Use |
|----------------|-----|
| Find files by name or extension | **Glob** |
| Find files containing a specific string | **Grep** |
| Explore an unfamiliar codebase broadly | **Agent** (subagent_type=Explore) |
| Read a file you already know the path to | **Read** |

## Parallel Speculative Searches

When you are unsure where something lives, run multiple searches in parallel:

```
# Run all three at once — don't wait for results sequentially
Glob(pattern="**/auth*.js")           # files with "auth" in the name
Grep(pattern="authenticate")          # files containing "authenticate"
Glob(pattern="**/middleware/*.js")     # middleware directory files
```

This is **speculative** — you cast a wide net and use whichever results are most useful. The time cost of extra searches is minimal compared to doing them sequentially.

## Common Search Scenarios

### Finding a Function Definition

```
# Step 1: Grep for the function name
Grep(pattern="function calculateTotal", output_mode="content", -A=10)

# Or for arrow functions / methods:
Grep(pattern="calculateTotal\\s*[:=]", output_mode="content", -A=10)
```

### Finding All Uses of a Component

```
# Step 1: Find imports of the component
Grep(pattern="import.*UserProfile", type="js")

# Step 2: Find JSX usage
Grep(pattern="<UserProfile", type="js", output_mode="content", -C=3)
```

### Understanding Project Structure

```
# Find all top-level directories
Glob(pattern="src/*/")

# Find all config files
Glob(pattern="*.config.*")
Glob(pattern="**/.*rc")
Glob(pattern="**/.*rc.js")
```

### Finding Where a Value Is Set

```
# Find environment variable usage
Grep(pattern="process\\.env\\.API_URL", output_mode="content")

# Find where a state variable is updated
Grep(pattern="setUserName\\(", type="js", output_mode="content", -B=3)
```

## The Agent Tool for Broad Exploration

When your search is **open-ended** and may require multiple rounds of searching:

- Use the Agent tool with `subagent_type=Explore`
- The Agent performs iterative Glob and Grep searches on your behalf
- Best for questions like "How does authentication work in this codebase?"
- Returns a synthesized answer after exploring multiple files

Use Agent/Explore when you would need **multiple rounds** of Glob and Grep to answer a question.

## Search Anti-Patterns

| Anti-Pattern | Problem | Better Approach |
|-------------|---------|----------------|
| Sequential searches when parallel is possible | Slow | Run independent searches in parallel |
| Using Bash grep/rg | Bypasses optimized tool | Use the Grep tool |
| Searching the entire codebase when you know the directory | Slow, noisy results | Use the `path` parameter |
| Reading every file in a directory | Wastes context window | Search first, then read targeted files |
| Not using file type filters | Too many irrelevant results | Use `type` or `glob` parameters |

## Building a Mental Model

For unfamiliar codebases, follow this progression:

1. **Structure**: `Glob(pattern="src/*/")` — what directories exist?
2. **Entry points**: `Glob(pattern="**/index.*")` or `Glob(pattern="**/main.*")`
3. **Configuration**: `Glob(pattern="*.config.*")` and `Glob(pattern="package.json")`
4. **Key patterns**: `Grep(pattern="export default", type="js")` — what are the main exports?
5. **Specific code**: Targeted Grep searches based on what you've learned

## Key Takeaways

- Combine Glob (file names) and Grep (content) for effective searching
- Run independent searches in parallel — don't wait sequentially
- Use Agent/Explore for open-ended research requiring multiple rounds
- Scope searches with `path`, `type`, and `glob` parameters to reduce noise
- Build understanding progressively: structure, then entry points, then specifics
