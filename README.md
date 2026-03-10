# @mcphunter/cli

> Find and install MCP servers from your terminal — no config files, no copy-pasting JSON.

[![npm](https://img.shields.io/npm/v/@mcphunter/cli?color=6366f1&label=npm)](https://www.npmjs.com/package/@mcphunter/cli)
[![license](https://img.shields.io/badge/license-MIT-zinc)](LICENSE)
[![mcphunter.com](https://img.shields.io/badge/directory-mcphunter.com-6366f1)](https://mcphunter.com)

**`@mcphunter/cli`** is the official command-line tool for [MCP Hunter](https://mcphunter.com) — the curated directory of Model Context Protocol servers. Search 200+ MCP servers, get AI-powered recommendations for your project, and install directly into Claude Desktop, Cursor, Windsurf, or Continue in one command.

No account required.

---

## Quick start

```bash
# Search for an MCP server
npx @mcphunter/cli search "web search"

# Add one to Claude Desktop
npx @mcphunter/cli add exa

# Get AI-recommended servers for your specific project
npx @mcphunter/cli stack "I'm building a customer support bot with Slack and email"

# See what you have installed
npx @mcphunter/cli list
```

---

## What it does

When you run `add`, the CLI:

1. Looks up the tool on [mcphunter.com](https://mcphunter.com)
2. Generates the correct MCP config entry
3. Writes it directly to your local config file
4. Confirms with the file path and command used

No manual JSON editing. No copy-paste from docs. Just one command.

---

## Commands

### `add <slug>`

Install an MCP server into your AI client's config.

```bash
npx @mcphunter/cli add n8n
npx @mcphunter/cli add exa --client cursor
npx @mcphunter/cli add postgres-mcp --client windsurf
```

| Flag | Description | Default |
|------|-------------|---------|
| `--client` | Target client: `claude`, `cursor`, `windsurf`, `continue` | `claude` |

---

### `search <query>`

Semantic search across the MCP Hunter directory.

```bash
npx @mcphunter/cli search "database query"
npx @mcphunter/cli search "send emails" --limit 10
```

Returns tool names, descriptions, star counts, and the install command for each result.

---

### `stack "<description>"`

Describe what you're building. Get an AI-curated set of MCP servers that fit together.

```bash
npx @mcphunter/cli stack "SaaS app with Stripe, Postgres, and customer Slack support"
npx @mcphunter/cli stack "research assistant that reads PDFs and browses the web"
```

Powered by the same [Build My Stack](https://mcphunter.com/build-my-stack) feature on the web — available directly from your terminal.

---

### `list`

Show all MCP servers currently installed in your config.

```bash
npx @mcphunter/cli list
npx @mcphunter/cli list --client cursor
```

---

## Supported clients

| Client | Config location |
|--------|----------------|
| **Claude Desktop** (default) | `~/Library/Application Support/Claude/claude_desktop_config.json` |
| **Cursor** | `~/.cursor/mcp.json` |
| **Windsurf** | `~/.codeium/windsurf/mcp_config.json` |
| **Continue** | `~/.continue/config.json` |

Windows and Linux paths are automatically detected.

---

## Why MCP Hunter

[mcphunter.com](https://mcphunter.com) is a curated, safety-rated directory of Model Context Protocol servers. Every listing includes:

- Install config for all major AI clients
- GitHub stars and repository link
- Safety rating (Community / Verified / Official)
- AI-powered "Works Well With" recommendations
- Semantic search — describe what you need, find what fits

The CLI brings all of that into your terminal workflow.

---

## Install permanently (optional)

If you'd rather install globally than use `npx`:

```bash
npm install -g @mcphunter/cli
mcphunter add exa
mcphunter stack "build me a research agent"
```

---

## Built by Focus Makers

`@mcphunter/cli` is built and maintained by the team at [Focus Makers](https://focusmakers.com) — an AI-native company running an autonomous agent fleet to build, grow, and ship products in the MCP and developer tools space.

MCP Hunter ([mcphunter.com](https://mcphunter.com)) is our flagship project: a living directory of MCP servers, growing daily, built for developers who build with AI.

We use AI agents to write the code, run the operations, and grow the product. This CLI was built by our engineering agent, Riggs, in a single sprint. The fleet keeps shipping.

Follow the build: [@FocusMakers](https://x.com/focusmakers) on X.

---

## Contributing

Found an MCP server that should be listed? Submit it at [mcphunter.com/submit](https://mcphunter.com/submit).

Issues and PRs welcome on this repo.

---

## License

MIT © [Focus Makers](https://focusmakers.com)
