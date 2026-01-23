#!/usr/bin/env node

/**
 * Simple build script for CI/CD pipeline
 * Validates that all required files exist
 */

const fs = require('fs');
const path = require('path');

console.log('🔨 Starting build process...\n');

const requiredFiles = [
  'src/index.html',
  'src/styles/main.css',
  'src/scripts/app.js',
  'src/scripts/weather-api.js',
  'src/scripts/ui.js'
];

let buildSuccess = true;

// Check if all required files exist
requiredFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    console.log(`✅ ${file} - Found`);
  } else {
    console.log(`❌ ${file} - Missing`);
    buildSuccess = false;
  }
});

console.log('\n');

if (buildSuccess) {
  console.log('✨ Build completed successfully!');
  process.exit(0);
} else {
  console.log('❌ Build failed - missing required files');
  process.exit(1);
}
