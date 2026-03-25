# Bash Safety

Safe command execution is critical. Claude operates with real system access, so every Bash call must follow strict safety guidelines.

## Path Handling Rules

- **Always quote paths with spaces**: `cd "path with spaces/file.txt"`
- **Use absolute paths**: Avoid `cd` — use absolute paths to maintain a consistent working directory
- **Verify before creating**: Run `ls` to confirm parent directories exist before creating files or directories

## Sandbox Mode

By default, Bash commands run inside a **sandbox** that restricts access to the broader system. This prevents accidental damage to the host.

### The `dangerouslyDisableSandbox` Parameter

Setting `dangerouslyDisableSandbox: true` bypasses the sandbox entirely. This should be used with extreme caution and only when:

- The command genuinely requires access outside the sandbox
- You understand the security implications
- There is no safer alternative

## Dedicated Tools Over Bash

Never use Bash when a dedicated tool exists:

| Task | Wrong (Bash) | Right (Dedicated tool) |
|------|-------------|----------------------|
| Read a file | `cat file.txt` | Read tool |
| Search file contents | `grep "pattern" file.txt` | Grep tool |
| Find files | `find . -name "*.js"` | Glob tool |
| Edit a file | `sed -i 's/old/new/' file.txt` | Edit tool |
| Write a file | `echo "content" > file.txt` | Write tool |
| Print output | `echo "message"` | Output text directly |

The dedicated tools provide better user experience, proper permission handling, and safer operation.

## Destructive Command Awareness

Be especially careful with commands that modify or delete data:

- `rm -rf` — irreversible deletion
- `git reset --hard` — discards uncommitted changes
- `git push --force` — rewrites remote history
- `git checkout .` / `git restore .` — discards working changes
- `git clean -f` — removes untracked files

These should only be used when explicitly requested by the user, and safer alternatives should always be considered first.

## Command Chaining Best Practices

```bash
# Good: sequential dependent commands
npm install && npm run build

# Good: sequential independent commands
git status; git diff

# Bad: using newlines to separate commands
npm install
npm run build
```

Do not use newlines to separate commands within a single Bash call. Use `&&` or `;` instead.
