# PR Workflow

## Creating Pull Requests with Claude Code

Claude Code can handle the entire PR workflow — from creating branches to opening the pull request — all from your terminal.

## Branch Creation

Start by asking Claude to create a feature branch:

```
> Create a new branch called feat/add-search-filter
```

Claude runs `git checkout -b feat/add-search-filter` and confirms the switch.

## Making Changes and Committing

After implementing your changes, ask Claude to commit:

```
> Commit these changes with a descriptive message
```

Claude will:
1. Run `git status` and `git diff` to understand the changes
2. Draft a commit message summarizing the "why" not the "what"
3. Stage the relevant files (avoiding secrets or unnecessary files)
4. Create the commit

## Pushing and Creating the PR

Once your changes are committed, ask Claude to open a PR:

```
> Push this branch and create a PR
```

Claude uses the GitHub CLI (`gh`) to:
1. Push the branch with `git push -u origin <branch>`
2. Run `gh pr create` with a title and body
3. Return the PR URL

## Drafting PR Descriptions

Claude generates PR descriptions from your commit history:

```
> Create a PR with a summary of all changes since we branched from main
```

Claude reads `git log main..HEAD` and `git diff main...HEAD` to build a comprehensive summary with:
- A concise title (under 70 characters)
- Bullet-point summary of changes
- Test plan checklist

## Best Practices

- **One concern per PR**: Keep PRs focused on a single feature or fix
- **Review the description**: Claude drafts it, but you should verify accuracy
- **Check the diff**: Always review what's being pushed before confirming
- **Use draft PRs**: For work-in-progress, ask Claude to create a draft PR

## Key Takeaways

- Claude Code handles branch creation, commits, push, and PR creation
- PR descriptions are auto-generated from commit history and diffs
- The `gh` CLI is used under the hood for GitHub operations
- Always review the PR description and diff before confirming
