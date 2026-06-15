const fs = require('fs');

const mappings = {
    'LightGBM': {
        'roc_curve.png': 'assets/visualization/LightGBM_visualizations/roc_curve.png',
        'pr_curve.png': 'assets/visualization/LightGBM_visualizations/pr_curve.png',
        'calibration_curve.png': 'assets/visualization/LightGBM_visualizations/calibration_curve.png',
        'lift_chart.png': 'assets/visualization/LightGBM_visualizations/lift_chart.png',
        'gain_chart.png': 'assets/visualization/LightGBM_visualizations/gain_chart.png'
    },
    'CatBoost': {
        'roc_curve.png': 'assets/visualization/CatBoost_visualizations/roc_curve.png',
        'pr_curve.png': 'assets/visualization/CatBoost_visualizations/pr_curve.png',
        'calibration_curve.png': 'assets/visualization/CatBoost_visualizations/calibration_curve.png',
        'lift_chart.png': 'assets/visualization/CatBoost_visualizations/lift_chart.png',
        'gain_chart.png': 'assets/visualization/CatBoost_visualizations/gain_chart.png'
    },
    'XGBoost': {
        'roc_curve.png': 'assets/visualization/XGBoost_Visualization/XGBoost ROC Curve.png',
        'pr_curve.png': 'assets/visualization/XGBoost_Visualization/XGBoost PR Curve.png',
        'calibration_curve.png': 'assets/visualization/XGBoost_Visualization/XGBoost Calibration Curve.png',
        'lift_chart.png': 'assets/visualization/XGBoost_Visualization/XGBoost Lift Chart.png',
        'gain_chart.png': 'assets/visualization/XGBoost_Visualization/XGBoost Gain Chart.png',
        'XGBoost ROC Curve.png': 'assets/visualization/XGBoost_Visualization/XGBoost ROC Curve.png',
        'XGBoost Precision Recall Curve.png': 'assets/visualization/XGBoost_Visualization/XGBoost PR Curve.png',
        'XGBoost Calibration Curve.png': 'assets/visualization/XGBoost_Visualization/XGBoost Calibration Curve.png',
        'XGBoost Lift Chart.png': 'assets/visualization/XGBoost_Visualization/XGBoost Lift Chart.png',
        'XGBoost Gain Chart.png': 'assets/visualization/XGBoost_Visualization/XGBoost Gain Chart.png'
    },
    'Isolation Forest': {
        'roc_curve.png': 'assets/visualization/Isolation_forest_visualizations/roc_curve.png',
        'pr_curve.png': 'assets/visualization/Isolation_forest_visualizations/pr_curve.png',
        'calibration_curve.png': 'assets/visualization/Isolation_forest_visualizations/calibration_curve.png',
        'lift_chart.png': 'assets/visualization/Isolation_forest_visualizations/lift_chart.png',
        'gain_chart.png': 'assets/visualization/Isolation_forest_visualizations/gain_chart.png'
    }
};

function processHtml(file) {
    let content = fs.readFileSync(file, 'utf8');

    content = content.replace(/<img[^>]+src="([^"]+)"[^>]*>/gi, (match, src) => {
        let newSrc = src;
        let lowerSrc = src.toLowerCase();
        
        if (lowerSrc.includes('lightgbm')) {
            for (let key in mappings['LightGBM']) {
                if (lowerSrc.includes(key.toLowerCase())) newSrc = mappings['LightGBM'][key];
            }
        } else if (lowerSrc.includes('catboost')) {
            for (let key in mappings['CatBoost']) {
                if (lowerSrc.includes(key.toLowerCase())) newSrc = mappings['CatBoost'][key];
            }
        } else if (lowerSrc.includes('xgboost')) {
            for (let key in mappings['XGBoost']) {
                if (lowerSrc.includes(key.toLowerCase().replace(/ /g, '%20'))) newSrc = mappings['XGBoost'][key];
                if (lowerSrc.includes(key.toLowerCase())) newSrc = mappings['XGBoost'][key];
            }
        } else if (lowerSrc.includes('isolation_forest') || lowerSrc.includes('isolation)%5fforest') || lowerSrc.includes('isolation_forest_visualizations')) {
            for (let key in mappings['Isolation Forest']) {
                if (lowerSrc.includes(key.toLowerCase())) newSrc = mappings['Isolation Forest'][key];
            }
        }
        
        let finalMatch = match;
        if (newSrc !== src) {
            finalMatch = finalMatch.replace(/src="[^"]+"/, 'src="' + newSrc + '"');
        }

        // Add onerror if it points to visualization and doesn't already have one
        if (newSrc.includes('assets/visualization') && !finalMatch.includes('onerror')) {
            const onerrorAttr = ' onerror="this.onerror=null; this.src=\'assets/images/cipher-logo.png\'; this.alt=\'Visualization Not Available\'; this.style.opacity=\'0.2\'; this.style.padding=\'2rem\';"';
            finalMatch = finalMatch.replace(/>$/, onerrorAttr + '>');
        }
        
        return finalMatch;
    });

    // Final scrub of anything that looks like reports/ or visualizations/ that isn't assets/visualization/
    content = content.replace(/src="reports\/[^"]+"/g, 'src="assets/images/cipher-logo.png" onerror="this.onerror=null; this.alt=\'Visualization Not Available\';"');
    content = content.replace(/src="visualizations\/[^"]+"/g, 'src="assets/images/cipher-logo.png" onerror="this.onerror=null; this.alt=\'Visualization Not Available\';"');

    fs.writeFileSync(file, content);
}

processHtml('website/index.html');
processHtml('website/dashboard.html');

console.log('Fixed paths.');
