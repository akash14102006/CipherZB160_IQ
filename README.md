# CipherZB160 IQ

Enterprise banking surveillance and intelligence command center for real-time detection, classification, and investigation of money mule accounts and networks.

---

[![Vercel Deployment](https://img.shields.io/badge/Deployment-Vercel-000000?style=for-the-badge&logo=vercel)](https://cipher-zb-160-iq.vercel.app)
[![GitHub Repository](https://img.shields.io/badge/Repository-GitHub-181717?style=for-the-badge&logo=github)](https://github.com/akash14102006/CipherZB160_IQ)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://github.com/akash14102006/CipherZB160_IQ/blob/main/LICENSE)
[![Python](https://img.shields.io/badge/Language-Python%203.10-3776AB?style=for-the-badge&logo=python)](https://python.org)
[![JavaScript](https://img.shields.io/badge/Language-JavaScript-F7DF1E?style=for-the-badge&logo=javascript)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

---

## 🏆** Adaption AutoScientist Challenge**

**👥 Team CipherZB160 IQ**

- Akash M — Product Lead | AI Architect
- Buvanraj V — ML & Intelligence Lead | Risk Modeling
- Baby P A — Platform Lead | Experience Design

<br>

> *"CipherZB160 IQ transforms hidden financial relationships into explainable intelligence, enabling investigators to move from suspicion to action with confidence."*

---

## 🔗 Project Resources

- 🌐 Live Platform → [Open Platform](https://cipher-zb-160-iq.vercel.app)
- 💻 Source Code → [View Source Code](https://github.com/akash14102006/CipherZB160_IQ)
- 🧠 ZB-Core (Intelligence Engine) → [Open ZB-Core](https://drive.google.com/drive/u/0/folders/1AP427e94riSBzPAk1Znozi9dG6wQOM_6)
- 📊 Presentation Deck → [View PPT](https://drive.google.com/file/d/1xxhlabPH0pyEm_7bx1UsENGDuGDJsNMY/view?usp=sharing)
- 🧬 Trained Dataset & Metrics → [View on Adaption Platform](https://adaptionlabs.ai/app/dataset/c3e61929-b5da-4e34-bb79-c925d1a1ad33?tab=measure)

---

## 📊 Adaption Platform Training & Quality Metrics

This project's dataset has been optimized and trained using [Adaption's Adaptive Data platform](https://adaptionlabs.ai/app/dataset/c3e61929-b5da-4e34-bb79-c925d1a1ad33?tab=measure). Below are the training and quality improvement details:

### Dataset Overview
![Dataset Overview](VAULT/Adaption%20App/dataset_overview.png)

### Quality & Grade Improvement
![Quality & Grade Improvement](VAULT/Adaption%20App/quality_improvement.png)

### Training Winrates
![Training Winrates](VAULT/Adaption%20App/training_winrates.png)


## Technical Index

- [Mission Snapshot](#mission-snapshot)
- [Threat Landscape](#threat-landscape)
- [Architecture](#architecture)
- [Mission Brief](#mission-brief)
- [Intelligence Pipeline](#intelligence-pipeline)
- [Data DNA](#data-dna)
- [Model Zoo](#model-zoo)
- [Model Leaderboard](#model-leaderboard)
- [Champion Selection](#champion-selection)
- [Model Comparison](#model-comparison)
- [Explainable AI](#explainable-ai)
- [Governance & Compliance](#governance--compliance)
- [Repository Structure](#repository-structure)
- [Platform Capabilities](#platform-capabilities)
- [Visual Gallery](#visual-gallery)
- [Technology Stack](#technology-stack)
- [Deployment](#deployment)
- [Evidence Repository](#evidence-repository)
- [Key Outcomes](#key-outcomes)
- [Future Roadmap](#future-roadmap)
- [License](#license)

---

## Mission Snapshot

| Threat | Solution | Impact |
| :--- | :--- | :--- |
| Money mule networks launder illicit funds undetected. | Real-time surveillance command center with explainable ML. | Time-to-detection cut to <15 mins, fraud losses down 40-60%. |

---

## Threat Landscape

| Problem | Why It Matters |
| :--- | :--- |
| High false positive rates. | Operators face severe alert fatigue. |
| Undetected circular routing. | Laundering syndicates drain assets. |
| Multi-day detection latency. | Mules transfer funds out successfully. |
| Opaque black-box models. | Regulator compliance audits fail. |

---

## Architecture

Visual overview of high-throughput ingestion, real-time feature store, and model scoring pipeline.

![Architecture Diagram](VAULT/SHOWCASE/architecture/architecture-diagram.png)

---

## Mission Brief

| Goal | Target |
| :--- | :--- |
| Stakeholders | Banks / AML Teams |
| Detection | Mule Accounts |
| Explainability | SHAP |
| Outcome | Faster Investigations |

---

## Intelligence Pipeline

```
Data ──> Signals ──> Models ──> Validation ──> Explainability ──> Deployment ──> Monitoring
```

---

## Data DNA

| Metric | Value |
| :--- | :---: |
| Accounts | 9,082 |
| Features | 3,923 |
| Mule Cases | 96 |
| Champion Features | 500 |

---

## Model Zoo

| Model | ROC AUC | Precision | Recall | F1 | Status |
| :--- | :---: | :---: | :---: | :---: | :--- |
| LightGBM | 0.9993 | 0.9000 | 0.7500 | 0.8182 | Champion |
| CatBoost | 0.9200 | 0.8200 | 0.7800 | 0.8000 | Challenger |
| XGBoost | 0.9100 | 0.8100 | 0.7600 | 0.7800 | Challenger |
| Isolation Forest | 0.8500 | 0.7000 | 0.6500 | 0.6700 | Baseline |

---

## Model Leaderboard

- Rank 1: LightGBM (Champion)
- Rank 2: CatBoost (Challenger)
- Rank 3: XGBoost (Challenger)
- Rank 4: Isolation Forest (Baseline)

---

## Champion Selection

| Why Champion Won |
| :--- |
| Highest ROC-AUC |
| Best Precision |
| Lowest False Alerts |
| Production Ready |

---

## Model Comparison

Detailed model evaluation curves, lift charts, and calibration parameters.

![Model Comparison](VAULT/SHOWCASE/screenshots/model-comparison.png)

---

## Explainable AI

| Capability | Status |
| :--- | :---: |
| Global SHAP | ✓ |
| Local SHAP | ✓ |
| Audit Trail | ✓ |

---

## Governance & Compliance

✓ Auditable

✓ Traceable

✓ Explainable

✓ Monitored

✓ Governed

---

## Repository Structure

```
CipherZB160-IQ/
├── CORE/
│   ├── AUTOMATION/               # Automated data pipelines and scheduling scripts
│   ├── DATA-HUB/                 # Data repository for ingestion and storage
│   ├── INTELLIGENCE-LAB/         # Machine learning modeling environment
│   └── COMMAND-CENTER/           # Operational frontend interface
└── VAULT/
    ├── REPORTS-CENTER/           # Evaluation reports, statistics, and model telemetry
    └── RESEARCH/                 # Research reports, technical docs, and references
```

---

## Platform Capabilities

| Capability | Available |
| :--- | :---: |
| Real-time Scoring | Yes |
| Interactive Density | Yes |
| Explanations | Yes |

---

## Visual Gallery

### Surveillance Command Center
![Platform Overview](VAULT/SHOWCASE/screenshots/platform-overview.png)

### Model Evaluation — LightGBM (Champion)
![LightGBM Analysis](VAULT/SHOWCASE/screenshots/lightgbm-deep-dive.png)

### Model Evaluation — CatBoost (Challenger)
![CatBoost Analysis](VAULT/SHOWCASE/screenshots/catboost-deep-dive.png)

### Model Evaluation — XGBoost (Challenger)
![XGBoost Analysis](VAULT/SHOWCASE/screenshots/xgboost-deep-dive.png)

### Model Evaluation — Isolation Forest (Baseline)
![Isolation Forest Analysis](VAULT/SHOWCASE/screenshots/isolation-forest-deep-dive.png)

---

## Technology Stack

| Layer | Technology |
| :--- | :--- |
| Frontend | HTML5, CSS3, Vanilla JS, Plotly.js |
| Core ML | LightGBM, CatBoost, XGBoost, SHAP |

---

## Deployment

Served via Vercel Edge Networks. CI/CD automated via GitHub Actions.

---

## Evidence Repository

Clickable shortcuts to verified system records:

- **Business Report**: [Business_Understanding_Report.pdf](VAULT/RESEARCH/references/Business_Understanding_Report.pdf)
- **Model Performance**: [model-performance/](VAULT/REPORTS-CENTER/model-performance/)
- **Data Dictionary**: [data-dictionary/](VAULT/RESEARCH/technical-docs/data-dictionary/)

---

## Key Outcomes

| KPI | Result |
| :--- | :--- |
| Latency | <5ms |
| Recall | 75.0% |
| FP Rate | <0.1% |

---

## Future Roadmap

- Integrate Graph Convolutional Network (GCN) layers.
- Automate SAR submissions via secure APIs.

---

## License

MIT License. Prepared by the CipherZB160-IQ Team.
