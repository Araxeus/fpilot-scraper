import { appendFile } from 'node:fs/promises';

console.log('Initializing fpilot updater...');

const jsBundleUrl = 'https://filepilot.tech/core.js';
const downloadUrl = 'https://filepilot.tech/download/latest';
const ExeName = 'FPilot.exe';

const currentVersion = (await Bun.file('version.txt').text()).trim();

const jsBundle = await fetch(jsBundleUrl).then((res) => res.text());
const version = jsBundle.match(/version: "([^"]+)"/)?.[1];

if (!version) {
  console.error('Failed to parse version from download page.');
  process.exit(1);
}

if (version === currentVersion) {
  console.log(`Current version: ${currentVersion}, New version: ${version}\nNo new version available. Exiting.`);
  process.exit(0);
}

const artifact = await fetch(downloadUrl);
await Bun.write(ExeName, artifact);
await Bun.write('version.txt', version);

console.log(`Updated from version ${currentVersion} to ${version}.`);

// Output version for GitHub Actions
const githubOutput = process.env.GITHUB_OUTPUT;
if (githubOutput) {
  const tag = version.replace(/\s+/g, '-');
  await appendFile(
    githubOutput,
    `new_version=true\nversion=${version}\ntag=${tag}\n`,
  );
}
