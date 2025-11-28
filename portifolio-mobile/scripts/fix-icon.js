#!/usr/bin/env node
/**
 * Helper script to ensure the icon used by app.json is square.
 * It reads `app.json`, loads the icon image, and if it's not square, it creates
 * a squared icon at `assets/images/icon-square.png` by cropping the center
 * and updates app.json to reference the new icon.
 *
 * Usage: npm run fix-icon
 */

const fs = require('fs');
const path = require('path');
const Jimp = require('jimp');

const projectRoot = path.resolve(__dirname, '..');
const appJsonPath = path.join(projectRoot, 'app.json');

async function run() {
  if (!fs.existsSync(appJsonPath)) {
    console.error('app.json not found');
    process.exit(1);
  }

  const appJson = JSON.parse(fs.readFileSync(appJsonPath, 'utf8'));
  const iconPath = appJson.expo && appJson.expo.icon;
  if (!iconPath) {
    console.error('No icon specified in app.json');
    process.exit(1);
  }
  const iconFullPath = path.join(projectRoot, iconPath.replace(/^\.\//, ''));
  if (!fs.existsSync(iconFullPath)) {
    console.error('Icon file does not exist:', iconFullPath);
    process.exit(1);
  }

  const image = await Jimp.read(iconFullPath);
  const width = image.getWidth();
  const height = image.getHeight();
  console.log('Current icon size:', width, 'x', height);

  // Crop the center to square using the min side and resize to 1024px for smaller icon file
  const size = Math.min(width, height);
  const x = Math.floor((width - size) / 2);
  const y = Math.floor((height - size) / 2);
    // Crop if not square
    let newImg = image;
    if (width !== height) {
      const size = Math.min(width, height);
      const x = Math.floor((width - size) / 2);
      const y = Math.floor((height - size) / 2);
      newImg = image.crop(x, y, size, size);
    }
    // Always resize to 512x512 to reduce final icon file size (good for mobile)
    newImg.resize(512, 512);

  // Ensure output dir exists
  const outDir = path.join(projectRoot, 'assets', 'images');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const outPath = path.join(outDir, 'icon-square.png');
  await newImg.writeAsync(outPath);

  // Update app.json to point to the new icon
  appJson.expo.icon = './assets/images/icon-square.png';
  if (appJson.expo.android && appJson.expo.android.adaptiveIcon) {
    appJson.expo.android.adaptiveIcon.foregroundImage = './assets/images/icon-square.png';
  }

  fs.writeFileSync(appJsonPath, JSON.stringify(appJson, null, 2));
  console.log('Wrote new square icon to:', outPath);
  console.log('Updated app.json to use the squared icon.');
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
