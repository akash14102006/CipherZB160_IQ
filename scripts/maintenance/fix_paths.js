const fs = require('fs');
const path = require('path');

function replaceInFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // LightGBM
    content = content.replace(/reports\/model_performance\/lightgbm\/visualizations\//g, 'assets/visualization/LightGBM_visualizations/');
    
    // CatBoost
    content = content.replace(/reports\/model_performance\/catboost\/visualizations\//g, 'assets/visualization/CatBoost_visualizations/');
    
    // Isolation Forest
    content = content.replace(/reports\/model_performance\/isolation_forest\/visualizations\//g, 'assets/visualization/Isolation)_forest_visualizations/');
    
    // XGBoost (if any)
    content = content.replace(/reports\/model_performance\/xgboost\/visualizations\//g, 'assets/visualization/XGBoost_Visualization/');

    fs.writeFileSync(filePath, content);
}

// Rename Visualization to visualization
if (fs.existsSync('website/assets/Visualization')) {
    fs.renameSync('website/assets/Visualization', 'website/assets/visualization');
}

replaceInFile('website/index.html');
replaceInFile('website/dashboard.html');

console.log('Updated HTML image paths successfully.');
