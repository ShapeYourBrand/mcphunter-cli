export const API_BASE = 'https://mcphunter.com/api';

export const CONFIG_PATHS = {
  claude: {
    mac: `${process.env.HOME}/Library/Application Support/Claude/claude_desktop_config.json`,
    linux: `${process.env.HOME}/.config/Claude/claude_desktop_config.json`,
    win: `${process.env.APPDATA}/Claude/claude_desktop_config.json`,
  },
  cursor: {
    mac: `${process.env.HOME}/.cursor/mcp.json`,
    linux: `${process.env.HOME}/.cursor/mcp.json`,
    win: `${process.env.APPDATA}/.cursor/mcp.json`,
  },
  windsurf: {
    mac: `${process.env.HOME}/.codeium/windsurf/mcp_config.json`,
    linux: `${process.env.HOME}/.codeium/windsurf/mcp_config.json`,
    win: `${process.env.APPDATA}/.codeium/windsurf/mcp_config.json`,
  },
  continue: {
    mac: `${process.env.HOME}/.continue/config.json`,
    linux: `${process.env.HOME}/.continue/config.json`,
    win: `${process.env.APPDATA}/.continue/config.json`,
  },
};

export function getConfigPath(client) {
  const platform = process.platform === 'win32' ? 'win' : process.platform === 'darwin' ? 'mac' : 'linux';
  return CONFIG_PATHS[client]?.[platform] ?? CONFIG_PATHS.claude.mac;
}
