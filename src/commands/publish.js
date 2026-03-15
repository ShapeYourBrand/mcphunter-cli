import { readFile } from 'node:fs/promises';
import readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import chalk from 'chalk';

const REQUIRED_FIELDS = ['name', 'slug', 'description', 'install_command'];
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const SUBMIT_URL = 'https://mcphunter.com/api/submit';

function ensureHttpUrl(value, field) {
  if (!value) {
    return value;
  }

  if (!value.startsWith('http://') && !value.startsWith('https://')) {
    throw new Error(`${field} must start with http:// or https://`);
  }

  return value;
}

function validatePayload(payload) {
  const missing = REQUIRED_FIELDS.filter((field) => !payload[field] || payload[field].toString().trim().length === 0);

  if (missing.length > 0) {
    throw new Error(`Missing required fields: ${missing.join(', ')}`);
  }

  if (!SLUG_PATTERN.test(payload.slug)) {
    throw new Error('Slug must be lowercase-kebab-case (letters, numbers, hyphens).');
  }

  ensureHttpUrl(payload.homepage_url, 'homepage_url');
  ensureHttpUrl(payload.github_url, 'github_url');

  return {
    name: payload.name.trim(),
    slug: payload.slug.trim(),
    description: payload.description.trim(),
    homepage_url: payload.homepage_url?.trim() ?? undefined,
    github_url: payload.github_url?.trim() ?? undefined,
    install_command: payload.install_command.trim(),
    tags: payload.tags ?? undefined,
    category: payload.category ?? undefined,
  };
}

async function readConfigFile(path) {
  const contents = await readFile(path, 'utf8');
  let parsed;

  try {
    parsed = JSON.parse(contents);
  } catch {
    throw new Error(`Config file ${path} is not valid JSON.`);
  }

  return parsed;
}

async function promptForPayload() {
  const rl = readline.createInterface({ input, output });

  const ask = async (question) => {
    const answer = await rl.question(chalk.cyan(`${question}: `));
    return answer.trim();
  };

  try {
    const name = await ask('Name');
    const slug = await ask('Slug (lowercase-kebab-case)');
    const description = await ask('Description');
    const homepage_url = await ask('Homepage URL (optional)');
    const github_url = await ask('GitHub URL (optional)');
    const install_command = await ask('Install command (e.g. npx -y my-mcp-server)');

    return {
      name,
      slug,
      description,
      homepage_url: homepage_url || undefined,
      github_url: github_url || undefined,
      install_command,
    };
  } finally {
    rl.close();
  }
}

async function submitPayload(payload) {
  const response = await fetch(SUBMIT_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const text = await response.text();
  let data;

  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    data = { message: text };
  }

  if (!response.ok) {
    const errorMessage = data?.error || data?.message || 'Request failed';
    throw new Error(`${response.status} ${response.statusText}: ${errorMessage}`);
  }

  return data;
}

export async function publishCommand(options) {
  try {
    const payloadSource = options.file
      ? await readConfigFile(options.file)
      : await promptForPayload();

    const payload = validatePayload(payloadSource);
    const result = await submitPayload(payload);

    const message = result?.message ?? "Submission received. We'll review within 48 hours.";
    console.log(chalk.green('✅ Success:'), message);
  } catch (error) {
    console.error(chalk.red('✖ Error:'), error.message ?? error);
    process.exitCode = 1;
  }
}

export const publishCommandHelp = `Submit your MCP server directly to mcphunter.com.

Usage:
  mcphunter publish --file mcp.json
  mcphunter publish

Config file format:
{
  "name": "My MCP Server",
  "slug": "my-mcp-server",
  "description": "What it does",
  "homepage_url": "https://...",
  "github_url": "https://github.com/...",
  "install_command": "npx -y my-mcp-server",
  "tags": ["tag1"],
  "category": "tools"
}`;
