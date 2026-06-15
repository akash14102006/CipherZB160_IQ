# CipherZB160-IQ Data Flow

This document details the data lifecycle, pipeline stages, and file mappings within the CipherZB160-IQ system.

## Data Pipeline Stages
1. **Raw Ingestion**: Data starts in `data/raw/` containing raw financial records.
2. **Data Cleaning**: Handled by the data cleaning pipeline stage. Outputs intermediate clean records in `data/cleaned/`.
3. **Feature Engineering**: Feature engineering code extracts predictive behavioral signals. Outputs are saved in `data/processed/`.
4. **Feature Selection**: The feature selection process reduces dimensionality and identifies the most critical predictors. Selected features are stored in `data/feature_store/`.
5. **Model Scoring & Outputs**: Scored accounts are written to `data/outputs/` containing `investigator_dataset.parquet` and `risk_engine_output.parquet`.
