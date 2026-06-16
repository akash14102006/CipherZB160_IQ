const fs = require('fs');
const path = require('path');

function createDir(dir) {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

createDir('deploy');
createDir('deploy/assets/css');
createDir('deploy/assets/js');
createDir('deploy/assets/images');

// Copy assets/images
if (fs.existsSync('assets/images')) {
    const images = fs.readdirSync('assets/images');
    for (const img of images) {
        fs.copyFileSync(path.join('assets/images', img), path.join('deploy/assets/images', img));
    }
}

// Function to extract inline CSS and JS
function extractAndSave(file, baseName) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Extract CSS
    const cssRegex = /<style>([\s\S]*?)<\/style>/;
    const cssMatch = content.match(cssRegex);
    if (cssMatch) {
        const cssContent = cssMatch[1];
        fs.writeFileSync('deploy/assets/css/' + baseName + '.css', cssContent.trim());
        content = content.replace(cssRegex, '<link rel="stylesheet" href="assets/css/' + baseName + '.css">');
    }
    
    // Extract JS
    // Be careful, there might be multiple script tags. We want the main app logic one.
    // Usually it's the last script tag or the one containing switchTab or GlobalState.
    const jsRegex = /<script>\s*(?:\/\/\s*Tab switching engine|\/\/\s*Dashboard state)[\s\S]*?<\/script>/;
    const jsMatch = content.match(jsRegex);
    if (jsMatch) {
        let jsContent = jsMatch[0].replace(/<script>/, '').replace(/<\/script>/, '');
        fs.writeFileSync('deploy/assets/js/' + baseName + '.js', jsContent.trim());
        content = content.replace(jsRegex, '<script src="assets/js/' + baseName + '.js"></script>');
    }
    
    fs.writeFileSync('deploy/' + file, content);
}

extractAndSave('index.html', 'index');
extractAndSave('dashboard.html', 'dashboard');

// Copy data and reports for the deployment to work
function copyFolderRecursiveSync(source, target) {
    var files = [];
    var targetFolder = path.join(target, path.basename(source));
    if (!fs.existsSync(targetFolder)) {
        fs.mkdirSync(targetFolder, { recursive: true });
    }
    if (fs.existsSync(source) && fs.lstatSync(source).isDirectory()) {
        files = fs.readdirSync(source);
        files.forEach(function (file) {
            var curSource = path.join(source, file);
            if (fs.lstatSync(curSource).isDirectory()) {
                copyFolderRecursiveSync(curSource, targetFolder);
            } else {
                fs.copyFileSync(curSource, path.join(targetFolder, file));
            }
        });
    }
}

copyFolderRecursiveSync('data', 'deploy');
copyFolderRecursiveSync('reports', 'deploy');

console.log('Deployment structure created successfully.');
