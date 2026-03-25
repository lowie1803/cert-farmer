# Authentication

## First-Run OAuth Flow

When you launch `claude` for the first time, it starts an interactive OAuth flow:

1. Claude Code opens your browser to Anthropic's login page
2. You sign in with your Anthropic account
3. The browser redirects back, and Claude Code stores the token locally
4. You're ready to go — no manual key copying needed

This is the **recommended** approach for individual developers.

## API Key Authentication

For automated environments or when OAuth isn't practical, use an API key:

```bash
export ANTHROPIC_API_KEY=sk-ant-...
claude
```

Set the `ANTHROPIC_API_KEY` environment variable before launching Claude Code. You can add it to your shell profile (`~/.bashrc`, `~/.zshrc`) for persistence:

```bash
echo 'export ANTHROPIC_API_KEY=sk-ant-your-key-here' >> ~/.zshrc
source ~/.zshrc
```

> **Security**: Never commit API keys to version control. Use environment variables or a secrets manager.

## Organization vs Personal Accounts

| Account Type | How It Works |
|-------------|-------------|
| **Personal** | Linked to your individual Anthropic account, billed to your personal plan |
| **Organization** | Linked to a team account, usage billed to the organization |

If you belong to an organization, the OAuth flow will let you select which account to use.

## Verifying Authentication

To confirm you're authenticated:

```bash
claude "hello"
```

If authentication is valid, Claude will respond. If not, you'll see an error prompting you to re-authenticate.

You can also check your current auth status by looking at the welcome message when launching `claude` — it shows which account you're connected to.

## Switching Accounts

To switch between accounts or re-authenticate:

```bash
claude auth logout
claude auth login
```

## Key Takeaways

- First-run OAuth is the easiest setup — just follow the browser prompts
- For CI/automation, set the `ANTHROPIC_API_KEY` environment variable
- Never commit API keys to git
- Use `claude auth login` / `claude auth logout` to manage accounts
