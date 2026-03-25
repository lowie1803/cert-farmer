# The Glob Tool

## Overview

The Glob tool is a **fast file pattern matching tool** that works with any codebase size. It finds files by name patterns and returns matching file paths sorted by **modification time** (most recently modified first).

## When to Use Glob

Use Glob when you need to:

- Find files by name or extension
- Discover what files exist in a directory structure
- Locate test files, config files, or specific file types
- Get a quick overview of a project's file organization

**Do NOT use Glob for content search** — it only matches file names and paths, not what's inside the files.

## Parameters

| Parameter | Required | Description |
|-----------|----------|-------------|
| `pattern` | Yes | Glob pattern to match files against |
| `path` | No | Directory to search in (defaults to current working directory) |

## Glob Pattern Syntax

| Pattern | Matches |
|---------|---------|
| `*` | Any sequence of characters within a single directory |
| `**` | Any sequence of directories (recursive) |
| `?` | Any single character |
| `[abc]` | Any one of the characters a, b, or c |
| `[!abc]` | Any character except a, b, or c |

## Common Examples

```
# Find all JavaScript files in the entire project
**/*.js

# Find all TypeScript/TSX files in src/
src/**/*.tsx

# Find all test files following the test_ prefix convention
**/test_*.py

# Find all JSON files in a specific directory
src/config/*.json

# Find all files named "index" with any extension
**/index.*

# Find all markdown files
**/*.md

# Find package.json files at any depth
**/package.json
```

## Scoping with the path Parameter

Use `path` to limit the search to a specific directory:

```
# Search only in the components directory
Glob(pattern="*.jsx", path="/project/src/components")

# Search only in the test directory
Glob(pattern="**/*.test.js", path="/project/tests")
```

Omit `path` to search from the current working directory.

## Results Format

Glob returns a list of matching file paths, sorted by modification time. The most recently modified files appear first, which is useful for finding actively worked-on files.

## Glob vs Other Search Tools

| Task | Tool |
|------|------|
| Find files by name/extension | **Glob** |
| Search file contents | Grep |
| Open-ended exploration | Agent (subagent_type=Explore) |

## Key Takeaways

- Glob finds files by **name patterns**, not content
- Results are sorted by **modification time** (newest first)
- Use `**` for recursive directory matching
- Scope searches with the `path` parameter to improve performance
- Combine with Grep for a powerful search-then-read workflow
