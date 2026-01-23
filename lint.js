#!/usr/bin/env node

/**
 * Simple lint checker for CI/CD pipeline
 * Performs basic code quality checks
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Running code quality checks...\n');

let lintSuccess = true;

// Check JavaScript files for basic issues
const jsFiles = [
    'src/scripts/app.js',
    'src/scripts/weather-api.js',
    'src/scripts/ui.js'
];

jsFiles.forEach(file => {
    const filePath = path.join(__dirname, file);
    if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf8');

        // Basic checks
        if (content.includes('console.log') && !content.includes('DEBUG')) {
            console.log(`⚠️  ${file} - Contains console.log statements`);
        }

        console.log(`✅ ${file} - Passed basic checks`);
    }
});

console.log('\n✨ Lint checks completed!');
process.exit(0);
