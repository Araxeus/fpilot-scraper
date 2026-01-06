console.log('Initializing fpilot updater...');

const downloadPageUrl = 'https://filepilot.tech/download';
const downloadUrl = 'https://filepilot.tech/download/latest';
const versionSelector = 'p.download-button-info';
const ExeName = 'FPilot.exe';

const currentVersion = (await Bun.file('version.txt').text()).trim();

const response = await fetch(downloadPageUrl);

const rewriter = new HTMLRewriter();

let version = '';
rewriter.on(versionSelector, {
  text(textNode) {
    const text = textNode.text.trim();
    if (text.startsWith('Beta')) {
      version = text;
      console.log(`Latest version: ${version}`);
    }
  },
});
await rewriter.transform(response).blob();

if (version === currentVersion) {
  console.log('No new version available. Exiting.');
  process.exit(0);
}

const artifact = await fetch(downloadUrl);
await Bun.write(ExeName, artifact);
await Bun.write('version.txt', version);

console.log(`Updated from version ${currentVersion} to ${version}.`);
