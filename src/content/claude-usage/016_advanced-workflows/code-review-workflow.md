# Code Review Workflow

## Reviewing PRs with Claude Code

Claude Code can review pull requests directly from your terminal using the GitHub CLI, without needing to open a browser.

## Fetching a PR for Review

Give Claude a PR number or URL:

```
> Review PR #42
```

Claude will:
1. Run `gh pr view 42` to get the PR metadata
2. Run `gh pr diff 42` to read the full diff
3. Analyze the changes and provide feedback

## What Claude Looks For

During a review, Claude examines:

| Category | Examples |
|----------|----------|
| **Correctness** | Logic errors, off-by-one, null handling |
| **Security** | Injection vulnerabilities, exposed secrets, unsafe inputs |
| **Performance** | Unnecessary re-renders, N+1 queries, missing memoization |
| **Style** | Naming conventions, code organization, consistency |
| **Testing** | Missing test coverage, edge cases, assertion quality |

## Reading Specific Files in a PR

You can focus the review on specific areas:

```
> Show me just the changes to src/auth/ in PR #42
> What new dependencies were added in PR #42?
> Are there any breaking changes in the API endpoints?
```

## Leaving Comments

Claude can post review comments using the GitHub CLI:

```
> Leave a comment on PR #42 suggesting the auth check should use strict equality
```

Claude runs `gh pr comment 42 --body "..."` or uses the review API for inline comments.

## Approving or Requesting Changes

```
> Approve PR #42
> Request changes on PR #42 with the feedback we discussed
```

Claude uses `gh pr review 42 --approve` or `--request-changes` with the appropriate body.

## Best Practices

- **Read the full diff** before approving — don't rely solely on Claude's summary
- **Check test coverage** — ask Claude if new code paths have tests
- **Verify CI status** — ask Claude to check `gh pr checks 42`
- **Be specific** — "Review the error handling in the new middleware" gets better results than "review this PR"

## Key Takeaways

- Use `gh` commands to fetch PR metadata, diffs, and status
- Claude analyzes for correctness, security, performance, style, and testing
- You can post comments, approve, or request changes from the terminal
- Always verify CI checks and review the full diff yourself
