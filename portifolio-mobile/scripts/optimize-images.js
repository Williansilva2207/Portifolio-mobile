#!/usr/bin/env node
/*
 * Simple image optimizer for the project assets.
 * - resizes images with a max width/height to 1400px
 * - writes webp versions to assets/images/optimized/
 * - this reduces app bundle size and speeds up startup
 */

const fs = require('fs');
const path = require('path');
const Jimp = require('jimp');

const projectRoot = path.resolve(__dirname, '..');
const imagesDir = path.join(projectRoot, 'assets', 'images');
const outDir = path.join(imagesDir, 'optimized');

const MAX_DIM = 1400; // dimensao maxima (px)
const QUALITY = 80; // qualidade de compressao

(async function run() {
  if (!fs.existsSync(imagesDir)) {
    console.error('assets/images not found:', imagesDir);
    process.exit(1);
  }
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const files = fs.readdirSync(imagesDir).filter((f) => /\.(png|jpe?g)$/i.test(f));
  for (const file of files) {
    try {
      const full = path.join(imagesDir, file);
      const img = await Jimp.read(full);
      const w = img.getWidth();
      const h = img.getHeight();
      const scale = Math.min(1, MAX_DIM / Math.max(w, h));
      if (scale < 1) img.resize(Math.round(w * scale), Math.round(h * scale));
      const outName = path.join(outDir, file.replace(/\.[^.]+$/, '.webp'));
      await img.quality(QUALITY).writeAsync(outName);
      console.log('Optimized', file, '->', outName);
    } catch (err) {
      console.warn('Failed to optimize', file, '-', err.message);
    }
  }

  console.log('Done — optimized images written to', outDir);
})();
