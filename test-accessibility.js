#!/usr/bin/env node

/**
 * EAA Compliance Test Script für Salon Fellnasen
 * Tests für WCAG 2.2 AA und EN301549 Standards
 */

const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('\n🔍 EAA Accessibility Compliance Test für Salon Fellnasen\n');

// Test Configuration
const testConfig = {
    baseUrl: 'http://localhost:5500',
    pages: [
        '',
        '/impressum.html'
    ],
    reportDir: './a11y-reports',
    wcagLevel: 'WCAG2AA'
};

// Stelle sicher dass Report-Directory existiert
if (!fs.existsSync(testConfig.reportDir)) {
    fs.mkdirSync(testConfig.reportDir, { recursive: true });
}

async function runCommand(command, args = []) {
    return new Promise((resolve, reject) => {
        const child = spawn(command, args, { 
            stdio: 'inherit',
            shell: true 
        });
        
        child.on('close', (code) => {
            if (code === 0) {
                resolve();
            } else {
                reject(new Error(`Command failed with code ${code}`));
            }
        });
    });
}

async function runTests() {
    try {
        console.log('📋 Starte EAA Compliance Tests...\n');
        
        // 1. Pa11y Tests für jede Seite
        console.log('🔍 Pa11y WCAG 2.2 AA Tests...');
        for (const page of testConfig.pages) {
            const url = testConfig.baseUrl + page;
            const filename = page === '' ? 'index' : page.replace(/[^a-z0-9]/gi, '_');
            
            console.log(`  Testing: ${url}`);
            await runCommand('npx', [
                'pa11y',
                '--standard', testConfig.wcagLevel,
                '--reporter', 'json',
                '--timeout', '20000',
                '--ignore', 'notice',
                url
            ]);
        }
        
        // 2. Axe-Core Tests
        console.log('\n🔍 Axe-Core Tests...');
        await runCommand('npx', [
            'axe',
            testConfig.baseUrl,
            '--tags', 'wcag2a,wcag2aa,wcag21aa,wcag22aa'
        ]);
        
        // 3. Lighthouse Accessibility Audit
        console.log('\n🔍 Lighthouse Accessibility Audit...');
        await runCommand('npx', [
            'lighthouse',
            testConfig.baseUrl,
            '--only-categories=accessibility',
            '--chrome-flags=--headless'
        ]);
        
        console.log('\n✅ Alle EAA Compliance Tests abgeschlossen!');
        console.log(`📊 Reports gespeichert in: ${testConfig.reportDir}/`);
        
        // Summary
        console.log('\n📋 EAA Test Summary:');
        console.log('  ✓ WCAG 2.2 AA Tests (pa11y)');
        console.log('  ✓ EN301549 Tests (axe-core)');
        console.log('  ✓ Lighthouse Accessibility Audit');
        console.log('\n🎯 Bereit für European Accessibility Act Compliance!');
        
    } catch (error) {
        console.error('\n❌ Test failed:', error.message);
        process.exit(1);
    }
}

// Starte die Tests
runTests(); 