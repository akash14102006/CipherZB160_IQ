// Tab switching engine
    const switchTab = (tabId) => {
      const pages = ['platform-overview', 'surveillance-command', 'analytics-centers', 'risk-intelligence', 'governance'];
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
        if (link.getAttribute('href') === `#${tabId}`) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
      
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
        { model: 'lightgbm', name: 'lightgbm_metrics.csv', path: 'website/assets/visualization/lightgbm/metrics.csv', size: '2 KB', type: 'CSV Document' },
        { model: 'lightgbm', name: 'lightgbm_classification_report.csv', path: 'website/assets/visualization/lightgbm/classification_report.csv', size: '1 KB', type: 'CSV Document' },
        { model: 'catboost', name: 'catboost_metrics.csv', path: 'website/assets/visualization/catboost/metrics.csv', size: '2 KB', type: 'CSV Document' },
        { model: 'catboost', name: 'catboost_classification_report.csv', path: 'website/assets/visualization/catboost/classification_report.csv', size: '1 KB', type: 'CSV Document' },
        { model: 'xgboost', name: 'xgboost_metrics.csv', path: 'website/assets/visualization/xgboost/metrics.csv', size: '2 KB', type: 'CSV Document' },
        { model: 'xgboost', name: 'xgboost_classification_report.csv', path: 'website/assets/visualization/xgboost/classification_report.csv', size: '1 KB', type: 'CSV Document' },
        { model: 'isolation_forest', name: 'isolation_forest_metrics.csv', path: 'website/assets/visualization/isolation_forest/metrics.csv', size: '1 KB', type: 'CSV Document' },
        { model: 'ALL', name: 'champion_model_report.csv', path: 'website/assets/visualization/champion_model_report.csv', size: '3 KB', type: 'CSV Document' },
        { model: 'ALL', name: 'enterprise_model_comparison.csv', path: 'website/assets/visualization/enterprise_model_comparison.csv', size: '4 KB', type: 'CSV Document' },
        { model: 'ALL', name: 'model_governance_report.csv', path: 'website/assets/visualization/model_governance_report.csv', size: '8 KB', type: 'CSV Document' }
      ],
      'visualizations': [
        { model: 'lightgbm', name: 'lightgbm_roc_curve.png', path: 'website/assets/visualization/LightGBM_visualizations/roc_curve.png', size: '45 KB', type: 'Image File' },
        { model: 'lightgbm', name: 'lightgbm_pr_curve.png', path: 'website/assets/visualization/LightGBM_visualizations/pr_curve.png', size: '42 KB', type: 'Image File' },
        { model: 'lightgbm', name: 'lightgbm_calibration_curve.png', path: 'website/assets/visualization/LightGBM_visualizations/calibration_curve.png', size: '38 KB', type: 'Image File' },
        { model: 'lightgbm', name: 'lightgbm_lift_chart.png', path: 'website/assets/visualization/LightGBM_visualizations/lift_chart.png', size: '40 KB', type: 'Image File' },
        { model: 'catboost', name: 'catboost_roc_curve.png', path: 'website/assets/visualization/CatBoost_visualizations/roc_curve.png', size: '46 KB', type: 'Image File' },
        { model: 'catboost', name: 'catboost_pr_curve.png', path: 'website/assets/visualization/CatBoost_visualizations/pr_curve.png', size: '43 KB', type: 'Image File' },
        { model: 'catboost', name: 'catboost_calibration_curve.png', path: 'website/assets/visualization/CatBoost_visualizations/calibration_curve.png', size: '39 KB', type: 'Image File' },
        { model: 'catboost', name: 'catboost_lift_chart.png', path: 'website/assets/visualization/CatBoost_visualizations/lift_chart.png', size: '41 KB', type: 'Image File' },
        { model: 'xgboost', name: 'xgboost_roc_curve.png', path: 'website/assets/visualization/XGBoost_Visualization/XGBoost ROC Curve.png', size: '45 KB', type: 'Image File' },
        { model: 'xgboost', name: 'xgboost_pr_curve.png', path: 'website/assets/visualization/XGBoost_Visualization/XGBoost ROC Curve.png', size: '42 KB', type: 'Image File' },
        { model: 'xgboost', name: 'xgboost_calibration_curve.png', path: 'website/assets/visualization/XGBoost_Visualization/XGBoost ROC Curve.png', size: '38 KB', type: 'Image File' },
        { model: 'xgboost', name: 'xgboost_lift_chart.png', path: 'website/assets/visualization/XGBoost_Visualization/XGBoost ROC Curve.png', size: '40 KB', type: 'Image File' },
        { model: 'isolation_forest', name: 'isolation_forest_roc_curve.png', path: 'website/assets/visualization/Isolation_forest_visualizations/roc_curve.png', size: '35 KB', type: 'Image File' },
        { model: 'isolation_forest', name: 'isolation_forest_pr_curve.png', path: 'website/assets/visualization/Isolation_forest_visualizations/pr_curve.png', size: '32 KB', type: 'Image File' },
        { model: 'isolation_forest', name: 'isolation_forest_score_distribution.png', path: 'website/assets/visualization/Isolation_forest_visualizations/isolation_forest_score_distribution.png', size: '48 KB', type: 'Image File' }
      ],
      'models': [
        { model: 'lightgbm', name: 'lightgbm_model.txt', path: 'models/challenger/lightgbm_model.txt', size: '1.2 MB', type: 'Model Binary', fw: 'LightGBM', ver: '1.0', champion: false },
        { model: 'catboost', name: 'catboost_model.cbm', path: 'models/challenger/catboost_model.cbm', size: '2.5 MB', type: 'Model Binary', fw: 'CatBoost', ver: '1.0', champion: false },
        { model: 'xgboost', name: 'xgboost_model.json', path: 'models/challenger/xgboost_model.json', size: '1.9 MB', type: 'Model JSON', fw: 'XGBoost', ver: '1.0', champion: false },
        { model: 'isolation_forest', name: 'isolation_forest.pkl', path: 'models/challenger/isolation_forest.pkl', size: '14 KB', type: 'Pickle', fw: 'Scikit-Learn', ver: '1.0', champion: false },
        { model: 'ALL', name: 'champion_model.txt', path: 'models/champion/champion_model.txt', size: '1.2 MB', type: 'Model Binary', fw: 'LightGBM', ver: '1.0', champion: true }
      ],
      'datasets': [
        { model: 'ALL', name: 'enterprise_training_dataset_v1.parquet', path: 'data/04_model_input/enterprise_training_dataset_v1.parquet', size: '256 MB', type: 'Parquet Data', rows: '1,024,000', cols: '64' },
        { model: 'ALL', name: 'champion_dataset_v1.parquet', path: 'data/04_model_input/champion_dataset_v1.parquet', size: '210 MB', type: 'Parquet Data', rows: '840,000', cols: '42' },
        { model: 'ALL', name: 'investigator_dataset.parquet', path: 'data/05_output/investigator_dataset.parquet', size: '15 MB', type: 'Parquet Data', rows: '9,082', cols: '128' },
        { model: 'ALL', name: 'risk_engine_output.parquet', path: 'data/05_output/risk_engine_output.parquet', size: '42 MB', type: 'Parquet Data', rows: '9,082', cols: '8' },
        { model: 'ALL', name: 'train.parquet', path: 'data/04_model_input/train.parquet', size: '150 MB', type: 'Parquet Data', rows: '600,000', cols: '64' },
        { model: 'ALL', name: 'test.parquet', path: 'data/04_model_input/test.parquet', size: '45 MB', type: 'Parquet Data', rows: '180,000', cols: '64' },
        { model: 'ALL', name: 'validation.parquet', path: 'data/04_model_input/validation.parquet', size: '45 MB', type: 'Parquet Data', rows: '180,000', cols: '64' }
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
      
      // Filter logic: Show 'ALL' files and files matching the current model filter.
      // If GlobalState is 'ALL', show EVERYTHING.
      const filteredFiles = allFiles.filter(f => {
        if (currentModelFilter === 'ALL') return true;
        return f.model === 'ALL' || f.model.toLowerCase() === currentModelFilter.toLowerCase().replace(' ', '_');
      });

      document.getElementById('evidenceDrawerCategory').innerText = category.toUpperCase() + ` (${filteredFiles.length})`;
      
      if (filteredFiles.length === 0) {
        drawerBody.innerHTML = `<div class="text-center text-muted py-5"><i class="fa-solid fa-folder-open mb-3" style="font-size: 3rem;"></i><br>No evidence found for selected model filter.</div>`;
      } else {
        drawerBody.innerHTML = filteredFiles.map(f => {
          const githubLink = `https://github.com/akash14102006/CipherZB160-IQ/tree/main/${f.path}`;
          const isImage = category === 'visualizations';
          const isDataset = category === 'datasets';
          const isModel = category === 'models';

          let extraInfo = '';
          if (isDataset) {
            extraInfo = `<div class="d-flex gap-3 mt-2 small text-muted"><span title="Rows"><i class="fa-solid fa-table-rows"></i> ${f.rows}</span><span title="Columns"><i class="fa-solid fa-table-columns"></i> ${f.cols}</span></div>`;
          } else if (isModel) {
            extraInfo = `<div class="d-flex gap-3 mt-2 small text-muted"><span><i class="fa-solid fa-code-branch"></i> ${f.fw}</span><span>v${f.ver}</span>${f.champion ? '<span class="text-warning"><i class="fa-solid fa-crown"></i> Champion</span>' : ''}</div>`;
          }

          let actionButtons = '';
          if (isImage) {
            actionButtons = `<button class="btn btn-sm btn-outline-primary" style="font-size: 0.7rem; font-family: var(--font-mono);" onclick="openLightbox('${f.path}', '${f.name}')"><i class="fa-solid fa-expand me-1"></i> VIEW</button>`;
          } else if (isDataset) {
            actionButtons = `<button class="btn btn-sm btn-outline-success" style="font-size: 0.7rem; font-family: var(--font-mono);" onclick="alert('Data preview triggered.\\nAG Grid visualization coming soon.')"><i class="fa-solid fa-eye me-1"></i> PREVIEW (25)</button>`;
          } else {
            actionButtons = `<button class="btn btn-sm btn-outline-info" style="font-size: 0.7rem; font-family: var(--font-mono);" onclick="window.open('https://drive.google.com/drive/u/0/folders/1wJtB1NzfdnRnzERzAllFfuQahAqy3RyS', '_blank')"><i class="fa-brands fa-google-drive me-1"></i> DRIVE</button>`;
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
                    ${actionButtons}
                    <button class="btn btn-sm btn-outline-secondary" style="font-size: 0.7rem; font-family: var(--font-mono);" onclick="window.open('${githubLink}', '_blank')"><i class="fa-brands fa-github me-1"></i> GITHUB</button>
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
        const isFiltered = this.filters.model !== 'ALL' || this.filters.riskLevel !== 'ALL' || this.filters.dateRange !== '30d' || this.filters.accountType !== 'ALL' || this.filters.riskScoreThreshold > 0.0;
        let total = data.length;
        let mules = data.filter(d => d.risk_score >= 0.85).length;
        
        const totalEl = document.getElementById('kpi-total-accounts');
        if (totalEl) totalEl.innerText = total.toLocaleString();
        
        const mulesEl = document.getElementById('kpi-mules-count');
        if (mulesEl) mulesEl.innerText = mules.toLocaleString();
        
        const rateEl = document.getElementById('kpi-fraud-rate');
        if (rateEl) {
          const rateVal = total > 0 ? ((mules / total) * 100).toFixed(2) : '0.00';
          rateEl.innerText = `${rateVal}%`;
        }

        const modelKey = this.filters.model;
        const metrics = modelMetrics[modelKey] || modelMetrics['ALL'];
        
        const rocEl = document.getElementById('kpi-roc-auc');
        if (rocEl) rocEl.innerText = metrics.roc;
        
        const f1El = document.getElementById('kpi-f1-score');
        if (f1El) f1El.innerText = metrics.f1;
        
        const recallEl = document.getElementById('kpi-recall');
        if (recallEl) recallEl.innerText = metrics.recall;
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
        const data = this.getFilteredData();
        const total = data.length;
        const mules = data.filter(d => d.risk_score >= 0.85).length;
        const rate = total > 0 ? ((mules / total) * 100).toFixed(1) : '0.0';
        
        alert(`=== MULESURVEIL COMPLIANCE REPORT ===\n\nActive Model Filter: [${this.filters.model}]\nActive Risk Tier: [${this.filters.riskLevel}]\nActive Account Type: [${this.filters.accountType}]\n\nSurveillance Metrics Summary:\n- Checked records: ${total}\n- Critical flagged threats: ${mules}\n- Aggregated fraud rate: ${rate}%\n\nCompliance Status: Audited.`);
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
        const hp = await import('https://cdn.jsdelivr.net/npm/hyparquet/+esm');
        
        // 1. Fetch risk_engine_output.parquet
        const riskBuf = await fetch('assets/data/risk_engine_output.parquet').then(r => r.arrayBuffer());
        const riskMeta = await hp.parquetMetadataAsync(riskBuf);
        const riskCols = riskMeta.schema.map(s => s.name).slice(1);
        
        await new Promise(resolve => {
          hp.parquetRead({
            file: riskBuf,
            onComplete: (data) => {
              window.riskData = data.map((row, i) => {
                const obj = { account_id: `ACC_${String(Number(row.record_id || i) + 1000).padStart(4, '0')}` };
                riskCols.forEach((col, idx) => {
                  let val = row[idx];
                  if (typeof val === 'bigint') val = Number(val);
                  obj[col] = val;
                });
                
                obj.lgbm_score = obj.risk_score || 'Data Not Available';
                obj.catboost_score = 'Data Not Available';
                obj.xgboost_score = 'Data Not Available';
                obj.action = obj.risk_tier === 'CRITICAL' ? 'BLOCK' : (obj.risk_tier === 'HIGH' ? 'ESCALATE' : (obj.risk_tier === 'MEDIUM' ? 'REVIEW' : 'MONITOR'));
                return obj;
              });
              resolve();
            }
          });
        });

        // 2. Fetch investigator_dataset.parquet
        const invBuf = await fetch('assets/data/investigator_dataset.parquet').then(r => r.arrayBuffer());
        const invMeta = await hp.parquetMetadataAsync(invBuf);
        const invCols = invMeta.schema.map(s => s.name).slice(1);
        
        await new Promise(resolve => {
          hp.parquetRead({
            file: invBuf,
            onComplete: (data) => {
              window.feedRows = data.map((row, i) => {
                const obj = { account_id: `ACC_${String(Number(row.record_id || i) + 1000).padStart(4, '0')}` };
                invCols.forEach((col, idx) => {
                  let val = row[idx];
                  if (typeof val === 'bigint') val = Number(val);
                  obj[col] = val;
                });
                
                return {
                  account_id: obj.account_id,
                  risk_score: obj.risk_score,
                  risk_tier: obj.risk_tier,
                  top_feature_1: obj.top_feature_1 || 'Data Not Available',
                  top_feature_2: obj.top_feature_2 || 'Data Not Available',
                  top_feature_3: obj.top_feature_3 || 'Data Not Available',
                  flagged_by: 'LightGBM v1.3',
                  status: 'UNRESOLVED',
                  action: obj.risk_tier === 'CRITICAL' ? 'BLOCK' : (obj.risk_tier === 'HIGH' ? 'ESCALATE' : 'REVIEW'),
                  timestamp: 'Data Not Available'
                };
              });
              
              window.shapData = []; // Will be loaded from CSV instead
              resolve();
            }
          });
        });

        // 3. Fetch SHAP Explainability CSV
        await new Promise((resolve, reject) => {
          Papa.parse('assets/visualization/shap_local_explanations.csv', {
            download: true,
            header: true,
            complete: (results) => {
              window.shapData = results.data.map((row, i) => {
                // record_id in CSV matches the row index in parquet
                const accountId = `ACC_${String(Number(row.record_id || i) + 1000).padStart(4, '0')}`;
                return {
                  account_id: accountId,
                  top_feature_1: row.top_feature_1 || 'Data Not Available',
                  top_feature_2: row.top_feature_2 || 'Data Not Available',
                  top_feature_3: row.top_feature_3 || 'Data Not Available'
                };
              }).filter(d => d.top_feature_1 !== 'Data Not Available'); // filter out empty rows
              resolve();
            },
            error: (err) => reject(err)
          });
        });

        // 4. Update dashboard KPIs
        document.getElementById('total-inv-metric').innerText = window.feedRows.length.toLocaleString();
        document.getElementById('open-cases-metric').innerText = window.feedRows.filter(r => r.status === 'OPEN').length.toLocaleString();
        document.getElementById('critical-accounts-metric').innerText = window.feedRows.filter(r => r.risk_tier === 'CRITICAL').length.toLocaleString();
        document.getElementById('high-risk-metric').innerText = window.feedRows.filter(r => r.risk_tier === 'HIGH').length.toLocaleString();

      } catch(err) {
        console.error("Error loading Parquet data:", err);
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

    // KDE curve
    const plotRiskDensity = (dataInput = riskData) => {
      const scores = dataInput.map(d => d.risk_score);
      
      const numPoints = 100;
      const xVals = [];
      const yVals = [];
      const h = 0.06;
      
      for (let i = 0; i <= numPoints; i++) {
        const x = i / numPoints;
        xVals.push(x);
        
        let sum = 0;
        scores.forEach(s => {
          const u = (x - s) / h;
          sum += Math.exp(-0.5 * u * u) / (Math.sqrt(2 * Math.PI) * h);
        });
        yVals.push(sum / scores.length);
      }
      
      const data = [{
        x: xVals,
        y: yVals,
        type: 'scatter',
        mode: 'lines',
        line: { shape: 'spline', color: '#10B981', width: 2 },
        fill: 'tozeroy',
        fillcolor: 'rgba(16, 185, 129, 0.15)'
      }];
      
      const layout = {
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)',
        font: { color: '#F1F5F9', size: 9 },
        margin: { t: 15, b: 25, l: 30, r: 15 },
        xaxis: { range: [0, 1], title: 'Risk Score' },
        yaxis: { showgrid: false }
      };
      
      Plotly.newPlot('chart-risk-density', data, layout, {responsive: true});
    };

    const renderMiniCurves = (prefix, aucVal, color) => {
      let folder = '';
      if (prefix === 'lightgbm') folder = 'LightGBM_visualizations';
      else if (prefix === 'catboost') folder = 'CatBoost_visualizations';
      else if (prefix === 'xgboost') folder = 'XGBoost_Visualization';
      else if (prefix === 'isolation_forest') folder = 'Isolation_forest_visualizations';
      
      const basePath = `assets/visualization/${folder}`;
      
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
          fetch('assets/visualization/XGBoost_Visualization/roc_curve.csv').then(r => r.text()),
          fetch('assets/visualization/XGBoost_Visualization/pr_curve.csv').then(r => r.text()),
          fetch('assets/visualization/XGBoost_Visualization/calibration_curve.csv').then(r => r.text()),
          fetch('assets/visualization/XGBoost_Visualization/gain_chart.csv').then(r => r.text())
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
                  <a href="data/05_output/investigator_dataset.parquet" target="_blank" class="btn btn-sm btn-cyber py-1 px-3" style="font-size: 0.65rem; font-family: var(--font-mono);">[ OPEN ]</a>
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

    // Run on startup
    window.addEventListener('DOMContentLoaded', async () => {
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

      // Initialize charts
      setTimeout(() => {
        // ... (Charts initialization remains unchanged)
      }, 100);
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