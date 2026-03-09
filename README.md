# @mcphunter/cli

Find and install MCP servers from [mcphunter.com](https://mcphunter.com) — right from your terminal.

## Quick start

```bash
# Search for an MCP server
npx @mcphunter/cli search "web search"

# Add to Claude Desktop (default)
npx @mcphunter/cli add exa

# Add to Cursor
npx @mcphunter/cli add exa --client cursor

# Get AI-recommended servers for your project
npx @mcphunter/cli stack "I'm building a customer support bot with Slack and email"

# List installed servers
npx @mcphunter/cli list
```

## Supported clients
- Claude Desktop (default)
- Cursor
- Windsurf  
- Continue

## What it does

`add` fetches the tool config from mcphunter.com and writes it to your local MCP client config file. No signup required.

## License
MIT
