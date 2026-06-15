Risk Intelligence is currently empty because no real data source is connected.

Connect the Risk Intelligence module to:

data/risk_engine_output.parquet
data/investigator_dataset.parquet

Requirements:

1. Load risk_engine_output.parquet into the Surveillance Queue table.
2. Populate Account ID, Risk Score, Risk Tier, Model, Recommendation, and Risk Category columns.
3. When a user clicks a row, populate the Target Assessment panel with the selected account's full details.
4. Load investigator_dataset.parquet into an Investigation Cases panel.
5. Add filters:
   - Risk Tier
   - Risk Score Range
   - Model Source
   - Investigation Status
6. All filters must work against real parquet data, not demo data.
7. Remove all placeholder text such as:
   "Select an account in the queue table for detailed risk attributions."
8. If parquet files are missing required fields, automatically map available columns.
9. Show record counts:
   - Total Investigations
   - Open Cases
   - Critical Accounts
   - High Risk Accounts
10. Risk Intelligence must display real records immediately after page load.

No mock data.
No hardcoded values.
Only use data from:
data/risk_engine_output.parquet
data/investigator_dataset.parquet