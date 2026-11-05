const config = require('./app.json');
const approved = require('./src/content/approved.json');

if (process.env.VACH_RELEASE === '1' || process.env.EAS_BUILD_PROFILE === 'production') {
  if (!approved.length || approved.some((entry) => entry.isDemo || !entry.reviewed || entry.rights?.status !== 'approved' || !entry.rights?.licenseNote || !entry.reference?.edition || !(entry.longText?.en || entry.longText?.gu || entry.sourceUrl))) {
    throw new Error('Release blocked: add human-reviewed passages with documented redistribution rights to src/content/approved.json.');
  }
  if (/demo/i.test(config.expo.name) || /\.demo$/.test(config.expo.ios.bundleIdentifier) || /\.demo$/.test(config.expo.android.package)) {
    throw new Error('Release blocked: replace the demo app name and bundle identifiers.');
  }
}

module.exports = config;
