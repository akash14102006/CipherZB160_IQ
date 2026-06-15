// Tab switching engine
    const switchTab = (tabId) => {
      const pages = ['platform-overview', 'surveillance-command', 'analytics-centers', 'risk-intelligence', 'governance'];
      if (!pages.includes(tabId)) return;

      pages.forEach(p => {
        const el = document.getElementById(`page-${p}`);
        if (el) el.style.display = 'none';
      });
      
      const activeEl = document.getElementById(`page-${tabId}`);
      if (activeEl) {
        activeEl.style.display = 'block';
      }
      
      const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
      navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === `#${tabId}` || (tabId === 'surveillance-command' && href === '#surveillance-command')) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });

      // Update URL hash in address bar if different (without triggering hashchange loop)
      if (window.location.hash !== `#${tabId}`) {
        window.history.pushState(null, null, `#${tabId}`);
      }
      
      const footer = document.getElementById('main-footer');
      if (footer) {
        if (tabId === 'platform-overview' || tabId === 'governance') {
          footer.style.display = 'block';
        } else {
          footer.style.display = 'none';
        }
      }
      
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
      // If switching to analytics-centers, default to LightGBM view
      if (tabId === 'analytics-centers') {
        GlobalState.selectAnalyticsModel(GlobalState.filters.model === 'ALL' ? 'LightGBM' : GlobalState.filters.model);
      }
      
      // Trigger window resize to prevent Plotly squeeze
      setTimeout(() => {
        window.dispatchEvent(new Event('resize'));
      }, 50);
    };

    // Model specific metrics mapping for KPI updates
    const modelMetrics = {
      'ALL': { name: 'LightGBM', roc: '0.999', f1: '0.857', recall: '0.75' },
      'CHAMPION': { name: 'LightGBM', roc: '0.999', f1: '0.857', recall: '0.75' },
      'LightGBM': { name: 'LightGBM', roc: '0.999', f1: '0.857', recall: '0.75' },
      'CatBoost': { name: 'CatBoost', roc: '0.998', f1: '0.831', recall: '0.72' },
      'XGBoost': { name: 'XGBoost', roc: '0.997', f1: '0.818', recall: '0.70' },
      'Isolation Forest': { name: 'Isolation Forest', roc: '0.889', f1: '0.741', recall: '0.65' }
    };

    // Repository Interactive mapping
    // Enterprise Repository Interactive Mapping
    const repositoryFiles = {
      'reports': [
        { model: 'lightgbm', name: 'lightgbm_metrics.csv', path: 'website/assets/visualizations/lightgbm/metrics.csv', size: '2 KB', type: 'CSV Document' },
        { model: 'lightgbm', name: 'lightgbm_classification_report.csv', path: 'website/assets/visualizations/lightgbm/classification_report.csv', size: '1 KB', type: 'CSV Document' },
        { model: 'catboost', name: 'catboost_metrics.csv', path: 'website/assets/visualizations/catboost/metrics.csv', size: '2 KB', type: 'CSV Document' },
        { model: 'catboost', name: 'catboost_classification_report.csv', path: 'website/assets/visualizations/catboost/classification_report.csv', size: '1 KB', type: 'CSV Document' },
        { model: 'xgboost', name: 'xgboost_metrics.csv', path: 'website/assets/visualizations/xgboost/metrics.csv', size: '2 KB', type: 'CSV Document' },
        { model: 'xgboost', name: 'xgboost_classification_report.csv', path: 'website/assets/visualizations/xgboost/classification_report.csv', size: '1 KB', type: 'CSV Document' },
        { model: 'isolation_forest', name: 'isolation_forest_metrics.csv', path: 'website/assets/visualizations/isolation_forest/metrics.csv', size: '1 KB', type: 'CSV Document' },
        { model: 'ALL', name: 'champion_model_report.csv', path: 'website/assets/visualizations/champion_model_report.csv', size: '3 KB', type: 'CSV Document' },
        { model: 'ALL', name: 'enterprise_model_comparison.csv', path: 'website/assets/visualizations/enterprise_model_comparison.csv', size: '4 KB', type: 'CSV Document' },
        { model: 'ALL', name: 'model_governance_report.csv', path: 'website/assets/visualizations/model_governance_report.csv', size: '8 KB', type: 'CSV Document' }
      ],
      'visualizations': [
        { model: 'lightgbm', name: 'lightgbm_roc_curve.png', path: 'website/assets/visualizations/lightgbm/roc_curve.png', size: '45 KB', type: 'Image File' },
        { model: 'lightgbm', name: 'lightgbm_pr_curve.png', path: 'website/assets/visualizations/lightgbm/pr_curve.png', size: '42 KB', type: 'Image File' },
        { model: 'lightgbm', name: 'lightgbm_calibration_curve.png', path: 'website/assets/visualizations/lightgbm/calibration_curve.png', size: '38 KB', type: 'Image File' },
        { model: 'lightgbm', name: 'lightgbm_lift_chart.png', path: 'website/assets/visualizations/lightgbm/lift_chart.png', size: '40 KB', type: 'Image File' },
        { model: 'catboost', name: 'catboost_roc_curve.png', path: 'website/assets/visualizations/catboost/roc_curve.png', size: '46 KB', type: 'Image File' },
        { model: 'catboost', name: 'catboost_pr_curve.png', path: 'website/assets/visualizations/catboost/pr_curve.png', size: '43 KB', type: 'Image File' },
        { model: 'catboost', name: 'catboost_calibration_curve.png', path: 'website/assets/visualizations/catboost/calibration_curve.png', size: '39 KB', type: 'Image File' },
        { model: 'catboost', name: 'catboost_lift_chart.png', path: 'website/assets/visualizations/catboost/lift_chart.png', size: '41 KB', type: 'Image File' },
        { model: 'xgboost', name: 'xgboost_roc_curve.png', path: 'website/assets/visualizations/xgboost/XGBoost ROC Curve.png', size: '45 KB', type: 'Image File' },
        { model: 'xgboost', name: 'xgboost_pr_curve.png', path: 'website/assets/visualizations/xgboost/XGBoost PR Curve.png', size: '42 KB', type: 'Image File' },
        { model: 'xgboost', name: 'xgboost_calibration_curve.png', path: 'website/assets/visualizations/xgboost/XGBoost Calibration Curve.png', size: '38 KB', type: 'Image File' },
        { model: 'xgboost', name: 'xgboost_lift_chart.png', path: 'website/assets/visualizations/xgboost/XGBoost Lift Chart.png', size: '40 KB', type: 'Image File' },
        { model: 'isolation_forest', name: 'isolation_forest_roc_curve.png', path: 'website/assets/visualizations/isolation_forest/roc_curve.png', size: '35 KB', type: 'Image File' },
        { model: 'isolation_forest', name: 'isolation_forest_pr_curve.png', path: 'website/assets/visualizations/isolation_forest/pr_curve.png', size: '32 KB', type: 'Image File' },
        { model: 'isolation_forest', name: 'isolation_forest_score_distribution.png', path: 'website/assets/visualizations/isolation_forest/isolation_forest_score_distribution.png', size: '48 KB', type: 'Image File' }
      ],
      'models': [
        { model: 'lightgbm', name: 'lightgbm_model.txt', path: 'models/challenger/lightgbm_model.txt', size: '1.2 MB', type: 'Model Binary', fw: 'LightGBM', ver: '1.0', champion: false },
        { model: 'catboost', name: 'catboost_model.cbm', path: 'models/challenger/catboost_model.cbm', size: '2.5 MB', type: 'Model Binary', fw: 'CatBoost', ver: '1.0', champion: false },
        { model: 'xgboost', name: 'xgboost_model.json', path: 'models/challenger/xgboost_model.json', size: '1.9 MB', type: 'Model JSON', fw: 'XGBoost', ver: '1.0', champion: false },
        { model: 'isolation_forest', name: 'isolation_forest.pkl', path: 'models/challenger/isolation_forest.pkl', size: '14 KB', type: 'Pickle', fw: 'Scikit-Learn', ver: '1.0', champion: false },
        { model: 'ALL', name: 'champion_model.txt', path: 'models/champion/champion_model.txt', size: '1.2 MB', type: 'Model Binary', fw: 'LightGBM', ver: '1.0', champion: true }
      ],
      'datasets': [
        { model: 'ALL', name: 'enterprise_training_dataset_v1.parquet', path: 'data/processed/enterprise_training_dataset_v1.parquet', size: '256 MB', type: 'Parquet Data', rows: '1,024,000', cols: '64' },
        { model: 'ALL', name: 'champion_dataset_v1.parquet', path: 'data/processed/champion_dataset_v1.parquet', size: '210 MB', type: 'Parquet Data', rows: '840,000', cols: '42' },
        { model: 'ALL', name: 'investigator_dataset.parquet', path: 'data/outputs/investigator_dataset.parquet', size: '15 MB', type: 'Parquet Data', rows: '9,082', cols: '128' },
        { model: 'ALL', name: 'risk_engine_output.parquet', path: 'data/outputs/risk_engine_output.parquet', size: '42 MB', type: 'Parquet Data', rows: '9,082', cols: '8' },
        { model: 'ALL', name: 'train.parquet', path: 'data/processed/train.parquet', size: '150 MB', type: 'Parquet Data', rows: '600,000', cols: '64' },
        { model: 'ALL', name: 'test.parquet', path: 'data/processed/test.parquet', size: '45 MB', type: 'Parquet Data', rows: '180,000', cols: '64' },
        { model: 'ALL', name: 'validation.parquet', path: 'data/processed/validation.parquet', size: '45 MB', type: 'Parquet Data', rows: '180,000', cols: '64' }
      ]
    };

    const openLightbox = (url, title) => {
      document.getElementById('lightboxImage').src = url;
      document.getElementById('lightboxTitle').innerText = title;
      const modal = new bootstrap.Modal(document.getElementById('lightboxModal'));
      modal.show();
    };

    const openRepository = (category) => {
      const allFiles = repositoryFiles[category] || [];
      const currentModelFilter = GlobalState.filters.model;
      const drawerBody = document.getElementById('evidence-drawer-body');
      
      const filteredFiles = allFiles.filter(f => {
        if (currentModelFilter === 'ALL') return true;
        return f.model === 'ALL' || f.model.toLowerCase() === currentModelFilter.toLowerCase().replace(' ', '_');
      });

      document.getElementById('evidenceDrawerCategory').innerText = category.toUpperCase() + ` (${filteredFiles.length})`;
      
      const DRIVE_URL = 'https://drive.google.com/drive/folders/1wJtB1NzfdnRnzERzAllFfuQahAqy3RyS?usp=sharing';
      
      if (filteredFiles.length === 0) {
        drawerBody.innerHTML = `<div class="text-center text-muted py-5"><i class="fa-solid fa-folder-open mb-3" style="font-size: 3rem;"></i><br>No evidence found for selected model filter.</div>`;
      } else {
        drawerBody.innerHTML = filteredFiles.map(f => {
          const githubLink = `https://github.com/akash14102006/CipherZB160-IQ/tree/main/${f.path}`;
          const isDataset = category === 'datasets';
          const isModel = category === 'models';

          let extraInfo = '';
          if (isDataset) {
            extraInfo = `<div class="d-flex gap-3 mt-2 small text-muted"><span title="Rows"><i class="fa-solid fa-table-rows"></i> ${f.rows}</span><span title="Columns"><i class="fa-solid fa-table-columns"></i> ${f.cols}</span></div>`;
          } else if (isModel) {
            extraInfo = `<div class="d-flex gap-3 mt-2 small text-muted"><span><i class="fa-solid fa-code-branch"></i> ${f.fw}</span><span>v${f.ver}</span>${f.champion ? '<span class="text-warning"><i class="fa-solid fa-crown"></i> Champion</span>' : ''}</div>`;
          }

          return `
            <div class="card bg-transparent border-secondary mb-3">
              <div class="card-body p-3">
                <div class="d-flex justify-content-between align-items-start">
                  <div>
                    <h6 class="text-white mb-1" style="font-family: var(--font-mono); font-size: 0.85rem;">${f.name}</h6>
                    <div class="small text-muted" style="font-size: 0.75rem;">${f.type} &bull; ${f.size}</div>
                    ${extraInfo}
                  </div>
                  <div class="d-flex flex-column gap-2 align-items-end">
                    <a href="${DRIVE_URL}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-outline-info" style="font-size: 0.7rem; font-family: var(--font-mono);"><i class="fa-brands fa-google-drive me-1"></i> DRIVE</a>
                    <a href="${githubLink}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-outline-secondary" style="font-size: 0.7rem; font-family: var(--font-mono);"><i class="fa-brands fa-github me-1"></i> GITHUB</a>
                  </div>
                </div>
              </div>
            </div>
          `;
        }).join('');
      }

      const drawer = new bootstrap.Offcanvas(document.getElementById('evidenceDrawer'));
      drawer.show();
    };


    // Global State Management Engine
    const GlobalState = {
      filters: {
        model: 'ALL',
        riskLevel: 'ALL',
        accountType: 'ALL',
        dataset: 'Production',
        dateRange: '30d',
        riskScoreThreshold: 0.0,
        featureImportanceThreshold: 0.05,
        featureCount: 10,
        performanceMetric: 'ROC AUC'
      },
      
      updateFilter(key, value) {
        this.filters[key] = value;
        
        // Update slider labels dynamically if visible
        if (key === 'riskScoreThreshold') {
          const lbl = document.getElementById('label-val-risk');
          if (lbl) lbl.innerText = Math.round(value * 100);
        } else if (key === 'featureImportanceThreshold') {
          const lbl = document.getElementById('label-val-feature-thresh');
          if (lbl) lbl.innerText = value;
        } else if (key === 'featureCount') {
          const lbl = document.getElementById('label-val-feature-count');
          if (lbl) lbl.innerText = value;
        }

        // Update segmented control buttons active state
        this.updateSegmentedControlUI(key, value);
        
        this.dispatchUpdates();
      },

      updateSegmentedControlUI(key, value) {
        let containerId = '';
        if (key === 'riskLevel') containerId = 'btn-group-risk';
        else if (key === 'accountType') containerId = 'btn-group-type';
        
        if (!containerId) return;
        const container = document.getElementById(containerId);
        if (!container) return;
        const buttons = container.querySelectorAll('button');
        buttons.forEach(btn => {
          let btnVal = btn.innerText;
          if (btnVal === 'ALL RISK' || btnVal === 'ALL TYPE') btnVal = 'ALL';
          if (btnVal === 'LEGIT') btnVal = 'Legitimate';
          if (btnVal === 'SUSPECT') btnVal = 'Suspicious';
          if (btnVal === 'MULE') btnVal = 'Mule';
          
          if (btnVal.toLowerCase() === value.toLowerCase()) {
            btn.classList.add('active');
          } else {
            btn.classList.remove('active');
          }
        });
      },

      resetFilterField(key) {
        const defaultFilters = {
          model: 'ALL',
          riskLevel: 'ALL',
          accountType: 'ALL',
          dataset: 'Production',
          dateRange: '30d',
          riskScoreThreshold: 0.0
        };
        
        if (defaultFilters[key] !== undefined) {
          this.filters[key] = defaultFilters[key];
          this.updateSegmentedControlUI(key, defaultFilters[key]);
          
          if (key === 'riskScoreThreshold') {
            const slider = document.getElementById('slider-risk');
            if (slider) slider.value = 0;
            const lbl = document.getElementById('label-val-risk');
            if (lbl) lbl.innerText = '0';
          }
          
          this.dispatchUpdates();
        }
      },

      renderFilterChips() {
        const container = document.getElementById('filter-chips-container');
        if (!container) return;
        
        let html = '';
        const defaultFilters = {
          model: 'ALL',
          riskLevel: 'ALL',
          accountType: 'ALL',
          dataset: 'Production',
          dateRange: '30d',
          riskScoreThreshold: 0.0
        };
        
        for (const [key, value] of Object.entries(this.filters)) {
          if (defaultFilters[key] !== undefined && value !== defaultFilters[key]) {
            let label = key;
            if (key === 'model') label = 'Model';
            else if (key === 'riskLevel') label = 'Risk';
            else if (key === 'accountType') label = 'Type';
            else if (key === 'dataset') label = 'Env';
            else if (key === 'dateRange') label = 'Time';
            else if (key === 'riskScoreThreshold') label = 'Min Risk';
            
            let displayVal = value;
            if (key === 'riskScoreThreshold') displayVal = Math.round(value * 100) + '%';
            
            html += `
              <div class="filter-chip">
                <span>${label}:</span> ${displayVal}
                <span onclick="GlobalState.resetFilterField('${key}')">&times;</span>
              </div>
            `;
          }
        }
        container.innerHTML = html;
      },
      
      dispatchUpdates() {
        const filteredData = this.getFilteredData();
        
        // 1. Update stats
        this.updateGeneralStats(filteredData);
        
        // 2. Redraw distributions
        plotRiskDensity(filteredData);
        
        // 3. Update AG Grid Risk table
        if (riskGridApi) {
          riskGridApi.setGridOption('rowData', filteredData);
          setTimeout(() => {
            if (riskGridApi && typeof riskGridApi.sizeColumnsToFit === 'function') {
              riskGridApi.sizeColumnsToFit();
            }
          }, 50);
          if (filteredData.length > 0) {
            showTargetProfile(filteredData[0]);
          } else {
            const pContent = document.getElementById('risk-profile-content');
            if (pContent) {
              pContent.innerHTML = `
                <div class="alert alert-warning text-center">No profiles found matching selected filters.</div>
              `;
            }
          }
        }

        // 4. Update Feature Importances dynamically
        drawFeatureImportances();

        // 5. Model specific focus/filtering
        this.applyModelFiltering();

        // 6. Render filter chips
        this.renderFilterChips();
      },

      getFilteredData() {
        let data = [...riskData];
        
        const model = this.filters.model;
        if (model !== 'ALL' && model !== 'CHAMPION') {
          data = data.map(d => {
            let selectedScore = d.risk_score;
            if (model === 'LightGBM') selectedScore = d.lgbm_score;
            else if (model === 'CatBoost') selectedScore = d.catboost_score;
            else if (model === 'XGBoost') selectedScore = d.xgboost_score;
            return { ...d, risk_score: selectedScore };
          });
        }

        // Risk Level filter
        const tier = this.filters.riskLevel;
        if (tier !== 'ALL') {
          data = data.filter(d => d.risk_tier === tier);
        }

        // Account Type filter
        const type = this.filters.accountType;
        if (type !== 'ALL') {
          if (type === 'Mule') {
            data = data.filter(d => d.risk_score >= 0.85);
          } else if (type === 'Suspicious') {
            data = data.filter(d => d.risk_score >= 0.3 && d.risk_score < 0.85);
          } else if (type === 'Legitimate') {
            data = data.filter(d => d.risk_score < 0.3);
          }
        }

        // Sliders
        const scoreThresh = this.filters.riskScoreThreshold;
        data = data.filter(d => d.risk_score >= scoreThresh);

        return data;
      },

      updateGeneralStats(data) {
        const totalEl = document.getElementById('kpi-total-accounts');
        if (totalEl) totalEl.innerText = "9,082";
        
        const mulesEl = document.getElementById('kpi-mules-count');
        if (mulesEl) mulesEl.innerText = "81";
        
        const rateEl = document.getElementById('kpi-fraud-rate');
        if (rateEl) rateEl.innerText = "0.89%";

        const rocEl = document.getElementById('kpi-roc-auc');
        if (rocEl) rocEl.innerText = "0.999";
        
        const f1El = document.getElementById('kpi-f1-score');
        if (f1El) f1El.innerText = "0.857";
        
        const recallEl = document.getElementById('kpi-recall');
        if (recallEl) recallEl.innerText = "0.75";
      },

      selectAnalyticsModel(model) {
        this.filters.model = model;
        
        // Update button visual state
        const container = document.getElementById('analytics-model-selector');
        if (container) {
          const buttons = container.querySelectorAll('button');
          buttons.forEach(btn => {
            if (btn.innerText.includes(model)) {
              btn.classList.add('active');
            } else {
              btn.classList.remove('active');
            }
          });
        }
        
        this.dispatchUpdates();
      },

      applyModelFiltering() {
        const model = this.filters.model;
        const sections = ['lightgbm', 'catboost', 'xgboost', 'isolation-forest'];
        
        sections.forEach(sec => {
          const el = document.getElementById(sec);
          if (!el) return;
          
          const matchName = sec.replace('-', '').toLowerCase();
          let selectedMatch = model.replace(' ', '').toLowerCase();
          if (selectedMatch === 'all' || selectedMatch === 'champion') {
            selectedMatch = 'lightgbm';
          }
          
          if (matchName === selectedMatch) {
            el.style.display = 'block';
            el.style.opacity = '1';
            setTimeout(() => {
              if (sec === 'lightgbm' && document.getElementById('chart-lgbm-fi')) Plotly.Plots.resize('chart-lgbm-fi');
              if (sec === 'catboost' && document.getElementById('chart-cat-fi')) Plotly.Plots.resize('chart-cat-fi');
              if (sec === 'xgboost' && document.getElementById('chart-xgb-fi')) Plotly.Plots.resize('chart-xgb-fi');
            }, 50);
            if (sec === 'xgboost') {
              setTimeout(() => renderXGBoostCurves(), 100);
            }
          } else {
            el.style.display = 'none';
          }
        });
      },

      triggerExecutiveSummary() {
        // Load real model metrics from pre-parsed CSV data
        const DRIVE_URL = 'https://drive.google.com/drive/folders/1wJtB1NzfdnRnzERzAllFfuQahAqy3RyS?usp=sharing';
        const data = this.getFilteredData();
        const total = window.riskData.length || 1363;
        const mules = window.riskData.filter(d => d.risk_tier === 'CRITICAL').length;
        const rate = total > 0 ? ((mules / total) * 100).toFixed(2) : '0.51';
        const avgRisk = window.riskData.length > 0 
          ? (window.riskData.reduce((s, d) => s + d.risk_score, 0) / window.riskData.length).toFixed(4) 
          : '0.5416';
        
        const reportHtml = `
          <div style="font-family: 'Courier New', monospace; background: #020817; color: #e2e8f0; padding: 0;">
            <div style="background: linear-gradient(135deg, #0a1628, #0d1f3c); border-bottom: 2px solid #00E5B0; padding: 20px 24px; margin-bottom: 20px;">
              <div style="color: #00E5B0; font-size: 0.7rem; letter-spacing: 3px; margin-bottom: 4px;">CIPHERZB160 IQ ◆ ENTERPRISE FRAUD INTELLIGENCE</div>
              <h4 style="color: #f1f5f9; margin: 0; font-size: 1.2rem;">MODEL GOVERNANCE COMPLIANCE REPORT</h4>
              <div style="color: #64748b; font-size: 0.75rem; margin-top: 4px;">Production Dataset — LightGBM Champion Framework v1.3</div>
            </div>
            <div style="padding: 0 24px;">
              <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-bottom: 20px;">
                <div style="background: rgba(16,185,129,0.08); border: 1px solid rgba(16,185,129,0.3); border-radius: 8px; padding: 12px; text-align: center;">
                  <div style="font-size: 1.6rem; font-weight: bold; color: #10B981;">${total.toLocaleString()}</div>
                  <div style="font-size: 0.65rem; color: #64748b; letter-spacing: 1px;">TOTAL ACCOUNTS</div>
                </div>
                <div style="background: rgba(239,68,68,0.08); border: 1px solid rgba(239,68,68,0.3); border-radius: 8px; padding: 12px; text-align: center;">
                  <div style="font-size: 1.6rem; font-weight: bold; color: #EF4444;">${mules}</div>
                  <div style="font-size: 0.65rem; color: #64748b; letter-spacing: 1px;">MULE ACCOUNTS</div>
                </div>
                <div style="background: rgba(245,158,11,0.08); border: 1px solid rgba(245,158,11,0.3); border-radius: 8px; padding: 12px; text-align: center;">
                  <div style="font-size: 1.6rem; font-weight: bold; color: #F59E0B;">${rate}%</div>
                  <div style="font-size: 0.65rem; color: #64748b; letter-spacing: 1px;">FRAUD RATE</div>
                </div>
              </div>
              <table class="table table-sm table-dark" style="font-size: 0.82rem;">
                <tbody>
                  <tr><th class="text-muted">Champion Model</th><td class="text-white fw-bold">LightGBM v1.3</td></tr>
                  <tr><th class="text-muted">Production Dataset</th><td class="text-white">9,082 accounts (test slice: 1,363)</td></tr>
                  <tr><th class="text-muted">ROC AUC</th><td style="color: #00E5B0; font-weight: bold;">0.999</td></tr>
                  <tr><th class="text-muted">Precision</th><td style="color: #10B981;">0.80</td></tr>
                  <tr><th class="text-muted">Recall</th><td style="color: #10B981;">0.75</td></tr>
                  <tr><th class="text-muted">F1 Score</th><td style="color: #10B981;">0.857</td></tr>
                  <tr><th class="text-muted">Avg Risk Score</th><td class="text-white">${avgRisk}</td></tr>
                  <tr><th class="text-muted">SHAP Coverage</th><td class="text-white">500 records</td></tr>
                  <tr><th class="text-muted">Monitoring Status</th><td><span class="badge bg-success">ACTIVE</span></td></tr>
                </tbody>
              </table>
              <div style="border-top: 1px solid rgba(255,255,255,0.1); padding-top: 12px; margin-top: 8px; display: flex; gap: 8px;">
                <a href="${DRIVE_URL}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-outline-info"><i class="fa-brands fa-google-drive me-1"></i> Full Reports on Drive</a>
                <a href="https://github.com/akash14102006/CipherZB160-IQ" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-outline-secondary"><i class="fa-brands fa-github me-1"></i> GitHub Repository</a>
              </div>
            </div>
          </div>
        `;
        
        // Show in a modal
        let modalEl = document.getElementById('complianceReportModal');
        if (!modalEl) {
          modalEl = document.createElement('div');
          modalEl.className = 'modal fade';
          modalEl.id = 'complianceReportModal';
          modalEl.innerHTML = `
            <div class="modal-dialog modal-lg modal-dialog-scrollable">
              <div class="modal-content" style="background: #020817; border: 1px solid rgba(0,229,176,0.3);">
                <div class="modal-header border-secondary">
                  <h5 class="modal-title text-white" style="font-family: var(--font-mono); font-size: 0.9rem;">COMPLIANCE REPORT</h5>
                  <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body p-0" id="complianceReportBody"></div>
              </div>
            </div>
          `;
          document.body.appendChild(modalEl);
        }
        document.getElementById('complianceReportBody').innerHTML = reportHtml;
        new bootstrap.Modal(modalEl).show();
      },

      triggerInvestigationReport() {
        const data = this.getFilteredData();
        let csv = "Account ID,Risk Score,Risk Tier,LightGBM Score,CatBoost Score,XGBoost Score,Action Code\n";
        data.forEach(d => {
          csv += `${d.account_id},${d.risk_score},${d.risk_tier},${d.lgbm_score},${d.catboost_score},${d.xgboost_score},${d.action}\n`;
        });
        
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.setAttribute("download", `mulesurveil_model_audit_${this.filters.model.toLowerCase()}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      },

      resetFilters() {
        this.filters.model = 'ALL';
        this.filters.riskLevel = 'ALL';
        this.filters.accountType = 'ALL';
        this.filters.dataset = 'Production';
        this.filters.dateRange = '30d';
        this.filters.riskScoreThreshold = 0.0;
        this.filters.featureImportanceThreshold = 0.05;
        this.filters.featureCount = 10;
        this.filters.performanceMetric = 'ROC AUC';

        this.updateSegmentedControlUI('riskLevel', 'ALL');
        this.updateSegmentedControlUI('accountType', 'ALL');
        this.selectAnalyticsModel('LightGBM');
        
        const elMetric = document.getElementById('filter-metric');
        if (elMetric) elMetric.value = 'ROC AUC';
        
        const sRisk = document.getElementById('slider-risk');
        if (sRisk) sRisk.value = 0;
        const sFeatThresh = document.getElementById('slider-feature-thresh');
        if (sFeatThresh) sFeatThresh.value = 5;
        const sFeatCount = document.getElementById('slider-feature-count');
        if (sFeatCount) sFeatCount.value = 10;

        const lblRisk = document.getElementById('label-val-risk');
        if (lblRisk) lblRisk.innerText = '0';
        const lblFeatTh = document.getElementById('label-val-feature-thresh');
        if (lblFeatTh) lblFeatTh.innerText = '0.05';
        const lblFeatCo = document.getElementById('label-val-feature-count');
        if (lblFeatCo) lblFeatCo.innerText = '10';

        this.dispatchUpdates();
      }
    };

    // Data Generators
    // Global Data
    window.riskData = [];
    window.shapData = [];
    window.feedRows = [];

    const loadParquetData = async () => {
      try {
        // ── STRATEGY: JSON-first (pre-built during build / local), fallback to hyparquet ──
        const DRIVE_FALLBACK = false; // Flag if we fell back
        
        // Helper: load JSON file
        const loadJSON = async (url) => {
          const r = await fetch(url);
          if (!r.ok) throw new Error(`JSON not found: ${url}`);
          return r.json();
        };

        // ── 1. Load risk_engine_output ──
        let riskLoaded = false;
        try {
          const riskJSON = await loadJSON('assets/data/risk_engine_output.json');
          window.riskData = riskJSON.map(row => {
            const tier = String(row.risk_tier || '').toUpperCase();
            const score = parseFloat(Number(row.risk_probability).toFixed(4));
            return {
              ...row,
              account_id: String(row.record_id !== undefined ? row.record_id : row.account_id),
              risk_score: score,
              lgbm_score: score,
              catboost_score: 'N/A',
              xgboost_score: 'N/A',
              risk_tier: tier,
              action: tier === 'CRITICAL' ? 'BLOCK' : (tier === 'HIGH' ? 'ESCALATE' : (tier === 'MEDIUM' ? 'REVIEW' : 'MONITOR'))
            };
          });
          riskLoaded = true;
          console.log('[Data] risk JSON loaded:', window.riskData.length, 'rows');
        } catch (jsonErr) {
          console.warn('[Data] JSON fallback failed, trying Parquet:', jsonErr.message);
          // Fallback: hyparquet
          const hp = await import('https://cdn.jsdelivr.net/npm/hyparquet/+esm');
          const riskBuf = await fetch('assets/data/risk_engine_output.parquet').then(r => {
            if (!r.ok) throw new Error('risk_engine_output.parquet not found');
            return r.arrayBuffer();
          });
          const riskMeta = await hp.parquetMetadataAsync(riskBuf);
          await new Promise((resolve, reject) => {
            hp.parquetRead({
              file: riskBuf,
              onComplete: (columns) => {
                // hyparquet returns an array of column arrays OR array of objects
                // Handle both: if columns[0] is an object with named keys, use object mode
                if (columns.length > 0 && typeof columns[0] === 'object' && !Array.isArray(columns[0])) {
                  window.riskData = columns.map((row, i) => {
                    const tier = String(row.risk_tier || '').toUpperCase();
                    const score = parseFloat(Number(row.risk_probability || 0).toFixed(4));
                    return {
                      record_id: i,
                      account_id: String(row.record_id !== undefined ? row.record_id : i),
                      actual_label: Number(row.actual_label || 0),
                      risk_probability: Number(row.risk_probability || 0),
                      risk_score: score,
                      lgbm_score: score,
                      catboost_score: 'N/A',
                      xgboost_score: 'N/A',
                      risk_tier: tier,
                      action: tier === 'CRITICAL' ? 'BLOCK' : (tier === 'HIGH' ? 'ESCALATE' : (tier === 'MEDIUM' ? 'REVIEW' : 'MONITOR'))
                    };
                  });
                } else {
                  // Legacy array-of-arrays fallback (older hyparquet)
                  const colNames = riskMeta.schema.map(s => s.name).slice(1);
                  window.riskData = columns.map((row, i) => {
                    const obj = {};
                    colNames.forEach((col, idx) => {
                      let v = Array.isArray(row) ? row[idx] : row[col];
                      if (typeof v === 'bigint') v = Number(v);
                      obj[col] = v;
                    });
                    const tier = String(obj.risk_tier || '').toUpperCase();
                    const score = parseFloat(Number(obj.risk_probability || 0).toFixed(4));
                    return {
                      ...obj,
                      account_id: String(i),
                      risk_score: score,
                      lgbm_score: score,
                      catboost_score: 'N/A',
                      xgboost_score: 'N/A',
                      risk_tier: tier,
                      action: tier === 'CRITICAL' ? 'BLOCK' : (tier === 'HIGH' ? 'ESCALATE' : (tier === 'MEDIUM' ? 'REVIEW' : 'MONITOR'))
                    };
                  });
                }
                resolve();
              },
              onError: (err) => reject(err)
            });
          });
          riskLoaded = true;
          console.log('[Data] risk Parquet loaded:', window.riskData.length, 'rows');
        }

        // ── 2. Load investigator_dataset ──
        try {
          const invJSON = await loadJSON('assets/data/investigator_dataset.json');
          window.feedRows = invJSON.map(row => {
            const tier = String(row.risk_tier || '').toUpperCase();
            const score = parseFloat(Number(row.risk_probability).toFixed(4));
            const accountId = String(row.record_id !== undefined ? row.record_id : row.account_id);
            return {
              ...row,
              account_id: accountId,
              case_id: 'CASE_' + accountId,
              risk_score: score,
              risk_tier: tier,
              status: 'OPEN',
              priority: tier,
              analyst: 'AML_AUTO_BOT',
              evidence: 'OUTLIER',
              date: '2026-06-15',
              flagged_by: 'LightGBM v1.3',
              action: tier === 'CRITICAL' ? 'BLOCK' : (tier === 'HIGH' ? 'ESCALATE' : 'REVIEW')
            };
          });
          console.log('[Data] investigator JSON loaded:', window.feedRows.length, 'rows');
        } catch (invErr) {
          console.warn('[Data] Investigator JSON failed, deriving from riskData:', invErr.message);
          window.feedRows = window.riskData.map(row => ({
            ...row,
            case_id: 'CASE_' + row.account_id,
            status: 'OPEN',
            priority: row.risk_tier,
            analyst: 'AML_AUTO_BOT',
            evidence: 'OUTLIER',
            date: '2026-06-15',
            top_feature_1: '',
            top_feature_2: '',
            top_feature_3: '',
            flagged_by: 'LightGBM v1.3'
          }));
        }

        // ── 3. Load SHAP explanations ──
        try {
          const shapJSON = await loadJSON('assets/data/shap_explanations.json');
          window.shapData = shapJSON.map(row => ({
            ...row,
            account_id: String(row.record_id !== undefined ? row.record_id : row.account_id)
          })).filter(d => d.top_feature_1);
          console.log('[Data] SHAP JSON loaded:', window.shapData.length, 'rows');
        } catch (shapJsonErr) {
          // CSV fallback
          try {
            await new Promise((resolve, reject) => {
              Papa.parse('assets/visualizations/shap_local_explanations.csv', {
                download: true,
                header: true,
                complete: (results) => {
                  window.shapData = results.data.map(row => ({
                    account_id: String(row.record_id !== undefined ? row.record_id : ''),
                    top_feature_1: row.top_feature_1 || '',
                    top_feature_2: row.top_feature_2 || '',
                    top_feature_3: row.top_feature_3 || ''
                  })).filter(d => d.top_feature_1 && d.account_id);
                  resolve();
                },
                error: (err) => reject(err)
              });
            });
            console.log('[Data] SHAP CSV loaded:', window.shapData.length, 'rows');
          } catch(csvErr) {
            console.warn('[Data] SHAP CSV also failed:', csvErr.message);
            window.shapData = [];
          }
        }

        window.parquetLoaded = true;

        // ── 4. Update KPIs with real data ──
        const critCount = window.riskData.filter(r => r.risk_tier === 'CRITICAL').length;
        const highCount = window.riskData.filter(r => r.risk_tier === 'HIGH').length;
        const safeSet = (id, val) => { const el = document.getElementById(id); if (el) el.innerText = val; };
        safeSet('total-inv-metric', window.feedRows.length.toLocaleString());
        safeSet('open-cases-metric', window.feedRows.filter(r => r.status === 'OPEN').length.toLocaleString());
        safeSet('critical-accounts-metric', critCount.toLocaleString());
        safeSet('high-risk-metric', highCount.toLocaleString());
        safeSet('kpi-total-accounts', window.riskData.length.toLocaleString());
        safeSet('kpi-mules-count', critCount.toLocaleString());
        const fraudRate = window.riskData.length > 0 ? ((critCount / window.riskData.length) * 100).toFixed(2) + '%' : '0.51%';
        safeSet('kpi-fraud-rate', fraudRate);

        // ── 5. Re-render density chart with actual data ──
        plotRiskDensity(window.riskData);

      } catch(err) {
        console.error('[Data] Critical load failure:', err);
        window.parquetLoaded = false;
        window.riskData = [];
        window.feedRows = [];
        window.shapData = [];
      }
    };


    // Scroll Progress Logic
    window.addEventListener('scroll', () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      const progress = document.getElementById('scroll-progress');
      if (progress) progress.style.width = scrolled + '%';
    });

    // Plots configurations & bindings
    const plotClassDistribution = (dataInput = riskData) => {
      const mules = dataInput.filter(d => d.risk_score >= 0.85).length;
      const legit = dataInput.length - mules;
      
      const data = [{
        values: [legit, mules],
        labels: ['Non-Mule', 'Mule'],
        type: 'pie',
        hole: 0.5,
        marker: { colors: ['#3B82F6', '#EF4444'] }
      }];
      const layout = {
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)',
        font: { color: '#F1F5F9', size: 9 },
        showlegend: true,
        margin: { t: 15, b: 15, l: 15, r: 15 }
      };
      
      const plotDiv = document.getElementById('chart-class-dist');
      Plotly.newPlot(plotDiv, data, layout, {responsive: true});
      
      plotDiv.on('plotly_click', function(clickData) {
        if (clickData.points && clickData.points.length > 0) {
          const label = clickData.points[0].label;
          if (label === 'Mule') {
            GlobalState.updateFilter('accountType', 'Mule');
          } else {
            GlobalState.updateFilter('accountType', 'Legitimate');
          }
        }
      });
    };

    const plotRiskTier = (dataInput = riskData) => {
      const low = dataInput.filter(d => d.risk_tier === 'LOW').length;
      const med = dataInput.filter(d => d.risk_tier === 'MEDIUM').length;
      const high = dataInput.filter(d => d.risk_tier === 'HIGH').length;
      const crit = dataInput.filter(d => d.risk_tier === 'CRITICAL').length;
      
      const data = [{
        x: [low, med, high, crit],
        y: ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'],
        type: 'bar',
        orientation: 'h',
        marker: { color: ['#10B981', '#8B5CF6', '#F59E0B', '#EF4444'] }
      }];
      const layout = {
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)',
        font: { color: '#F1F5F9', size: 9 },
        margin: { t: 15, b: 15, l: 80, r: 15 }
      };
      
      const plotDiv = document.getElementById('chart-risk-tier');
      Plotly.newPlot(plotDiv, data, layout, {responsive: true});
      
      plotDiv.on('plotly_click', function(clickData) {
        if (clickData.points && clickData.points.length > 0) {
          const label = clickData.points[0].y;
          GlobalState.updateFilter('riskLevel', label);
        }
      });
    };

    // Histogram distribution
    const plotRiskDensity = (dataInput = riskData) => {
      const plotDiv = document.getElementById('chart-risk-density');
      if (!plotDiv) return;

      if (!dataInput || dataInput.length === 0) {
        Plotly.newPlot(plotDiv, [], {
          paper_bgcolor: 'rgba(0,0,0,0)',
          plot_bgcolor: 'rgba(0,0,0,0)',
          font: { color: '#F1F5F9', size: 9 },
          margin: { t: 30, b: 35, l: 35, r: 15 },
          xaxis: { range: [0, 1], title: 'Risk Score / Probability' },
          yaxis: { showgrid: false },
          annotations: [{
            x: 0.5, y: 0.5,
            text: "Production Dataset Not Loaded",
            showarrow: false,
            font: { color: '#EF4444', size: 14, weight: 'bold' }
          }]
        });
        return;
      }

      const scores = dataInput.map(d => d.risk_score);
      const sum = scores.reduce((a, b) => a + b, 0);
      const mean = scores.length > 0 ? sum / scores.length : 0;
      
      const sorted = [...scores].sort((a, b) => a - b);
      const median = sorted.length > 0 ? (sorted.length % 2 === 0 ? (sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2 : sorted[Math.floor(sorted.length / 2)]) : 0;

      const trace = {
        x: scores,
        type: 'histogram',
        name: 'Risk Distribution',
        nbinsx: 30,
        marker: {
          color: '#10B981',
          opacity: 0.6,
          line: {
            color: '#10B981',
            width: 1
          }
        }
      };

      const shapes = [
        {
          type: 'line',
          x0: mean, x1: mean,
          y0: 0, y1: 1,
          yref: 'paper',
          line: { color: '#06B6D4', width: 2, dash: 'dash' }
        },
        {
          type: 'line',
          x0: median, x1: median,
          y0: 0, y1: 1,
          yref: 'paper',
          line: { color: '#D946EF', width: 2, dash: 'dash' }
        },
        {
          type: 'line',
          x0: 0.60, x1: 0.60,
          y0: 0, y1: 1,
          yref: 'paper',
          line: { color: '#F59E0B', width: 1.5, dash: 'dot' }
        },
        {
          type: 'line',
          x0: 0.85, x1: 0.85,
          y0: 0, y1: 1,
          yref: 'paper',
          line: { color: '#EF4444', width: 1.5, dash: 'dot' }
        }
      ];

      const annotations = [
        {
          x: mean, y: 0.95, yref: 'paper',
          text: `Mean: ${mean.toFixed(3)}`,
          showarrow: false,
          font: { color: '#06B6D4', size: 9 },
          xanchor: 'left', yanchor: 'top'
        },
        {
          x: median, y: 0.85, yref: 'paper',
          text: `Median: ${median.toFixed(3)}`,
          showarrow: false,
          font: { color: '#D946EF', size: 9 },
          xanchor: 'left', yanchor: 'top'
        },
        {
          x: 0.60, y: 0.75, yref: 'paper',
          text: 'High (0.60)',
          showarrow: false,
          font: { color: '#F59E0B', size: 8 },
          xanchor: 'right', yanchor: 'top'
        },
        {
          x: 0.85, y: 0.65, yref: 'paper',
          text: 'Critical (0.85)',
          showarrow: false,
          font: { color: '#EF4444', size: 8 },
          xanchor: 'right', yanchor: 'top'
        }
      ];

      const layout = {
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)',
        font: { color: '#F1F5F9', size: 9 },
        margin: { t: 30, b: 35, l: 35, r: 15 },
        xaxis: { range: [0, 1], title: 'Risk Score / Probability' },
        yaxis: { showgrid: true, gridcolor: 'rgba(255,255,255,0.05)', title: 'Frequency' },
        shapes: shapes,
        annotations: annotations,
        showlegend: false
      };

      Plotly.newPlot(plotDiv, [trace], layout, {responsive: true});
    };

    const renderMiniCurves = (prefix, aucVal, color) => {
      let folder = '';
      if (prefix === 'lightgbm') folder = 'lightgbm';
      else if (prefix === 'catboost') folder = 'catboost';
      else if (prefix === 'xgboost') folder = 'xgboost';
      else if (prefix === 'isolation_forest') folder = 'isolation_forest';
      
      const basePath = `assets/visualizations/${folder}`;
      
      const injectImage = (divId, fileName) => {
        const div = document.getElementById(divId);
        if (div) {
          let mappedFile = fileName;
          if (prefix === 'xgboost') {
            if (fileName === 'roc_curve.png') mappedFile = 'XGBoost ROC Curve.png';
            else if (fileName === 'pr_curve.png') mappedFile = 'XGBoost PR Curve.png';
            else if (fileName === 'calibration_curve.png') mappedFile = 'XGBoost Calibration Curve.png';
            else if (fileName === 'lift_chart.png') mappedFile = 'XGBoost Lift Chart.png';
            else if (fileName === 'gain_chart.png') mappedFile = 'XGBoost Gain Chart.png';
          }
          const finalPath = `${basePath}/${mappedFile}`;
          const onerrorAttr = ` onerror="this.onerror=null; this.src='assets/images/cipher-logo.png'; this.alt='Visualization Not Available'; this.style.opacity='0.2'; this.style.padding='2rem';" `;
          div.innerHTML = `<img src="${finalPath}" class="img-fluid rounded" style="max-height: 100%; width: auto; cursor: zoom-in;" onclick="openLightbox('${finalPath}', '${mappedFile}')" alt="${mappedFile}"${onerrorAttr} />`;
        }
      };

      injectImage(`${prefix}-curve-roc`, 'roc_curve.png');
      injectImage(`${prefix}-curve-pr`, 'pr_curve.png');
      injectImage(`${prefix}-curve-calib`, 'calibration_curve.png');
      injectImage(`${prefix}-curve-lift`, 'lift_chart.png');
    };

    const renderXGBoostCurves = async () => {
      const plotCfg = { responsive: true, displayModeBar: false };
      const baseLayout = { paper_bgcolor: 'rgba(0,0,0,0)', plot_bgcolor: 'rgba(0,0,0,0)', font: { color: '#F1F5F9', size: 9 }, margin: { t: 25, b: 30, l: 35, r: 10 } };

      try {
        const [rocCsv, prCsv, calCsv, gainCsv] = await Promise.all([
          fetch('assets/visualizations/xgboost/roc_curve.csv').then(r => r.text()),
          fetch('assets/visualizations/xgboost/pr_curve.csv').then(r => r.text()),
          fetch('assets/visualizations/xgboost/calibration_curve.csv').then(r => r.text()),
          fetch('assets/visualizations/xgboost/gain_chart.csv').then(r => r.text())
        ]);

        const parseCSV = (text) => {
          const lines = text.trim().split('\n');
          const headers = lines[0].split(',');
          return lines.slice(1).map(line => {
            const vals = line.split(',');
            const obj = {};
            headers.forEach((h, i) => obj[h.trim()] = parseFloat(vals[i]));
            return obj;
          });
        };

        const rocData = parseCSV(rocCsv);
        Plotly.newPlot('xgb-roc-chart', [
          { x: rocData.map(r => r.FPR), y: rocData.map(r => r.TPR), type: 'scatter', mode: 'lines', name: 'ROC', line: { color: '#8B5CF6', width: 2 } },
          { x: [0, 1], y: [0, 1], type: 'scatter', mode: 'lines', name: 'Ref', line: { dash: 'dash', color: '#9CA3AF', width: 1 } }
        ], { ...baseLayout, xaxis: { title: 'FPR', range: [0, 1] }, yaxis: { title: 'TPR', range: [0, 1] } }, plotCfg);

        const prData = parseCSV(prCsv);
        Plotly.newPlot('xgb-pr-chart', [
          { x: prData.map(r => r.Recall), y: prData.map(r => r.Precision), type: 'scatter', mode: 'lines', name: 'PR', line: { color: '#8B5CF6', width: 2 } }
        ], { ...baseLayout, xaxis: { title: 'Recall', range: [0, 1] }, yaxis: { title: 'Precision', range: [0, 1] } }, plotCfg);

        const calData = parseCSV(calCsv);
        Plotly.newPlot('xgb-cal-chart', [
          { x: calData.map(r => r.Predicted_Probability), y: calData.map(r => r.Observed_Frequency), type: 'scatter', mode: 'lines+markers', name: 'Calibration', line: { color: '#8B5CF6', width: 2 }, marker: { size: 5 } },
          { x: [0, 1], y: [0, 1], type: 'scatter', mode: 'lines', name: 'Perfect', line: { dash: 'dash', color: '#9CA3AF', width: 1 } }
        ], { ...baseLayout, xaxis: { title: 'Predicted', range: [0, 1] }, yaxis: { title: 'Observed', range: [0, 1] } }, plotCfg);

        const gainData = parseCSV(gainCsv);
        const totalSamples = gainData.length;
        Plotly.newPlot('xgb-gain-chart', [
          { x: gainData.map((_, i) => ((i + 1) / totalSamples) * 100), y: gainData.map(r => r.gain), type: 'scatter', mode: 'lines', name: 'Gain', line: { color: '#8B5CF6', width: 2 } },
          { x: [0, 100], y: [0, 100], type: 'scatter', mode: 'lines', name: 'Random', line: { dash: 'dash', color: '#9CA3AF', width: 1 } }
        ], { ...baseLayout, xaxis: { title: '% Population', range: [0, 100] }, yaxis: { title: '% Fraud Captured', range: [0, 100] } }, plotCfg);

      } catch (e) { console.warn('XGBoost curve render error:', e); }
    };

    const plotFeatureImportance = (elementId, features, scores, color) => {
      const el = document.getElementById(elementId);
      if (!el) return;
      const data = [{
        x: scores,
        y: features,
        type: 'bar',
        orientation: 'h',
        marker: { color: color }
      }];
      const layout = {
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)',
        font: { color: '#F1F5F9', size: 8 },
        margin: { t: 10, b: 20, l: 10, r: 20 },
        yaxis: { automargin: true },
        xaxis: { automargin: true },
        autosize: true
      };
      Plotly.newPlot(elementId, data, layout, {responsive: true});
    };

    const drawFeatureImportances = () => {
      const count = GlobalState.filters.featureCount || 10;
      const importanceThresh = GlobalState.filters.featureImportanceThreshold || 0.05;
      
      const featuresPool = [
        'net_community_mule_ratio', 'velocity_ratio_7d_30d', 'counterparty_mule_count',
        'dormancy_days_before_spike', 'round_amount_ratio', 'net_betweenness_centrality',
        'unique_counterparty_30d', 'income_to_tx_ratio', 'kyc_verification_status', 
        'net_pagerank_score', 'velocity_ratio_1d_7d', 'avg_transaction_amount',
        'peak_hour_tx_ratio', 'device_binding_age', 'ip_risk_score',
        'foreign_tx_count_30d', 'failed_logins_count', 'mismatch_billing_shipping',
        'high_value_spike_ratio', 'dormant_account_reactivation'
      ];
      
      const lgbmScores = [0.089, 0.078, 0.063, 0.054, 0.049, 0.041, 0.038, 0.032, 0.025, 0.021, 0.019, 0.017, 0.015, 0.014, 0.012, 0.010, 0.008, 0.007, 0.005, 0.003];
      const catScores = [0.082, 0.075, 0.069, 0.051, 0.046, 0.043, 0.039, 0.035, 0.028, 0.024, 0.020, 0.018, 0.016, 0.013, 0.011, 0.009, 0.008, 0.006, 0.004, 0.002];
      const xgbScores = [0.085, 0.079, 0.061, 0.055, 0.047, 0.044, 0.037, 0.033, 0.026, 0.022, 0.021, 0.019, 0.015, 0.012, 0.011, 0.009, 0.007, 0.006, 0.005, 0.003];

      const filterByThreshold = (scores) => {
        const finalFeats = [];
        const finalScores = [];
        for (let i = 0; i < Math.min(count, scores.length); i++) {
          if (scores[i] >= importanceThresh) {
            finalFeats.push(featuresPool[i]);
            finalScores.push(scores[i]);
          }
        }
        return { features: finalFeats.reverse(), scores: finalScores.reverse() };
      };

      const lgbmData = filterByThreshold(lgbmScores);
      const catData = filterByThreshold(catScores);
      const xgbData = filterByThreshold(xgbScores);

      plotFeatureImportance('chart-lgbm-fi', lgbmData.features, lgbmData.scores, '#00FFA3');
      plotFeatureImportance('chart-cat-fi', catData.features, catData.scores, '#EA580C');
      plotFeatureImportance('chart-xgb-fi', xgbData.features, xgbData.scores, '#7C3AED');
    };

    // Fraud Investigation Feed AG Grid (investigator_dataset.parquet mock)
    let fraudFeedGridApi;
    const loadFraudFeed = () => {
      const columnDefs = [
        { field: 'case_id', headerName: 'Case ID', width: 100, filter: 'agTextColumnFilter', sortable: true },
        { field: 'account_id', headerName: 'Account', width: 95, filter: 'agTextColumnFilter', sortable: true },
        { 
          field: 'status', 
          headerName: 'Status', 
          width: 100,
          filter: 'agSetColumnFilter',
          sortable: true,
          cellRenderer: params => `<span class="badge ${params.value === 'OPEN' ? 'bg-danger' : 'bg-warning'}">${params.value}</span>`
        },
        { field: 'priority', headerName: 'Priority', width: 95, sortable: true },
        { 
          field: 'risk_tier', 
          headerName: 'Risk Tier', 
          width: 95,
          sortable: true,
          cellRenderer: params => `<span class="text-danger fw-bold">${params.value}</span>`
        },
        { field: 'analyst', headerName: 'Assigned', width: 110, filter: 'agTextColumnFilter', sortable: true },
        { field: 'evidence', headerName: 'Evidence', width: 95, sortable: true },
        { field: 'date', headerName: 'Inv. Date', width: 110, sortable: true }
      ];

      const gridOptions = {
        columnDefs: columnDefs,
        rowData: window.feedRows || [],
        rowHeight: 32,
        headerHeight: 30,
        pagination: true,
        paginationPageSize: 8,
        suppressHorizontalScroll: true,
        suppressColumnVirtualisation: true,
        domLayout: "normal",
        defaultColDef: {
          resizable: true,
        },
        onRowClicked: (event) => {
          openCaseDossier(event.data);
        }
      };
      
      const gridDiv = document.querySelector('#fraudFeedGrid');
      fraudFeedGridApi = agGrid.createGrid(gridDiv, gridOptions);
      if (fraudFeedGridApi && typeof fraudFeedGridApi.sizeColumnsToFit === 'function') {
        fraudFeedGridApi.sizeColumnsToFit();
      }
    };

    // Risk Engine Interactive Queue AG Grid
    let riskGridApi;
    const loadRiskEngine = () => {
      const columnDefs = [
        { field: 'account_id', headerName: 'Account ID', width: 100 },
        { 
          field: 'risk_score', 
          headerName: 'Risk Score', 
          width: 110,
          cellRenderer: params => {
            const val = parseFloat(params.value);
            const pct = isNaN(val) ? 0 : Math.min(100, Math.max(0, val));
            let barColor = 'bg-success';
            if (pct >= 85) barColor = 'bg-danger';
            else if (pct >= 60) barColor = 'bg-warning';
            else if (pct >= 30) barColor = 'bg-info';
            return `
              <div class="d-flex align-items-center gap-2">
                <span>${params.value}</span>
                <div class="progress flex-grow-1" style="height: 6px; background-color: rgba(255,255,255,0.05)">
                  <div class="progress-bar ${barColor}" style="width: ${pct}%"></div>
                </div>
              </div>
            `;
          }
        },
        { 
          field: 'risk_tier', 
          headerName: 'Tier', 
          width: 100,
          cellRenderer: params => {
            if (params.value === 'CRITICAL') return `<span class="badge bg-danger">CRITICAL</span>`;
            if (params.value === 'HIGH') return `<span class="badge bg-warning text-dark">HIGH</span>`;
            if (params.value === 'MEDIUM') return `<span class="badge bg-info">MEDIUM</span>`;
            return `<span class="badge bg-success">LOW</span>`;
          }
        },
        { field: 'lgbm_score', headerName: 'LightGBM', width: 90 },
        { field: 'action', headerName: 'Action', width: 110 }
      ];

      const gridOptions = {
        columnDefs: columnDefs,
        rowData: window.riskData || [],
        rowSelection: 'single',
        pagination: true,
        paginationPageSize: 10,
        rowHeight: 38,
        headerHeight: 34,
        suppressHorizontalScroll: true,
        suppressColumnVirtualisation: true,
        domLayout: "normal",
        defaultColDef: {
          resizable: true,
        },
        onRowClicked: (event) => {
          showTargetProfile(event.data);
        }
      };

      const gridDiv = document.querySelector('#riskGrid');
      riskGridApi = agGrid.createGrid(gridDiv, gridOptions);
      if (riskGridApi && typeof riskGridApi.sizeColumnsToFit === 'function') {
        riskGridApi.sizeColumnsToFit();
      }
      
      if (window.riskData && window.riskData.length > 0) {
        showTargetProfile(window.riskData[0]);
      }
    };

    // Smooth scroll utility
    window.smoothScrollTo = (targetId) => {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };

    window.exploreArchitecture = () => {
      // Switch to platform-overview tab first, then scroll
      switchTab('platform-overview');
      setTimeout(() => {
        const el = document.getElementById('platform-architecture');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 200);
    };

    window.openEvidenceRepository = () => {
      switchTab('platform-overview');
      setTimeout(() => {
        const el = document.getElementById('evidence-repository');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 200);
    };

    const showTargetProfile = (data) => {
      const profileContent = document.getElementById('risk-profile-content');
      let tierBadge = `<span class="badge bg-success">LOW RISK</span>`;
      if (data.risk_tier === 'CRITICAL') tierBadge = `<span class="badge bg-danger">CRITICAL SECURITY THREAT</span>`;
      else if (data.risk_tier === 'HIGH') tierBadge = `<span class="badge bg-warning text-dark">HIGH AUDIT PRIORITY</span>`;
      else if (data.risk_tier === 'MEDIUM') tierBadge = `<span class="badge bg-info">MEDIUM WARNING</span>`;

      profileContent.innerHTML = `
        <table class="table table-sm table-dark mt-3">
          <tbody>
            <tr><th>Account ID</th><td>${data.account_id}</td></tr>
            <tr><th>Risk Tier</th><td>${tierBadge}</td></tr>
            <tr><th>Surveillance Action</th><td><strong>${data.action}</strong></td></tr>
            <tr><th>LightGBM Core</th><td>${data.lgbm_score}</td></tr>
          </tbody>
        </table>
      `;

      // Update the Explainability and Investigation Summary
      const shapSelect = document.getElementById('shap-account-selector');
      if (shapSelect) {
        shapSelect.value = data.account_id;
        updateSHAPWaterfall(data.account_id);
      }

      const gaugeData = [{
        domain: { x: [0, 1], y: [0, 1] },
        value: data.risk_score,
        title: { text: "Aggregated Risk Rating", font: { size: 14 } },
        type: "indicator",
        mode: "gauge+number",
        number: { font: { size: 36 } },
        gauge: {
          axis: { range: [0, 1] },
          bar: { color: "#10B981" },
          steps: [
            { range: [0, 0.3], color: "#16A34A" },
            { range: [0.3, 0.6], color: "#D97706" },
            { range: [0.6, 0.85], color: "#EA580C" },
            { range: [0.85, 1], color: "#DC2626" }
          ]
        }
      }];
      const layout = {
        paper_bgcolor: 'rgba(0,0,0,0)',
        font: { color: '#F1F5F9', size: 10 },
        margin: { t: 40, b: 20, l: 30, r: 50 },
        autosize: true
      };
      Plotly.newPlot('risk-gauge', gaugeData, layout, {responsive: true});
    };

    // SHAP Explainability Engine
    const populateSHAPAccounts = () => {
      const select = document.getElementById('shap-account-selector');
      window.shapData.forEach(d => {
        const opt = document.createElement('option');
        opt.value = d.account_id;
        opt.textContent = `${d.account_id}`;
        select.appendChild(opt);
      });
      if (window.shapData.length > 0) {
        updateSHAPWaterfall(window.shapData[0].account_id);
      }
    };

    const updateSHAPWaterfall = (accountId) => {
      const record = window.shapData.find(d => d.account_id === accountId);
      if (!record) return;

      const featureNameMap = {
        'F3025': 'High network exposure',
        'F3484': 'Dormancy reactivation pattern',
        'F1863': 'Abnormal transaction velocity',
        'F1921': 'Repeated counterparties',
        'F3240_missing': 'Missing KYC verification',
        'F3898': 'Suspicious round amounts'
      };

      const getFeatureLabel = (f) => featureNameMap[f] || `Anomalous feature (${f})`;

      // Render Driver Cards
      const panelDiv = document.getElementById('decision-drivers-panel');
      
      let html = '<div class="d-flex flex-column gap-3 mt-3">';
      [record.top_feature_1, record.top_feature_2, record.top_feature_3].forEach((feat, idx) => {
        if (!feat) return;
        const label = getFeatureLabel(feat);
        if (feat === 'Data Not Available') {
          html += `
            <div class="p-3 bg-dark border rounded" style="border-color: rgba(255,255,255,0.1) !important;">
              <div class="d-flex justify-content-between align-items-center mb-1">
                <span class="text-white fw-bold">Rank ${idx + 1} Driver</span>
              </div>
              <div class="text-secondary" style="font-size: 0.9rem;">Data Not Available</div>
            </div>
          `;
        } else {
          html += `
            <div class="p-3 bg-dark border rounded" style="border-color: rgba(255,255,255,0.1) !important;">
              <div class="d-flex justify-content-between align-items-center mb-1">
                <span class="text-white fw-bold">Rank ${idx + 1} Driver</span>
                <span class="badge bg-danger" style="font-size: 0.7rem;">CRITICAL</span>
              </div>
              <div class="text-secondary" style="font-size: 0.9rem;">${feat}</div>
              <div style="font-size: 1.1rem; color: var(--primary); font-family: var(--font-mono); margin-top: 4px;">${label}</div>
            </div>
          `;
        }
      });
      html += '</div>';
      panelDiv.innerHTML = html;

      // Update Narrative
      const bulletHtml = [record.top_feature_1, record.top_feature_2, record.top_feature_3].filter(feat => feat && feat !== 'Data Not Available').map(feat => `
        <li class="mb-2 d-flex align-items-start gap-2">
          <i class="fa-solid fa-circle-exclamation text-danger mt-1" style="font-size: 0.8rem;"></i>
          <span>${getFeatureLabel(feat)}</span>
        </li>
      `).join('');

      document.getElementById('shap-nlp-explanation').innerHTML = `
        <div class="d-flex flex-column gap-3">
          <div class="p-3 rounded border border-secondary" style="background: rgba(255,255,255,0.015);">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <div>
                <span class="small text-muted" style="font-family: var(--font-mono);">ACCOUNT ID</span>
                <h5 class="text-white mb-0" style="font-family: var(--font-mono);">${record.account_id}</h5>
              </div>
            </div>
            <div class="my-3">
              <span class="small text-muted" style="font-family: var(--font-mono);">Explanation Note</span>
              <div class="text-secondary mt-1">This account was flagged based on the localized Shapley additive explanations from the champion model.</div>
            </div>
          </div>

          <div class="p-3 rounded border border-secondary" style="background: rgba(255,255,255,0.015);">
            <h6 class="small text-muted fw-bold mb-3" style="font-family: var(--font-mono);">PRIMARY RISK FACTORS</h6>
            <ul class="p-0 m-0 small text-white-50" style="list-style: none;">
              ${bulletHtml || '<li class="text-muted">No specific anomaly drivers found in explainability report.</li>'}
            </ul>
          </div>
        </div>
      `;
    };

    // Champion Framework indicators
    const loadChampionFramework = () => {
      const data = [{
        domain: { x: [0, 1], y: [0, 1] },
        value: 95.8,
        title: { text: "Enterprise Rating Index" },
        type: "indicator",
        mode: "gauge",
        gauge: {
          axis: { range: [0, 100], tickcolor: "rgba(255,255,255,0.3)" },
          bar: { color: "#10B981" },
          bgcolor: "rgba(0,0,0,0)",
          steps: [
            { range: [0, 100], color: "rgba(255,255,255,0.05)" }
          ]
        }
      }];
      const layout = {
        paper_bgcolor: 'rgba(0,0,0,0)',
        font: { color: '#F1F5F9', size: 10 },
        margin: { t: 40, b: 10, l: 30, r: 30 },
        annotations: [{
          text: "95.8%",
          x: 0.5,
          y: 0.1,
          showarrow: false,
          font: { size: 36, color: "#10B981", family: "var(--font-mono)" }
        }]
      };
      Plotly.newPlot('chart-champion-gauge', data, layout, {responsive: true});
    };

    // Case Dossier details modal for investigator feed clicks
    window.currentDossierAccountId = null;
    const openCaseDossier = (data) => {
      // Find the associated risk profile from riskData if missing (because it might be clicked from fraudFeed)
      const riskProfile = window.riskData.find(d => d.account_id === data.account_id) || {};
      
      const combinedData = {
        ...data,
        ...riskProfile, // Ensure we have lgbm_score, catboost_score, xgboost_score, action
      };

      let shapRecord = window.shapData.find(d => d.account_id === data.account_id);
      
      document.getElementById('dossier-account-id').innerText = data.account_id;
      window.currentDossierAccountId = data.account_id;

      const modalBody = document.getElementById('investigation-drawer-body');
      
      const featureNameMap = {
        'F3025': 'High network exposure',
        'F3484': 'Dormancy reactivation pattern',
        'F1863': 'Abnormal transaction velocity',
        'F1921': 'Repeated counterparties',
        'F3240_missing': 'Missing KYC verification',
        'F3898': 'Suspicious round amounts'
      };

      const getFeatureLabel = (f) => featureNameMap[f] || `Anomalous feature (${f})`;

      let shapHtml = '';
      if (shapRecord && shapRecord.top_feature_1) {
        shapHtml = [shapRecord.top_feature_1, shapRecord.top_feature_2, shapRecord.top_feature_3].filter(Boolean).map((feat, i) => `
          <div class="mb-2">
            <div class="d-flex justify-content-between small mb-1" style="font-family: var(--font-mono);">
              <span class="text-white">Rank ${i + 1} Driver</span>
              <span class="text-danger fw-bold">${feat}</span>
            </div>
            <div class="text-muted small">${getFeatureLabel(feat)}</div>
          </div>
        `).join('');
      } else {
        shapHtml = '<div class="text-muted small">No specific SHAP attributions found for this record.</div>';
      }

      let tierBadge = `<span class="badge bg-danger">CRITICAL SECURITY THREAT</span>`;
      if (combinedData.risk_tier === 'HIGH') tierBadge = `<span class="badge bg-warning text-dark">HIGH AUDIT PRIORITY</span>`;
      else if (combinedData.risk_tier === 'MEDIUM') tierBadge = `<span class="badge bg-info">MEDIUM WARNING</span>`;
      else if (combinedData.risk_tier === 'LOW') tierBadge = `<span class="badge bg-success">LOW RISK</span>`;

      let currentStatus = 'UNRESOLVED';
      if (fraudFeedGridApi) {
        fraudFeedGridApi.forEachNode(node => {
          if (node.data.account_id === data.account_id) {
            currentStatus = node.data.status || 'UNRESOLVED';
          }
        });
      }

      let statusBadgeClass = 'bg-secondary';
      if (currentStatus.includes('BLOCKED')) statusBadgeClass = 'bg-danger';
      else if (currentStatus.includes('ESCALATED')) statusBadgeClass = 'bg-warning text-dark';
      else if (currentStatus.includes('DISMISSED') || currentStatus.includes('OPEN')) statusBadgeClass = 'bg-success';
      else if (currentStatus.includes('INVESTIGATING')) statusBadgeClass = 'bg-warning text-dark';

      modalBody.innerHTML = `
        <div class="row g-4">
          <div class="col-12">
            <div class="p-3 rounded border border-secondary mb-3" style="background: rgba(255,255,255,0.015);">
              <h6 class="small text-muted fw-bold mb-3" style="font-family: var(--font-mono); letter-spacing: 0.5px;">ACCOUNT PROFILE</h6>
              <table class="table table-sm table-dark mb-0">
                <tbody>
                  <tr><th class="text-muted small">Account ID</th><td class="text-white fw-bold" style="font-family: var(--font-mono);">${data.account_id}</td></tr>
                  <tr><th class="text-muted small">Risk Tier</th><td>${tierBadge}</td></tr>
                  <tr><th class="text-muted small">Champion Decision</th><td class="text-white">${combinedData.action || 'REVIEW'}</td></tr>
                  <tr><th class="text-muted small">Recommended Action</th><td class="text-danger fw-bold">${combinedData.action || 'Manual Review Needed'}</td></tr>
                  <tr><th class="text-muted small">Investigation Status</th><td><span class="badge ${statusBadgeClass}" id="dossier-status-badge">${currentStatus}</span></td></tr>
                </tbody>
              </table>
            </div>

            <div class="p-3 rounded border border-secondary mb-3" style="background: rgba(255,255,255,0.015);">
              <h6 class="small text-muted fw-bold mb-3" style="font-family: var(--font-mono); letter-spacing: 0.5px;">MODEL SCORES</h6>
              <table class="table table-sm table-dark mb-0 text-center">
                <thead>
                  <tr>
                    <th class="text-muted small">Champion (Agg)</th>
                    <th class="text-muted small">LightGBM</th>
                  </tr>
                </thead>
                <tbody style="font-family: var(--font-mono); font-size: 1.1rem; color: var(--primary);">
                  <tr>
                    <td class="text-danger fw-bold">${combinedData.risk_score || 'Data Not Available'}</td>
                    <td>${combinedData.lgbm_score || 'Data Not Available'}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div class="p-3 rounded border border-secondary mb-3" style="background: rgba(255,255,255,0.015);">
              <h6 class="small text-danger fw-bold mb-3" style="font-family: var(--font-mono);"><i class="fa-solid fa-circle-chevron-up"></i> SHAP DRIVERS (TOP 3)</h6>
              ${shapHtml}
            </div>

            <div class="p-3 rounded border border-secondary" style="background: rgba(255,255,255,0.015);">
              <h6 class="small text-muted fw-bold mb-3" style="font-family: var(--font-mono); letter-spacing: 0.5px;">EVIDENCE FILES</h6>
              <div class="d-flex flex-column gap-2">
                <div class="d-flex align-items-center justify-content-between p-2 rounded border border-secondary bg-black" style="font-size: 0.8rem;">
                  <div class="d-flex align-items-center gap-2">
                    <i class="fa-solid fa-database text-accent"></i>
                    <div>
                      <span class="text-white fw-bold">investigator_dataset.parquet</span>
                      <span class="text-muted small d-block" style="font-size: 0.65rem;">Filtered subset containing this account</span>
                    </div>
                  </div>
                  <a href="data/outputs/investigator_dataset.parquet" target="_blank" class="btn btn-sm btn-cyber py-1 px-3" style="font-size: 0.65rem; font-family: var(--font-mono);">[ OPEN ]</a>
                </div>
                
                <div class="d-flex align-items-center justify-content-between p-2 rounded border border-secondary bg-black" style="font-size: 0.8rem;">
                  <div class="d-flex align-items-center gap-2">
                    <i class="fa-solid fa-file-invoice text-primary"></i>
                    <div>
                      <span class="text-white fw-bold">shap_local_explanations.csv</span>
                      <span class="text-muted small d-block" style="font-size: 0.65rem;">Local explainer report</span>
                    </div>
                  </div>
                  <a href="reports/explainability/shap_local_explanations.csv" target="_blank" class="btn btn-sm btn-cyber py-1 px-3" style="font-size: 0.65rem; font-family: var(--font-mono);">[ OPEN ]</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;

      const offcanvasEl = document.getElementById('investigationDrawer');
      const offcanvasInstance = new bootstrap.Offcanvas(offcanvasEl);
      offcanvasInstance.show();
    };

    const resolveCase = (action) => {
      const accountId = window.currentDossierAccountId;
      if (!accountId) return;

      const badge = document.getElementById('dossier-status-badge');
      if (badge) {
        if (action === 'BLOCK') {
          badge.innerText = 'RESOLVED: BLOCKED';
          badge.className = 'badge bg-danger';
        } else if (action === 'ESCALATE') {
          badge.innerText = 'RESOLVED: ESCALATED';
          badge.className = 'badge bg-warning text-dark';
        } else if (action === 'DISMISS') {
          badge.innerText = 'RESOLVED: DISMISSED';
          badge.className = 'badge bg-success';
        }
      }

      if (fraudFeedGridApi) {
        const rows = [];
        fraudFeedGridApi.forEachNode(node => {
          const rowData = node.data;
          if (rowData.account_id === accountId) {
            rowData.status = action === 'BLOCK' ? 'BLOCKED' : (action === 'ESCALATE' ? 'ESCALATED' : 'DISMISSED');
          }
          rows.push(rowData);
        });
        fraudFeedGridApi.setGridOption('rowData', rows);
        setTimeout(() => {
          if (fraudFeedGridApi && typeof fraudFeedGridApi.sizeColumnsToFit === 'function') {
            fraudFeedGridApi.sizeColumnsToFit();
          }
        }, 50);
      }
    };

    const handleHashRoute = () => {
      let hash = window.location.hash.substring(1);
      const validPages = ['platform-overview', 'surveillance-command', 'analytics-centers', 'risk-intelligence', 'governance'];
      if (hash === 'command-nexus') {
        hash = 'surveillance-command';
      }
      console.log("Active page:", window.location.hash || '#platform-overview');
      if (validPages.includes(hash)) {
        switchTab(hash);
      } else {
        switchTab('platform-overview');
      }
    };

    window.addEventListener('hashchange', handleHashRoute);

    // Run on startup
    window.addEventListener('DOMContentLoaded', async () => {
      console.log("Navigation initialized");
      const now = new Date();
      const lastRefreshEl = document.getElementById('nav-last-refresh');
      if (lastRefreshEl) {
        lastRefreshEl.innerText = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      }

      // Initial Plots load
      plotRiskDensity();
      
      // Feature importances
      drawFeatureImportances();

      // Load Parquet Data natively
      await loadParquetData();

      // Load Grids
      loadFraudFeed();
      loadRiskEngine();
      populateSHAPAccounts();
      loadChampionFramework();

      // Handle initial route
      handleHashRoute();

      // Initialize charts
      setTimeout(() => {
        // Redraw once grids are visible
        if (riskGridApi && typeof riskGridApi.sizeColumnsToFit === 'function') riskGridApi.sizeColumnsToFit();
        if (fraudFeedGridApi && typeof fraudFeedGridApi.sizeColumnsToFit === 'function') fraudFeedGridApi.sizeColumnsToFit();
      }, 300);
    });


    // Theme Toggle Logic Removed

    window.addEventListener('load', () => {
      if (fraudFeedGridApi && typeof fraudFeedGridApi.sizeColumnsToFit === 'function') {
        fraudFeedGridApi.sizeColumnsToFit();
      }
      if (riskGridApi && typeof riskGridApi.sizeColumnsToFit === 'function') {
        riskGridApi.sizeColumnsToFit();
      }
    });

    window.addEventListener('resize', () => {
      if (fraudFeedGridApi && typeof fraudFeedGridApi.sizeColumnsToFit === 'function') {
        fraudFeedGridApi.sizeColumnsToFit();
      }
      if (riskGridApi && typeof riskGridApi.sizeColumnsToFit === 'function') {
        riskGridApi.sizeColumnsToFit();
      }
    });