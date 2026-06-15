# EVIDENCE REPOSITORY REBUILD

Current implementation is incorrect.

The Evidence Repository currently behaves as a static dashboard card collection.

This creates a demo feeling.

I want Evidence Repository to become a REAL ENTERPRISE EVIDENCE MANAGEMENT CENTER.

==================================================
OBJECTIVE
==================================================

Every repository card must open REAL project evidence.

No placeholders.

No duplicated analytics.

No static content.

Only actual artifacts from the project repository.

Repository:

https://github.com/akash14102006/CipherZB160-IQ

==================================================
EVIDENCE REPOSITORY ARCHITECTURE
==================================================

Evidence Repository

├── Reports
├── Visualizations
├── Datasets
├── Models
├── Audit Files
└── SHAP Explanations

Each module must open a dedicated Evidence Drawer.

Not another dashboard section.

Not another page reload.

Use:

Slide Over Panel

or

Right Side Investigation Drawer

or

Modal Repository Explorer

==================================================
REPORTS MODULE
==================================================

When user clicks:

Reports

Open:

Repository Evidence Browser

Source:

/reports

Display:

lightgbm_metrics.csv
lightgbm_classification_report.csv
catboost_metrics.csv
catboost_classification_report.csv
xgboost_metrics.csv
xgboost_classification_report.csv
isolation_forest_metrics.csv

champion_model_report.csv

enterprise_model_comparison.csv

model_governance_report.csv

etc

For every file show:

File Name
File Type
Created Date
File Size

Open Button

Download Button

GitHub Button

GitHub button must open:

actual GitHub file

not dashboard content

==================================================
VISUALIZATIONS MODULE
==================================================

Source:

/reports

Only image files

Display:

lightgbm_roc_curve.png
lightgbm_pr_curve.png
lightgbm_calibration_curve.png
lightgbm_lift_chart.png

catboost_roc_curve.png
catboost_pr_curve.png
catboost_calibration_curve.png
catboost_lift_chart.png

xgboost_roc_curve.png
xgboost_pr_curve.png
xgboost_calibration_curve.png
xgboost_lift_chart.png

isolation_forest_roc_curve.png
isolation_forest_pr_curve.png
isolation_forest_score_distribution.png

etc

Open:

Image Gallery Viewer

Use:

Lightbox

Zoom

Fullscreen

Download

Open in GitHub

==================================================
DATASETS MODULE
==================================================

Source:

/data

Display:

enterprise_training_dataset_v1.parquet
champion_dataset_v1.parquet
investigator_dataset.parquet
risk_engine_output.parquet

train.parquet
test.parquet
validation.parquet

Show:

Rows
Columns
File Size

Preview Button

Preview must load first 25 records

AG Grid

Scrollable

Searchable

==================================================
MODELS MODULE
==================================================

Source:

/models

Display ONLY REAL MODEL FILES

lightgbm_model.txt

catboost_model.cbm

xgboost_model.json

isolation_forest.pkl

champion_model.txt

For each model show:

Model Name

Version

Framework

Created Date

File Size

Champion Status

Open GitHub

Download

==================================================
MODEL SPECIFIC EVIDENCE
==================================================

IMPORTANT

When user is inside:

LightGBM Deep Dive

Evidence Repository must ONLY show:

LightGBM files

Example:

lightgbm_metrics.csv

lightgbm_roc_curve.png

lightgbm_pr_curve.png

lightgbm_calibration_curve.png

lightgbm_feature_importance.csv

NOT CatBoost

NOT XGBoost

NOT Isolation Forest

==================================================
CATBOOST
==================================================

Only:

catboost_metrics.csv

catboost_roc_curve.png

catboost_pr_curve.png

catboost_calibration_curve.png

catboost_feature_importance.csv

catboost_model.cbm

==================================================
XGBOOST
==================================================

Only:

xgboost_metrics.csv

xgboost_roc_curve.png

xgboost_pr_curve.png

xgboost_calibration_curve.png

xgboost_feature_importance.csv

xgboost_model.json

==================================================
ISOLATION FOREST
==================================================

Only:

isolation_forest_metrics.csv

isolation_forest_roc_curve.png

isolation_forest_pr_curve.png

isolation_forest_score_distribution.png

isolation_forest.pkl

==================================================
FIX CURRENT BUG
==================================================

Current state:

LightGBM

CatBoost

XGBoost

all display identical content.

This is incorrect.

Every model page must dynamically load its own files.

No shared charts.

No duplicated images.

No hardcoded content.

==================================================
INVESTIGATION QUEUE
==================================================

Current state:

Empty panel.

Unacceptable.

Load:

investigator_dataset.parquet

Display:

Case ID

Account ID

Status

Priority

Risk Tier

Assigned Analyst

Evidence Count

Investigation Date

Use:

AG Grid Enterprise

Sorting

Filtering

Search

Pagination

Row Click

==================================================
ROW CLICK ACTION
==================================================

Open:

Investigation Drawer

Display:

Account Details

Risk Score

Risk Tier

Model Scores

Evidence Files

SHAP Explanation

Investigation Notes

==================================================
GITHUB INTEGRATION
==================================================

Every Evidence Card must have:

Open GitHub

Button

Must redirect to actual repository path

Examples:

Models

https://github.com/akash14102006/CipherZB160-IQ/tree/main/models

Reports

https://github.com/akash14102006/CipherZB160-IQ/tree/main/reports

Data

https://github.com/akash14102006/CipherZB160-IQ/tree/main/data

==================================================
RESULT
==================================================

Transform Evidence Repository from a static card section into a true enterprise evidence management system that exposes all real project artifacts, reports, datasets, visualizations, models, audit files, and SHAP evidence directly from the repository and dynamically filters evidence based on the currently selected model.