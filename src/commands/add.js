import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import ora from 'ora';
import { API_BASE, getConfigPath } from '../config.js';

export async function addCommand(slug, options) {
  const spinner = ora(`Looking up ${slug}...`).start();
  
  try {
    // Fetch tool from mcphunter API
    const res = await fetch(`${API_BASE}/tools/${slug}`);
    if (!res.ok) {
      spinner.fail(`Tool "${slug}" not found on mcphunter.com`);
      console.log(chalk.dim(`Browse tools at https://mcphunter.com`));
      process.exit(1);
    }
    const tool = await res.json();
    
    // Derive install command
    const ownerRepo = tool.github_url?.match(/github\.com\/([^/]+\/[^/\s?#]+)/)?.[1];
    if (!ownerRepo) {
      spinner.fail(`Cannot derive install path for "${slug}" — no GitHub URL found.`);
      process.exit(1);
    }
    
    // Build MCP config entry
    const mcpEntry = {
      command: 'npx',
      args: ['-y', `github:${ownerRepo}`],
    };
    
    // Read existing config or create new
    const configPath = getConfigPath(options.client);
    let config = { mcpServers: {} };
    
    if (fs.existsSync(configPath)) {
      try {
        config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
        if (!config.mcpServers) config.mcpServers = {};
      } catch {
        // Invalid JSON — back it up and start fresh
        fs.copyFileSync(configPath, configPath + '.backup');
        console.warn(chalk.yellow(`⚠ Backed up malformed config to ${configPath}.backup`));
      }
    } else {
      // Create directory if needed
      fs.mkdirSync(path.dirname(configPath), { recursive: true });
    }
    
    // Add the server
    config.mcpServers[tool.slug] = mcpEntry;
    
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
    
    spinner.succeed(`Added ${chalk.bold(tool.name)} to your ${options.client} config`);
    console.log('');
    console.log(chalk.dim('  Config path:'), chalk.white(configPath));
    console.log(chalk.dim('  Command:    '), chalk.green(`npx -y github:${ownerRepo}`));
    console.log('');
    console.log(chalk.dim('Restart your AI client for the changes to take effect.'));
  } catch (err) {
    spinner.fail(`Failed: ${err.message}`);
    process.exit(1);
  }
}
