# Installation

## System Requirements

Claude Code runs in your terminal and requires:

| Requirement | Minimum |
|-------------|---------|
| **Node.js** | v18.0.0 or later |
| **OS** | macOS, Linux, or Windows (via WSL) |
| **Terminal** | Any modern terminal emulator |

> **Note**: Windows users must use WSL (Windows Subsystem for Linux). Native Windows CMD/PowerShell is not supported.

## Installing Claude Code

Install globally via npm:

```bash
npm install -g @anthropic-ai/claude-code
```

This installs the `claude` command globally, making it available from any directory.

## Verifying the Installation

Check that Claude Code is installed and see the version:

```bash
claude --version
```

You should see output like `claude-code v1.x.x`.

## Updating Claude Code

To update to the latest version:

```bash
npm update -g @anthropic-ai/claude-code
```

Claude Code also checks for updates automatically and will notify you when a new version is available.

## Terminal Compatibility

Claude Code works best with terminals that support:

- **256-color or true-color** — for syntax highlighting and UI elements
- **Unicode** — for icons and status indicators
- **Sufficient width** — 80+ columns recommended

Popular compatible terminals include iTerm2, Alacritty, Kitty, Windows Terminal (via WSL), and the default macOS/Linux terminals.

## Troubleshooting Installation

| Problem | Solution |
|---------|----------|
| `npm: command not found` | Install Node.js from nodejs.org |
| Permission errors | Use `sudo npm install -g` or fix npm permissions |
| Old Node.js version | Update Node.js to v18+ using nvm or your package manager |
| Command not found after install | Ensure npm global bin is in your PATH |

## Key Takeaways

- Claude Code requires Node.js v18+ and a Unix-like environment
- Install with `npm install -g @anthropic-ai/claude-code`
- Verify with `claude --version`
- Update with `npm update -g @anthropic-ai/claude-code`
