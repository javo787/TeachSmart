#!/usr/bin/env node
/**
 * Build script for Қаҳрамони ҳафта (Hero of the Week).
 *
 * The app ships as a single offline-ready index.html, so Tailwind can't be
 * left as a normal build step that outputs a separate CSS file — instead
 * this script compiles src/input.css (scanning index.html for used classes)
 * and injects the result back into the <style id="tailwind-generated">
 * block in index.html, keeping distribution as one self-contained file.
 *
 * Usage: npm run build
 */
const { execFileSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const inputCss = path.join(root, 'src', 'input.css');
const htmlPath = path.join(root, 'index.html');
const tmpCss = path.join(root, '.tmp-tailwind-build.css');
const tailwindBin = path.join(root, 'node_modules', '.bin', 'tailwindcss');

if (!fs.existsSync(tailwindBin)) {
  console.error('✗ Tailwind CLI not found. Run "npm install" first.');
  process.exit(1);
}

console.log('→ Compiling Tailwind CSS from src/input.css...');
execFileSync(
  tailwindBin,
  ['-i', inputCss, '-o', tmpCss, '--content', htmlPath, '--minify'],
  { stdio: 'inherit' }
);

const compiledCss = fs.readFileSync(tmpCss, 'utf8').trim();
fs.unlinkSync(tmpCss);

let html = fs.readFileSync(htmlPath, 'utf8');
const markerRegex = /<style id="tailwind-generated">[\s\S]*?<\/style>/;

if (!markerRegex.test(html)) {
  console.error('✗ Could not find <style id="tailwind-generated"> block in index.html');
  process.exit(1);
}

html = html.replace(markerRegex, `<style id="tailwind-generated">${compiledCss}</style>`);
fs.writeFileSync(htmlPath, html);

console.log(`✓ index.html updated (${(compiledCss.length / 1024).toFixed(1)} KB of CSS embedded)`);
