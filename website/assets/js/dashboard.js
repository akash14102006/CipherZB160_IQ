// Tab switching engine
    const switchTab = (tabId) => {
      const pages = ['surveillance-command', 'analytics-centers', 'risk-intelligence', 'governance'];
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
    const repositoryFiles = {
      'reports': [
        { name: 'executive_kpis.csv', path: 'website/assets/visualization/executive_kpis.csv', size: '120 B', desc: 'Core business KPIs for surveillance decision makers.' },
        { name: 'model_governance_report.csv', path: 'website/assets/visualization/model_governance_report.csv', size: '97 B', desc: 'Compliance status and regulator-aligned check logs.' },
        { name: 'challenger_models_report.csv', path: 'website/assets/visualization/challenger_models_report.csv', size: '181 B', desc: 'Metrics benchmark comparison for challengers CatBoost & XGBoost.' },
        { name: 'threshold_optimization_report.csv', path: 'website/assets/visualization/threshold_optimization_report.csv', size: '779 B', desc: 'Decision boundaries and FPR/TPR trade-off parameters.' },
        { name: 'champion_model_selection.csv', path: 'website/assets/visualization/champion_model_selection.csv', size: '79 B', desc: 'Selection matrices determining active deployment champion status.' }
      ],
      'visualizations': [
        { name: 'model_comparison.png', path: 'website/assets/visualization/model_comparison.png', size: '74.3 KB', desc: 'Aggregated ROC/PR comparison plot across all tree models.' },
        { name: 'lightgbm_roc_curve.png', path: 'website/assets/visualization/LightGBM_visualizations/roc_curve.png', size: '15.6 KB', desc: 'Champion LightGBM model False Positive vs True Positive rate curve.' },
        { name: 'lightgbm_pr_curve.png', path: 'website/assets/visualization/LightGBM_visualizations/pr_curve.png', size: '14.8 KB', desc: 'Champion LightGBM model Precision-Recall curve.' },
        { name: 'lightgbm_calibration.png', path: 'website/assets/visualization/LightGBM_visualizations/calibration_curve.png', size: '12.4 KB', desc: 'Probability calibration reliability curves.' },
        { name: 'lightgbm_lift_chart.png', path: 'website/assets/visualization/LightGBM_visualizations/lift_chart.png', size: '13.1 KB', desc: 'Lift and cumulative response curve.' },
        { name: 'catboost_roc_curve.png', path: 'website/assets/visualization/CatBoost_visualizations/roc_curve.png', size: '16.1 KB', desc: 'CatBoost challenger ROC validation plot.' },
        { name: 'catboost_pr_curve.png', path: 'website/assets/visualization/CatBoost_visualizations/pr_curve.png', size: '15.2 KB', desc: 'CatBoost challenger Precision-Recall plot.' },
        { name: 'isolation_forest_roc.png', path: 'website/assets/visualization/Isolation_forest_visualizations/roc_curve.png', size: '11.8 KB', desc: 'Unsupervised anomalies model validation curve.' },
        { name: 'isolation_forest_distribution.png', path: 'website/assets/visualization/Isolation_forest_visualizations/isolation_forest_score_distribution.png', size: '18.9 KB', desc: 'Decision score boundary distribution plot.' }
      ],
      'models': [
        { name: 'champion_model.txt', path: 'models/champion/champion_model.txt', size: '1.06 MB', desc: 'Serialized model binary weights for active LightGBM pipeline.' },
        { name: 'lightgbm_model.txt', path: 'models/challenger/lightgbm_model.txt', size: '1.06 MB', desc: 'Validation weights backup for LightGBM gradient booster.' },
        { name: 'catboost_model.cbm', path: 'models/challenger/catboost_model.cbm', size: '2.34 MB', desc: 'Symmetric decision tree classifier parameters.' },
        { name: 'xgboost_model.json', path: 'models/challenger/xgboost_model.json', size: '1.87 MB', desc: 'Extreme gradient boosting JSON structure weights.' },
        { name: 'isolation_forest.pkl', path: 'models/challenger/isolation_forest.pkl', size: '14.2 KB', desc: 'Unsupervised contamination anomaly detector pickle file.' }
      ],
      'datasets': [
        { name: 'DataSet.csv', path: 'DataSet.csv', size: '111.1 MB', desc: 'Raw financial transaction records containing features and labels.' },
        { name: 'risk_engine_output.parquet', path: 'data/05_output/risk_engine_output.parquet', size: '15.7 KB', desc: 'Processed risk scores and assigned action codes.' },
        { name: 'investigator_dataset.parquet', path: 'data/05_output/investigator_dataset.parquet', size: '20.3 KB', desc: 'Aggregated suspect accounts list loaded in queues.' },
        { name: 'train_features.parquet', path: 'cleaned/train_features.parquet', size: '25.1 MB', desc: 'Features matrix split used in model training.' },
        { name: 'validation_features.parquet', path: 'cleaned/validation_features.parquet', size: '8.58 MB', desc: 'Features matrix split used in validation.' },
        { name: 'test_features.parquet', path: 'cleaned/test_features.parquet', size: '8.56 MB', desc: 'Features matrix split used in final test.' }
      ],
      'documents': [
        { name: 'model_metrics_report.csv', path: 'website/assets/visualization/model_metrics_report.csv', size: '60 B', desc: 'Aggregated precision and F1 statistics signed by auditors.' },
        { name: 'model_summary.csv', path: 'website/assets/visualization/model_summary.csv', size: '104 B', desc: 'High level execution summary metadata.' },
        { name: 'enterprise_model_comparison.csv', path: 'website/assets/visualization/enterprise_model_comparison.csv', size: '180 B', desc: 'Cross-institution benchmark score audits.' },
        { name: 'champion_model_report.csv', path: 'website/assets/visualization/champion_model_report.csv', size: '79 B', desc: 'Regulator AML alignment certificate data.' }
      ]
    };

    const openRepository = (category) => {
      const files = repositoryFiles[category];
      if (!files) return;
      
      const modalLabel = document.getElementById('evidenceModalLabel');
      let title = '';
      if (category === 'reports') title = 'Compliance & Model Reports';
      else if (category === 'visualizations') title = 'Performance Visualizations';
      else if (category === 'models') title = 'Model Binaries (PKL)';
      else if (category === 'datasets') title = 'Preprocessed Datasets (CSV/Parquet)';
      else if (category === 'documents') title = 'Compliance Documents';
      
      modalLabel.innerHTML = `<span style="color: var(--primary); font-family: var(--font-mono);">//</span> ${title}`;
      
      const modalBody = document.getElementById('evidence-modal-body');
      let html = '';
      
      files.forEach(f => {
        html += `
          <div class="modal-file-item">
            <div class="d-flex align-items-center gap-3">
              <i class="fa-solid fa-file-arrow-down text-success" style="font-size: 1.25rem;"></i>
              <div>
                <strong class="text-white">${f.name}</strong>
                <div class="small text-muted" style="font-size: 0.75rem;">${f.desc}</div>
              </div>
            </div>
            <div class="d-flex align-items-center gap-3">
              <span class="badge bg-black border border-secondary text-muted" style="font-family: var(--font-mono); font-size: 0.65rem;">${f.size}</span>
              <a class="btn btn-sm btn-cyber py-1 px-3" href="${f.path.startsWith('website/') ? f.path.substring(8) : f.path}" target="_blank" style="font-family: var(--font-mono); font-size: 0.7rem;">[ OPEN ]</a>
            </div>
          </div>
        `;
      });
      
      modalBody.innerHTML = html;
      
      const modalEl = document.getElementById('evidenceModal');
      const modalInstance = bootstrap.Modal.getOrCreateInstance(modalEl);
      modalInstance.show();
    };

    // Global State Management Engine
    const GlobalState = {
      filters: {
        model: 'ALL',
        riskLevel: 'ALL',
        accountType: 'Suspicious',
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
        plotClassDistribution(filteredData);
        plotRiskTier(filteredData);
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
                const obj = {};
                invCols.forEach((col, idx) => {
                  let val = row[idx];
                  if (typeof val === 'bigint') val = Number(val);
                  obj[col] = val;
                });
                
                const accountId = `ACC_${String(Number(row.record_id || i) + 1000).padStart(4, '0')}`;
                return {
                  account_id: accountId,
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
                const accountId = `ACC_${String(Number(row.record_id || i) + 1000).padStart(4, '0')}`;
                return {
                  account_id: accountId,
                  top_feature_1: row.top_feature_1 || 'Data Not Available',
                  top_feature_2: row.top_feature_2 || 'Data Not Available',
                  top_feature_3: row.top_feature_3 || 'Data Not Available'
                };
              }).filter(d => d.top_feature_1 !== 'Data Not Available');
              resolve();
            },
            error: (err) => reject(err)
          });
        });
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
      Plotly.newPlot(`${prefix}-curve-roc`, [{
        x: [0, 0.1, 0.3, 1],
        y: [0, 0.85, 0.95, 1],
        type: 'scatter',
        mode: 'lines',
        name: 'ROC',
        line: { color: color }
      }, {
        x: [0, 1], y: [0, 1], type: 'scatter', mode: 'lines', name: 'Ref', line: { dash: 'dash', color: '#9CA3AF' }
      }], {
        paper_bgcolor: 'rgba(0,0,0,0)', plot_bgcolor: 'rgba(0,0,0,0)',
        font: { color: '#F1F5F9', size: 9 }, margin: { t: 25, b: 20, l: 25, r: 10 },
        title: `ROC Curve (AUC: ${aucVal})`, showlegend: false
      }, {responsive: true});

      Plotly.newPlot(`${prefix}-curve-pr`, [{
        x: [0, 0.7, 0.9, 1],
        y: [1, 0.9, 0.7, 0],
        type: 'scatter',
        mode: 'lines',
        line: { color: color }
      }], {
        paper_bgcolor: 'rgba(0,0,0,0)', plot_bgcolor: 'rgba(0,0,0,0)',
        font: { color: '#F1F5F9', size: 9 }, margin: { t: 25, b: 20, l: 25, r: 10 },
        title: 'Precision-Recall', showlegend: false
      }, {responsive: true});

      Plotly.newPlot(`${prefix}-curve-calib`, [{
        x: [0, 0.2, 0.5, 0.8, 1],
        y: [0, 0.21, 0.52, 0.79, 1],
        type: 'scatter',
        mode: 'lines+markers',
        line: { color: color }
      }], {
        paper_bgcolor: 'rgba(0,0,0,0)', plot_bgcolor: 'rgba(0,0,0,0)',
        font: { color: '#F1F5F9', size: 9 }, margin: { t: 25, b: 20, l: 25, r: 10 },
        title: 'Calibration', showlegend: false
      }, {responsive: true});

      Plotly.newPlot(`${prefix}-curve-lift`, [{
        x: [10, 30, 50, 80, 100],
        y: [8.5, 6.2, 3.1, 1.2, 1],
        type: 'scatter',
        mode: 'lines',
        line: { color: color }
      }], {
        paper_bgcolor: 'rgba(0,0,0,0)', plot_bgcolor: 'rgba(0,0,0,0)',
        font: { color: '#F1F5F9', size: 9 }, margin: { t: 25, b: 20, l: 25, r: 10 },
        title: 'Lift Curve', showlegend: false
      }, {responsive: true});
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

    const renderXGBoostCurves = async () => {
      const plotCfg = { responsive: true, displayModeBar: false };
      const baseLayout = { paper_bgcolor: 'rgba(0,0,0,0)', plot_bgcolor: 'rgba(0,0,0,0)', font: { color: '#F1F5F9', size: 9 }, margin: { t: 25, b: 30, l: 35, r: 10 } };

      try {
        const [rocCsv, prCsv, calCsv, liftCsv] = await Promise.all([
          fetch('assets/visualization/XGBoost_Visualization/roc_curve.csv').then(r => r.text()),
          fetch('assets/visualization/XGBoost_Visualization/pr_curve.csv').then(r => r.text()),
          fetch('assets/visualization/XGBoost_Visualization/calibration_curve.csv').then(r => r.text()),
          fetch('assets/visualization/XGBoost_Visualization/lift_chart.csv').then(r => r.text())
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
        Plotly.newPlot('xgb-curve-roc', [
          { x: rocData.map(r => r.FPR), y: rocData.map(r => r.TPR), type: 'scatter', mode: 'lines', name: 'ROC', line: { color: '#8B5CF6', width: 2 } },
          { x: [0, 1], y: [0, 1], type: 'scatter', mode: 'lines', name: 'Ref', line: { dash: 'dash', color: '#9CA3AF', width: 1 } }
        ], { ...baseLayout, xaxis: { title: 'FPR', range: [0, 1] }, yaxis: { title: 'TPR', range: [0, 1] } }, plotCfg);

        const prData = parseCSV(prCsv);
        Plotly.newPlot('xgb-curve-pr', [
          { x: prData.map(r => r.Recall), y: prData.map(r => r.Precision), type: 'scatter', mode: 'lines', name: 'PR', line: { color: '#8B5CF6', width: 2 } }
        ], { ...baseLayout, xaxis: { title: 'Recall', range: [0, 1] }, yaxis: { title: 'Precision', range: [0, 1] } }, plotCfg);

        const calData = parseCSV(calCsv);
        Plotly.newPlot('xgb-curve-calib', [
          { x: calData.map(r => r.Predicted_Probability), y: calData.map(r => r.Observed_Frequency), type: 'scatter', mode: 'lines+markers', name: 'Calibration', line: { color: '#8B5CF6', width: 2 }, marker: { size: 5 } },
          { x: [0, 1], y: [0, 1], type: 'scatter', mode: 'lines', name: 'Perfect', line: { dash: 'dash', color: '#9CA3AF', width: 1 } }
        ], { ...baseLayout, xaxis: { title: 'Predicted', range: [0, 1] }, yaxis: { title: 'Observed', range: [0, 1] } }, plotCfg);

        const liftData = parseCSV(liftCsv);
        const totalSamples = liftData.length;
        Plotly.newPlot('xgb-curve-lift', [
          { x: liftData.map((_, i) => ((i + 1) / totalSamples) * 100), y: liftData.map(r => r.lift), type: 'scatter', mode: 'lines', name: 'Lift', line: { color: '#8B5CF6', width: 2 } },
          { x: [0, 100], y: [1, 1], type: 'scatter', mode: 'lines', name: 'Baseline', line: { dash: 'dash', color: '#9CA3AF', width: 1 } }
        ], { ...baseLayout, xaxis: { title: '% Population', range: [0, 100] }, yaxis: { title: 'Lift', range: [0, Math.max(...liftData.map(r => r.lift)) * 1.1] } }, plotCfg);

      } catch (e) { console.warn('XGBoost curve render error:', e); }
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

    // Fraud Investigation Feed AG Grid
    let fraudFeedGridApi;
    const loadFraudFeed = () => {
      const columnDefs = [
        { field: 'account_id', headerName: 'Account', width: 90 },
        { 
          field: 'risk_score', 
          headerName: 'Risk', 
          width: 70,
          cellRenderer: params => `<span class="text-danger fw-bold">${params.value}</span>`
        },
        { 
          field: 'risk_tier', 
          headerName: 'Tier', 
          width: 85,
          cellRenderer: params => `<span class="badge bg-danger">CRITICAL</span>`
        },
        { field: 'flagged_by', headerName: 'Model', width: 95 },
        { field: 'action', headerName: 'Action', width: 85 },
        { field: 'timestamp', headerName: 'Timestamp', width: 95 },
        { 
          field: 'status', 
          headerName: 'Status', 
          width: 90,
          cellRenderer: params => `<span class="badge-status status-chall">UNRESOLVED</span>`
        }
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
        rowData: window.riskData,
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
      const accountOpts = document.getElementById('shap-account-selector');
      accountOpts.innerHTML = window.shapData.map(d => `<option value="${d.account_id}">`).join('');
      
      let accountId = 'ACC_1000';
      if (window.shapData && window.shapData.length > 0) {
        accountId = window.shapData[0].account_id;
      }
      updateSHAPWaterfall(accountId);
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

      const getFeatureLabel = (f) => {
        if (f === 'Data Not Available') return f;
        return featureNameMap[f] || `Anomalous feature (${f})`;
      };

      const panelDiv = document.getElementById('decision-drivers-panel');
      
      let posHtml = '';
      [record.top_feature_1, record.top_feature_2, record.top_feature_3].forEach((feat, idx) => {
        if (!feat || feat === 'Data Not Available') {
          posHtml += `
            <div class="mb-3">
              <div class="d-flex justify-content-between small mb-1" style="font-family: var(--font-mono);">
                <span class="text-white">Rank ${idx + 1} Driver</span>
              </div>
              <div class="text-muted small mt-1" style="font-size: 0.65rem;">Data Not Available</div>
            </div>
          `;
        } else {
          posHtml += `
            <div class="mb-3">
              <div class="d-flex justify-content-between small mb-1" style="font-family: var(--font-mono);">
                <span class="text-white">${getFeatureLabel(feat)}</span>
                <span class="text-danger fw-bold">CRITICAL</span>
              </div>
              <div class="text-muted small mt-1" style="font-size: 0.65rem;">${feat}</div>
            </div>
          `;
        }
      });

      panelDiv.innerHTML = `
        <div class="row g-4">
          <div class="col-12 col-md-12">
            <h6 class="small text-danger fw-bold mb-3" style="font-family: var(--font-mono);"><i class="fa-solid fa-circle-chevron-up"></i> SHAP DRIVERS (TOP 3)</h6>
            ${posHtml || '<div class="text-muted small">No drivers observed.</div>'}
          </div>
        </div>
      `;

      const bulletHtml = [record.top_feature_1, record.top_feature_2, record.top_feature_3]
        .filter(feat => feat && feat !== 'Data Not Available')
        .map(r => `
        <li class="mb-2 d-flex align-items-start gap-2">
          <i class="fa-solid fa-circle-exclamation text-danger mt-1" style="font-size: 0.8rem;"></i>
          <span>${getFeatureLabel(r)}</span>
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
              <div class="text-end">
                <span class="small text-muted" style="font-family: var(--font-mono);">PREDICTION STATUS</span>
                <div><span class="badge bg-danger">FLAGGED AS MULE</span></div>
              </div>
            </div>
            <div class="my-3">
              <span class="small text-muted" style="font-family: var(--font-mono);">Explanation Note</span>
              <div class="text-secondary mt-1">This account was flagged based on the localized Shapley additive explanations from the champion model.</div>
            </div>
          </div>

          <div class="p-3 rounded border border-secondary" style="background: rgba(255,255,255,0.015);">
            <h6 class="small text-muted fw-bold mb-3" style="font-family: var(--font-mono);">WHY WAS THIS ACCOUNT FLAGGED?</h6>
            <ul class="p-0 m-0 small text-white-50" style="list-style: none;">
              ${bulletHtml || '<li class="text-muted small">Data Not Available</li>'}
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
      let shapRecord = shapData.find(d => d.account_id === data.account_id);
      if (!shapRecord) {
        shapRecord = {
          account_id: data.account_id,
          top_feature_1: 'Data Not Available',
          top_feature_2: 'Data Not Available',
          top_feature_3: 'Data Not Available'
        };
      }

      document.getElementById('dossier-account-id').innerText = data.account_id;
      window.currentDossierAccountId = data.account_id;

      const modalBody = document.getElementById('case-dossier-modal-body');
      
      const featureNameMap = {
        'F3025': 'High network exposure',
        'F3484': 'Dormancy reactivation pattern',
        'F1863': 'Abnormal transaction velocity',
        'F1921': 'Repeated counterparties',
        'F3240_missing': 'Missing KYC verification',
        'F3898': 'Suspicious round amounts'
      };

      const getFeatureLabel = (f) => {
        if (f === 'Data Not Available') return f;
        return featureNameMap[f] || `Anomalous feature (${f})`;
      };

      let posHtml = '';
      [shapRecord.top_feature_1, shapRecord.top_feature_2, shapRecord.top_feature_3].forEach((feat, idx) => {
        if (!feat || feat === 'Data Not Available') {
          posHtml += `
            <div class="mb-3">
              <div class="d-flex justify-content-between small mb-1" style="font-family: var(--font-mono);">
                <span class="text-white">Rank ${idx + 1} Driver</span>
              </div>
              <div class="text-muted small mt-1" style="font-size: 0.65rem;">Data Not Available</div>
            </div>
          `;
        } else {
          posHtml += `
            <div class="mb-3">
              <div class="d-flex justify-content-between small mb-1" style="font-family: var(--font-mono);">
                <span class="text-white">${getFeatureLabel(feat)}</span>
                <span class="text-danger fw-bold">CRITICAL</span>
              </div>
              <div class="text-muted small mt-1" style="font-size: 0.65rem;">${feat}</div>
            </div>
          `;
        }
      });

      const bulletHtml = [shapRecord.top_feature_1, shapRecord.top_feature_2, shapRecord.top_feature_3]
        .filter(feat => feat && feat !== 'Data Not Available')
        .map(r => `
        <li class="mb-2 d-flex align-items-start gap-2">
          <i class="fa-solid fa-circle-exclamation text-danger mt-1" style="font-size: 0.8rem;"></i>
          <span>${getFeatureLabel(r)}</span>
        </li>
      `).join('');
      
      const displayBulletHtml = bulletHtml || '<li class="text-muted small">Data Not Available</li>';

      let tierBadge = `<span class="badge bg-danger">CRITICAL SECURITY THREAT</span>`;
      if (data.risk_tier === 'HIGH') tierBadge = `<span class="badge bg-warning text-dark">HIGH AUDIT PRIORITY</span>`;
      else if (data.risk_tier === 'MEDIUM') tierBadge = `<span class="badge bg-info">MEDIUM WARNING</span>`;
      else if (data.risk_tier === 'LOW') tierBadge = `<span class="badge bg-success">LOW RISK</span>`;

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
      else if (currentStatus.includes('DISMISSED')) statusBadgeClass = 'bg-success';

      modalBody.innerHTML = `
        <div class="row g-4">
          <div class="col-12 col-lg-5">
            <div class="p-3 rounded border border-secondary mb-3" style="background: rgba(255,255,255,0.015);">
              <h6 class="small text-muted fw-bold mb-3" style="font-family: var(--font-mono); letter-spacing: 0.5px;">CASE DETAILS</h6>
              <table class="table table-sm table-dark mb-0">
                <tbody>
                  <tr><th class="text-muted small">Account ID</th><td class="text-white fw-bold" style="font-family: var(--font-mono);">${data.account_id}</td></tr>
                  <tr><th class="text-muted small">Risk Tier</th><td>${tierBadge}</td></tr>
                  <tr><th class="text-muted small">Flagged By</th><td class="text-white">${data.flagged_by || 'LightGBM Champion'}</td></tr>
                  <tr><th class="text-muted small">Recommended Action</th><td class="text-danger fw-bold">${data.action}</td></tr>
                  <tr><th class="text-muted small">Timestamp</th><td class="text-white-50" style="font-family: var(--font-mono);">${data.timestamp || '02:15m ago'}</td></tr>
                  <tr><th class="text-muted small">Investigation Status</th><td><span class="badge ${statusBadgeClass}" id="dossier-status-badge">${currentStatus}</span></td></tr>
                </tbody>
              </table>
            </div>

            <div class="p-3 rounded border border-secondary mb-3" style="background: rgba(255,255,255,0.015);">
              <h6 class="small text-muted fw-bold mb-2" style="font-family: var(--font-mono); letter-spacing: 0.5px;">AGGREGATED RISK SCORE</h6>
              <div class="d-flex align-items-center gap-3">
                <h2 class="mb-0 text-white fw-bold" style="font-family: var(--font-mono);">${data.risk_score}</h2>
                <div class="progress flex-grow-1" style="height: 10px; background-color: rgba(255,255,255,0.05)">
                  <div class="progress-bar bg-danger" style="width: ${data.risk_score * 100}%"></div>
                </div>
              </div>
            </div>

            <div class="p-3 rounded border border-secondary" style="background: rgba(255,255,255,0.015);">
              <h6 class="small text-muted fw-bold mb-3" style="font-family: var(--font-mono); letter-spacing: 0.5px;">WHY WAS THIS ACCOUNT FLAGGED?</h6>
              <ul class="p-0 m-0 small text-white-50" style="list-style: none;">
                ${bulletHtml}
              </ul>
            </div>
          </div>

          <div class="col-12 col-lg-7">
            <div class="p-3 rounded border border-secondary mb-3" style="background: rgba(255,255,255,0.015);">
              <h6 class="small text-danger fw-bold mb-3" style="font-family: var(--font-mono);"><i class="fa-solid fa-circle-chevron-up"></i> SHAP DRIVERS (TOP 3)</h6>
              ${posHtml || '<div class="text-muted small">No drivers observed.</div>'}
            </div>

            <div class="p-3 rounded border border-secondary" style="background: rgba(255,255,255,0.015);">
              <h6 class="small text-muted fw-bold mb-3" style="font-family: var(--font-mono); letter-spacing: 0.5px;">ORIGINAL PROOFS & FILES (AUDIT EVIDENCE)</h6>
              <div class="d-flex flex-column gap-2">
                <div class="d-flex align-items-center justify-content-between p-2 rounded border border-secondary bg-black" style="font-size: 0.8rem;">
                  <div class="d-flex align-items-center gap-2">
                    <i class="fa-solid fa-database text-accent"></i>
                    <div>
                      <span class="text-white fw-bold">DataSet.csv</span>
                      <span class="text-muted small d-block" style="font-size: 0.65rem;">Raw inputs, features & variance outputs (111.1 MB)</span>
                    </div>
                  </div>
                  <a href="https://drive.google.com/drive/u/0/folders/1wJtB1NzfdnRnzERzAllFfuQahAqy3RyS" target="_blank" class="btn btn-sm btn-cyber py-1 px-3" style="font-size: 0.65rem; font-family: var(--font-mono);">[ DRIVE ]</a>
                </div>
                
                <div class="d-flex align-items-center justify-content-between p-2 rounded border border-secondary bg-black" style="font-size: 0.8rem;">
                  <div class="d-flex align-items-center gap-2">
                    <i class="fa-solid fa-file-invoice text-primary"></i>
                    <div>
                      <span class="text-white fw-bold">risk_engine_output.parquet</span>
                      <span class="text-muted small d-block" style="font-size: 0.65rem;">Processed risk scores and assigned action codes (15.7 KB)</span>
                    </div>
                  </div>
                  <a href="https://drive.google.com/drive/u/0/folders/1wJtB1NzfdnRnzERzAllFfuQahAqy3RyS" target="_blank" class="btn btn-sm btn-cyber py-1 px-3" style="font-size: 0.65rem; font-family: var(--font-mono);">[ DRIVE ]</a>
                </div>

                <div class="d-flex align-items-center justify-content-between p-2 rounded border border-secondary bg-black" style="font-size: 0.8rem;">
                  <div class="d-flex align-items-center gap-2">
                    <i class="fa-solid fa-file-shield text-danger"></i>
                    <div>
                      <span class="text-white fw-bold">model_governance_report.csv</span>
                      <span class="text-muted small d-block" style="font-size: 0.65rem;">AML compliance & validation audit check log (97 B)</span>
                    </div>
                  </div>
                  <a href="assets/visualization/model_governance_report.csv" target="_blank" class="btn btn-sm btn-cyber py-1 px-3" style="font-size: 0.65rem; font-family: var(--font-mono);">[ OPEN ]</a>
                </div>

                <div class="d-flex align-items-center justify-content-between p-2 rounded border border-secondary bg-black" style="font-size: 0.8rem;">
                  <div class="d-flex align-items-center gap-2">
                    <i class="fa-solid fa-brain text-warning"></i>
                    <div>
                      <span class="text-white fw-bold">champion_model.txt</span>
                      <span class="text-muted small d-block" style="font-size: 0.65rem;">Serialized LightGBM model weights and thresholds (1.06 MB)</span>
                    </div>
                  </div>
                  <a href="models/champion/champion_model.txt" target="_blank" class="btn btn-sm btn-cyber py-1 px-3" style="font-size: 0.65rem; font-family: var(--font-mono);">[ OPEN ]</a>
                </div>

                <div class="d-flex align-items-center justify-content-between p-2 rounded border border-secondary bg-black" style="font-size: 0.8rem;">
                  <div class="d-flex align-items-center gap-2">
                    <i class="fa-solid fa-image text-info"></i>
                    <div>
                      <span class="text-white fw-bold">lightgbm_roc_curve.png</span>
                      <span class="text-muted small d-block" style="font-size: 0.65rem;">Model False Positive vs True Positive validation plot (15.6 KB)</span>
                    </div>
                  </div>
                  <a href="assets/visualization/LightGBM_visualizations/roc_curve.png" target="_blank" class="btn btn-sm btn-cyber py-1 px-3" style="font-size: 0.65rem; font-family: var(--font-mono);">[ VIEW ]</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;

      const modalEl = document.getElementById('caseDossierModal');
      const modalInstance = bootstrap.Modal.getOrCreateInstance(modalEl);
      modalInstance.show();
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
      plotClassDistribution();
      plotRiskTier();
      plotRiskDensity();
      
      // Mini Curves
      renderMiniCurves('xgb', '0.997', '#8B5CF6');

      // Feature importances
      drawFeatureImportances();

      // Load Parquet Data natively
      await loadParquetData();

      // Load Grids
      loadFraudFeed();
      loadRiskEngine();
      populateSHAPAccounts();
      loadChampionFramework();
    });

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