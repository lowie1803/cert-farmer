# The Grep Tool

## Overview

The Grep tool is a **content search tool** built on ripgrep. It searches for patterns inside files and supports full regex syntax. This is the tool to use when you need to find specific code, strings, or patterns within a codebase.

**Critical rule**: NEVER use bash `grep` or `rg` commands directly. Always use the Grep tool — it has been optimized for correct permissions and access.

## Parameters

| Parameter | Required | Description |
|-----------|----------|-------------|
| `pattern` | Yes | Regular expression pattern to search for |
| `path` | No | File or directory to search in (defaults to cwd) |
| `output_mode` | No | `files_with_matches` (default), `content`, or `count` |
| `glob` | No | Glob pattern to filter files (e.g., `"*.js"`) |
| `type` | No | File type filter (e.g., `"js"`, `"py"`, `"rust"`) |
| `-A` | No | Lines to show after each match (requires `content` mode) |
| `-B` | No | Lines to show before each match (requires `content` mode) |
| `-C` | No | Lines to show before and after each match |
| `-n` | No | Show line numbers (default true for `content` mode) |
| `-i` | No | Case-insensitive search |
| `head_limit` | No | Limit output to first N entries |
| `offset` | No | Skip first N entries |
| `multiline` | No | Enable multiline matching (default false) |

## Output Modes

### files_with_matches (default)

Returns only the **file paths** that contain a match. Use this for discovery:

```
Grep(pattern="useState", type="js")
# Returns: list of files containing "useState"
```

### content

Returns the **matching lines** with context. Use this to see the actual code:

```
Grep(pattern="function handleSubmit", output_mode="content", -A=5)
# Returns: matching lines plus 5 lines after each match
```

### count

Returns the **number of matches** per file:

```
Grep(pattern="TODO", output_mode="count")
# Returns: file paths with match counts
```

## Regex Pattern Syntax

The Grep tool uses ripgrep regex syntax:

```
# Literal string
"handleClick"

# Function definitions
"function\\s+\\w+"

# Import statements
"import.*from"

# Variable assignment
"const\\s+API_URL\\s*="

# Interface with braces (must escape braces)
"interface\\{\\}"
```

**Important**: Literal braces need escaping. To find `interface{}` in Go code, use `interface\\{\\}`.

## Filtering Files

Two ways to limit which files are searched:

```
# By glob pattern
Grep(pattern="render", glob="*.jsx")

# By file type (more efficient for standard types)
Grep(pattern="render", type="js")
```

The `type` parameter is more efficient than `glob` for standard file types.

## Multiline Mode

By default, patterns match within **single lines only**. Enable `multiline: true` for patterns that span multiple lines:

```
Grep(
  pattern="struct \\{[\\s\\S]*?field",
  multiline=true
)
```

In multiline mode, `.` matches newlines and patterns can cross line boundaries.

## Context Lines

Use `-A`, `-B`, or `-C` to see surrounding code (requires `content` output mode):

- `-A=3`: Show 3 lines **after** each match
- `-B=3`: Show 3 lines **before** each match
- `-C=3`: Show 3 lines **before and after** each match

## Key Takeaways

- Grep searches file **contents** using regex patterns
- Default output mode is `files_with_matches` (just file paths)
- Use `content` mode with context lines to see actual code
- Filter by `glob` or `type` to narrow the search scope
- Enable `multiline` for patterns that span multiple lines
- Never use bash grep/rg — always use the Grep tool
