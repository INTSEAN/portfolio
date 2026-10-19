import { execFileSync } from 'node:child_process';
import { readFileSync, existsSync } from 'node:fs';

// Regression check: inspect current source, never display matched secret values.
const files = execFileSync('git', ['ls-files', '--cached', '--others', '--exclude-standard'], { encoding: 'utf8' }).trim().split('\n');
const failures = [];
for (const file of files) {
  if (!existsSync(file) || !/\.(?:js|jsx|ts|tsx|json|html|md|toml)$/.test(file) || file === 'package-lock.json') continue;
  const content = readFileSync(file, 'utf8');
  if (/console\.(?:log|info|debug)\([^\n]*(?:EMAIL_PASS|SMTP_PASS|PASSWORD)/i.test(content)) failures.push(`${file}: secret logging`);
  if (/\bpass(?:word)?\s*:\s*["'][a-z]{4}(?:\s?[a-z]{4}){3}["']/i.test(content)) failures.push(`${file}: literal app-password pattern`);
}
if (existsSync('server.js')) failures.push('obsolete SMTP server is present');
if (failures.length) { console.error(failures.join('\n')); process.exit(1); }
console.log('Security check passed: no obsolete SMTP backend, literal app-password pattern, or email-password logging.');
