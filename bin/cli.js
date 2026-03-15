#!/usr/bin/env node
import { createRequire } from 'module';
import { program } from 'commander';
import { addCommand } from '../src/commands/add.js';
import { searchCommand } from '../src/commands/search.js';
import { stackCommand } from '../src/commands/stack.js';
import { listCommand } from '../src/commands/list.js';
import { publishCommand, publishCommandHelp } from '../src/commands/publish.js';

program
  .name('mcphunter')
  .description('Find and install MCP servers from mcphunter.com')
  .version('0.1.0');

program
  .command('add <slug>')
  .description('Add an MCP server to your Claude Desktop (or other client) config')
  .option('-c, --client <client>', 'Target client: claude (default), cursor, windsurf, continue', 'claude')
  .action(addCommand);

program
  .command('search <query>')
  .description('Search for MCP servers by name or description')
  .option('-n, --limit <n>', 'Number of results', '5')
  .action(searchCommand);

program
  .command('stack <description>')
  .description('Get AI-recommended MCP servers for your project')
  .action(stackCommand);

program
  .command('list')
  .description('List MCP servers installed in your config')
  .option('-c, --client <client>', 'Target client: claude (default), cursor, windsurf, continue', 'claude')
  .action(listCommand);

program
  .command('publish')
  .description('Submit an MCP server to mcphunter.com.\n\n' + publishCommandHelp)
  .option('-f, --file <path>', 'Path to a JSON config (defaults to interactive prompts)')
  .action(publishCommand);

program.parse();
