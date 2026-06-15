# Changelog

All notable changes to this project will be documented in this file.

## [1.6.0] - 2026-06-15
### Restructured
- Restructured repository layout to match recommended guidelines:
  - Moved JavaScript utility/helper scripts from the root directory into structured `scripts/` folders (`scripts/deployment/`, `scripts/visualization/`, `scripts/parquet/`, `scripts/maintenance/`, `scripts/explainability/`).
  - Moved and renamed notebooks folder from `Champion_models/` to `notebooks/`.
  - Reorganized `data/` pipeline directories mapping `01_intermediate` -> `cleaned`, `02_processed` -> `processed`, `03_feature_store` -> `feature_store`, `05_output` -> `outputs`. Created `data/raw/`.
  - Renamed visual asset folders to lowercase and plural under `website/assets/visualizations/` and updated model subfolders to lowercase (`lightgbm/`, `catboost/`, `xgboost/`, `isolation_forest/`).
- Updated all path references inside HTML and JS files to use the updated asset, visualization, and output folders.

### Added
- Created missing pipeline notebook templates in `notebooks/`.
- Created documentation files under `docs/` (`ARCHITECTURE.md`, `DATA_FLOW.md`, `MODEL_GOVERNANCE.md`, `RISK_ENGINE.md`, `DEPLOYMENT_GUIDE.md`).
- Added configurations and dependency files under `deployment/` (`vercel.json`, `package.json`, `requirements.txt`, `.env.example`).
- Created `website/about.html` landing subpage.
- Created root `LICENSE` and `CHANGELOG.md` files.
