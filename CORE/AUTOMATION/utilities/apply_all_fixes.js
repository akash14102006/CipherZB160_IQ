const fs = require('fs');
const path = require('path');

const indexHtmlPath = path.join(__dirname, 'website', 'index.html');
const dashboardHtmlPath = path.join(__dirname, 'website', 'dashboard.html');

console.log('Deleting THREAT INTELLIGENCE SUMMARY and risk.score.density...');

function modifyFile(filePath, modifications) {
  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    return;
  }
  let content = fs.readFileSync(filePath, 'utf8');
  const originalContent = content;
  
  for (const mod of modifications) {
    if (mod.regex.test(content)) {
      content = content.replace(mod.regex, () => mod.replacement);
      console.log(`[Success] Replaced regex in ${path.basename(filePath)}`);
    } else {
      console.warn(`[Warn] Regex match failed in ${path.basename(filePath)}`);
    }
  }
  
  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`[Saved] ${path.basename(filePath)}`);
  } else {
    console.log(`[No Change] ${path.basename(filePath)}`);
  }
}

// Modifications for deleting density and threat summary
modifyFile(indexHtmlPath, [
  {
    regex: /<!-- FOURTH COMPONENTS: Risk Score Density \+ Threat Intelligence Summary -->[\s\S]*?<!-- PAGE 2: ANALYTICS/i,
    replacement: `<!-- PAGE 2: ANALYTICS`
  }
]);

modifyFile(dashboardHtmlPath, [
  {
    regex: /<!-- FOURTH, FIFTH, SIXTH COMPONENTS: Class Distribution, Risk Tier, Risk Score Density -->[\s\S]*?<!-- PAGE 2: ANALYTICS/i,
    replacement: `<!-- FOURTH, FIFTH COMPONENTS: Class Distribution, Risk Tier -->
        <div class="row g-4 mb-4">
          <div class="col-12 col-xl-6">
            <div class="cyber-card">
              <h5 class="mb-3 text-white"><span style="color: var(--primary); font-family: var(--font-mono);">//</span> class.distribution</h5>
              <div id="chart-class-dist" style="height: 250px;"></div>
            </div>
          </div>
          <div class="col-12 col-xl-6">
            <div class="cyber-card">
              <h5 class="mb-3 text-white"><span style="color: var(--primary); font-family: var(--font-mono);">//</span> risk.tier.distribution</h5>
              <div id="chart-risk-tier" style="height: 250px;"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- PAGE 2: ANALYTICS`
  }
]);

console.log('Deletion complete.');
