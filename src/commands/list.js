import fs from 'fs';
import chalk from 'chalk';
import { getConfigPath } from '../config.js';

export async function listCommand(options) {
  const configPath = getConfigPath(options.client);
  
  if (!fs.existsSync(configPath)) {
    console.log(chalk.yellow(`No config found at ${configPath}`));
    console.log(chalk.dim(`Run: npx @mcphunter/cli add <tool> to install your first MCP server`));
    return;
  }
  
  try {
    const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
    const servers = Object.entries(config.mcpServers ?? {});
    
    if (!servers.length) {
      console.log(chalk.yellow('No MCP servers installed yet.'));
      return;
    }
    
    console.log('');
    console.log(chalk.bold(`${servers.length} MCP server(s) in your ${options.client} config:`));
    console.log('');
    servers.forEach(([name, cfg]) => {
      console.log(`  ${chalk.green('●')} ${chalk.bold(name)}`);
      if (cfg.command) console.log(chalk.dim(`    ${cfg.command} ${(cfg.args ?? []).join(' ')}`));
    });
    console.log('');
  } catch {
    console.log(chalk.red('Could not parse config file.'));
  }
}
