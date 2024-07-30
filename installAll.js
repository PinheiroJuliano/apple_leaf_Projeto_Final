const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const directories = fs.readdirSync('./')
    .filter(file => fs.statSync(path.join('./', file)).isDirectory() && file !== 'node_modules');

directories.forEach(dir => {
    console.log(`Installing dependencies in ${dir}...`);
    execSync('npm install', { cwd: dir, stdio: 'inherit' });
});
