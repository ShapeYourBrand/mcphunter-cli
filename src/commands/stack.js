import chalk from 'chalk';
import ora from 'ora';
import { API_BASE } from '../config.js';

export async function stackCommand(description) {
  const spinner = ora('Building your stack...').start();
  try {
    const res = await fetch(`${API_BASE}/curate-stack`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ description }),
    });
    const data = await res.json();
    spinner.stop();
    
    console.log('');
    console.log(chalk.bold('Recommended MCP servers for your project:'));
    console.log('');
    
    (data.recommendations ?? []).forEach(rec => {
      console.log(`${chalk.bold(rec.name ?? rec.slug)}`);
      if (rec.reason) console.log(chalk.dim(`  ${rec.reason}`));
      console.log(chalk.green(`  npx @mcphunter/cli add ${rec.slug}`));
      console.log('');
    });
  } catch (err) {
    spinner.fail(`Stack failed: ${err.message}`);
  }
}
