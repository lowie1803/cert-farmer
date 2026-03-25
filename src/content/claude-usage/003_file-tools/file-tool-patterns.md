# File Tool Patterns

## The Read-Then-Edit Workflow

The most fundamental pattern in Claude Code file operations:

1. **Read** the file to understand its current contents
2. **Analyze** the content and identify what needs to change
3. **Edit** with a precise `old_string` that matches exactly

This is not optional — Edit and Write will **fail** if you attempt to modify a file you haven't read in the current conversation.

## Speculative Parallel Reads

When you suspect multiple files are relevant, read them all at once:

```
# Instead of reading one at a time:
Read("src/components/Header.jsx")    # wait...
Read("src/components/Footer.jsx")    # wait...
Read("src/components/Sidebar.jsx")   # wait...

# Read all in parallel:
Read("src/components/Header.jsx")
Read("src/components/Footer.jsx")    # all three at once
Read("src/components/Sidebar.jsx")
```

This is called **speculative** because you may not need all files, but the time saved when you do need them outweighs the cost of reading an extra file.

## Prefer Editing Existing Files

A core principle: **always prefer editing an existing file over creating a new one.**

Before creating a new file, ask:

- Does a similar file already exist that could be extended?
- Is there a configuration file that should be updated instead?
- Would this new file duplicate information found elsewhere?

Only create new files when they are **absolutely necessary** for the task.

## Avoid Unnecessary File Creation

Never proactively create:

- Documentation files (*.md) or READMEs unless explicitly requested
- Configuration files that aren't needed
- Backup copies of files
- Temporary scratch files

## Handling Empty Files

When you read a file that exists but has no content, the Read tool returns a **system warning** instead of file contents. This is important to recognize — the file exists, it is simply empty.

## Sequential Dependency Chains

Some operations must happen in order:

```
# Step 1: Read the file
Read("src/config.js")

# Step 2: Edit based on what we read (depends on step 1)
Edit("src/config.js", old_string="...", new_string="...")

# Step 3: Read again to verify (depends on step 2)
Read("src/config.js")
```

Never guess at file contents — always read first to get the exact text for `old_string`.

## Batch Edits to the Same File

When making multiple changes to one file, apply them sequentially. Each Edit call changes the file, so subsequent edits must account for prior changes:

1. Read the file
2. Apply Edit #1
3. Apply Edit #2 (the file now reflects Edit #1)
4. Apply Edit #3 (the file now reflects Edits #1 and #2)

Do not try to use `old_string` values from the original Read output for later edits — the file has changed.

## Anti-Patterns to Avoid

| Anti-Pattern | Why It's Bad | Correct Approach |
|-------------|-------------|-----------------|
| Editing without reading | Will fail; you don't know exact content | Always read first |
| Using Bash `sed` to edit files | Fragile, error-prone, hard to verify | Use the Edit tool |
| Using Bash `cat` to read files | Bypasses the Read tool's features | Use the Read tool |
| Using `echo >` to write files | No safety checks, no read requirement | Use the Write tool |
| Creating files "just in case" | Clutters the project | Only create when necessary |
| Guessing at indentation | Causes edit failures | Read first, match exactly |

## Key Takeaways

- Always follow the read-then-edit workflow — no exceptions
- Read multiple files in parallel when they are likely relevant
- Prefer editing existing files over creating new ones
- Account for prior edits when making multiple changes to the same file
- Never use Bash commands (sed, cat, echo) for file operations — use the dedicated tools
