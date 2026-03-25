# Write and Edit Tools

## The Write Tool

The Write tool creates new files or completely overwrites existing ones.

### Parameters

| Parameter | Required | Description |
|-----------|----------|-------------|
| `file_path` | Yes | Absolute path to the file |
| `content` | Yes | The complete file content to write |

### Key Rules

- **Overwrites** the entire file if it already exists
- For existing files, you **must Read first** — Write will fail if you haven't
- Use Write for **new files** or **complete rewrites** only
- Prefer the Edit tool for modifying existing files (it only sends the diff)
- Never create documentation files (*.md) or README files unless explicitly asked

## The Edit Tool

The Edit tool performs **exact string replacement** within files. It is the preferred tool for making targeted changes.

### Parameters

| Parameter | Required | Description |
|-----------|----------|-------------|
| `file_path` | Yes | Absolute path to the file |
| `old_string` | Yes | The exact text to find and replace |
| `new_string` | Yes | The replacement text (must differ from old_string) |
| `replace_all` | No | If true, replace all occurrences (default: false) |

### The Uniqueness Requirement

The `old_string` **must be unique** within the file. If multiple matches exist:

- The edit **fails** with an error
- Solution 1: Include more surrounding context to make the match unique
- Solution 2: Use `replace_all: true` to replace every occurrence

### Preserving Indentation

When editing text from Read output, you must match the **exact indentation** as it appears in the file. The Read output format is:

```
     5→    const x = 10;
```

The part before `→` is the line number prefix. Everything **after** the tab is the actual file content. Never include the line number prefix in `old_string` or `new_string`.

### The replace_all Parameter

Use `replace_all: true` when you want to change every occurrence of a string — for example, renaming a variable throughout a file:

```
Edit(
  file_path="/src/App.jsx",
  old_string="oldVariableName",
  new_string="newVariableName",
  replace_all=true
)
```

## When to Use Write vs Edit

| Scenario | Tool | Reason |
|----------|------|--------|
| Creating a brand-new file | Write | File doesn't exist yet |
| Changing a few lines in a file | Edit | Targeted, sends only the diff |
| Complete rewrite of a file | Write | Everything is changing |
| Renaming a variable across a file | Edit + replace_all | Multiple targeted replacements |
| Adding a new function to a file | Edit | Insert at a specific location |

**Default preference: Edit.** Only use Write when creating new files or when the changes are so extensive that a full rewrite is clearer.

## Common Mistakes

- **Editing without reading first**: Both tools require a prior Read call
- **Non-unique old_string**: Include more context lines to disambiguate
- **Including line numbers in old_string**: Strip the `cat -n` prefix
- **Using Write for small changes**: Prefer Edit — it's more efficient and less error-prone
- **Creating files unnecessarily**: Always prefer editing existing files

## Key Takeaways

- Write creates or completely replaces files; Edit does targeted string replacement
- Both require reading the file first (for existing files)
- Edit's `old_string` must be unique unless `replace_all` is true
- Always prefer Edit over Write for modifications
- Match exact indentation from the file, not from the line-numbered Read output
