# Git Operations

Claude follows a strict **Git Safety Protocol** when working with repositories. These rules prevent data loss and maintain clean commit history.

## Git Safety Rules

### Never Do (Unless Explicitly Asked)

| Action | Why it's dangerous |
|--------|--------------------|
| Update git config | Can change user identity or behavior globally |
| `git push --force` | Rewrites remote history, can destroy others' work |
| `git reset --hard` | Discards all uncommitted changes permanently |
| `git checkout .` / `git restore .` | Discards working tree changes |
| `git clean -f` | Removes untracked files permanently |
| `git branch -D` | Force-deletes a branch even if unmerged |
| Skip hooks (`--no-verify`) | Bypasses quality checks |
| Skip signing (`--no-gpg-sign`) | Bypasses commit signing |

### Always Create NEW Commits

Never amend an existing commit unless the user explicitly asks. This is critical after a pre-commit hook failure:

- A failed hook means the commit did **not** happen
- Using `--amend` would modify the **previous** commit — potentially destroying work
- Instead: fix the issue, re-stage, and create a **new** commit

## Commit Format

Always use a HEREDOC to pass the commit message for correct formatting:

```bash
git commit -m "$(cat <<'EOF'
Add user authentication middleware

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
EOF
)"
```

### Commit Message Guidelines

- Summarize the nature of changes (new feature, bug fix, refactoring, etc.)
- Focus on the **why** rather than the **what**
- Keep it concise (1-2 sentences)
- Always include the `Co-Authored-By` line

## Staging Best Practices

- **Prefer specific files**: `git add src/auth.js src/middleware.js`
- **Avoid broad staging**: `git add -A` or `git add .` can accidentally include secrets (`.env`, `credentials.json`) or large binaries
- Never commit files that likely contain secrets — warn the user if they ask

## Pull Request Creation with `gh` CLI

The standard PR workflow:

1. **Check state** (parallel): `git status`, `git diff`, `git log`, check remote tracking
2. **Analyze** all commits from branch divergence point using `git diff [base-branch]...HEAD`
3. **Create PR** with HEREDOC body format:

```bash
gh pr create --title "Add auth middleware" --body "$(cat <<'EOF'
## Summary
- Add JWT authentication middleware
- Integrate with existing route handlers

## Test plan
- [ ] Verify token validation
- [ ] Test expired token handling
EOF
)"
```

### PR Guidelines

- Keep title under 70 characters
- Use the body for details, not the title
- Never force push to main/master — warn the user if requested

## Interactive Commands

Never use git commands with the `-i` flag (`git rebase -i`, `git add -i`) as they require interactive input which is not supported. Also never use `--no-edit` with `git rebase`.
