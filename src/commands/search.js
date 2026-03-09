import chalk from 'chalk';
import ora from 'ora';
import { API_BASE } from '../config.js';

export async function searchCommand(query, options) {
  const spinner = ora(`Searching for "${query}"...`).start();
  try {
    const res = await fetch(`${API_BASE}/search?q=${encodeURIComponent(query)}&limit=${options.limit}`);
    const data = await res.json();
    spinner.stop();
    
    if (!data.results?.length) {
      console.log(chalk.yellow('No results found.'));
      return;
    }
    
    console.log('');
    data.results.forEach((tool, i) => {
      console.log(`${chalk.bold(tool.name)} ${chalk.dim(`⭐ ${tool.github_stars ?? 0}`)}`);
      console.log(chalk.dim(`  ${tool.description?.slice(0, 80) ?? ''}`));
      console.log(chalk.green(`  npx @mcphunter/cli add ${tool.slug}`));
      console.log('');
    });
  } catch (err) {
    spinner.fail(`Search failed: ${err.message}`);
  }
}
