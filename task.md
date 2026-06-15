1. SURVEILLANCE QUEUE

Current:

SURVEILLANCE QUEUE
[ EMPTY ]

Should load from:

data/risk_engine_output.parquet

Columns:

Account ID
Risk Score
Risk Tier
Champion Model Score
CatBoost Score
XGBoost Score
Isolation Score
Recommended Action
Last Updated

Example:

Account	Risk	Tier	Action
ACC_001	0.95	Critical	Block
ACC_002	0.82	High	Review
ACC_003	0.61	Medium	Monitor
2. TARGET ASSESSMENT

Current:

Select an account...

Should populate after clicking queue row.

Display:

Account Profile

Account ID

Risk Score

Risk Tier

Predicted Class

Champion Model

LightGBM Score

CatBoost Score

XGBoost Score

Isolation Forest Score

Final Recommendation

Evidence Files Count

SHAP Explanation Available
3. DECISION DRIVERS

Current:

EMPTY

Should load from:

reports/shap_local_explanations.csv

Show:

Top Risk Drivers

Example:

net_community_mule_ratio
+0.242

velocity_ratio_7d_30d
+0.187

counterparty_mule_count
+0.156

dormancy_days_before_spike
+0.101

Visual:

Risk Driver Cards

instead of raw tables.

4. INVESTIGATION SUMMARY

Current:

EMPTY

Should load from:

data/investigator_dataset.parquet

Show:

Case Status

Open Cases
Critical Cases
Pending Review
Closed Cases

Average Investigation Time

Evidence Attached

Last Investigation Date
5. INVESTIGATION QUEUE

Current:

EMPTY

Load from:

investigator_dataset.parquet

Columns:

Case ID
Account ID
Priority
Risk Tier
Status
Assigned Analyst
Evidence Count
Created Date

Use:

AG Grid Enterprise

with:

Sorting
Filtering
Search
Pagination
Row Click
6. SHAP EXPLAINABILITY

Current:

EMPTY

Use:

reports/shap_local_explanations.csv

Display:

Global Drivers
Top Risk Features
Local Drivers

Selected Account:

ACC_001

Show:

Why account was classified as Mule

Example:

↑ High counterparty mule count

↑ High network centrality

↑ Unusual transaction velocity

↑ Dormancy spike detected

Much better than raw waterfall charts.

MASTER PROMPT
Populate all currently empty sections using actual project artifacts.

DATA SOURCES

data/risk_engine_output.parquet
data/investigator_dataset.parquet
reports/shap_local_explanations.csv
reports/risk_score_distribution.csv
reports/risk_tier_distribution.csv

SURVEILLANCE QUEUE

Load risk_engine_output.parquet

Display:

Account ID
Risk Score
Risk Tier
Champion Model Score
CatBoost Score
XGBoost Score
Isolation Forest Score
Recommended Action

Use AG Grid Enterprise.

TARGET ASSESSMENT

Populate dynamically when user clicks a queue row.

Show full account risk profile.

DECISION DRIVERS

Load shap_local_explanations.csv

Show Top Risk Factors as cards.

Do not show empty containers.

INVESTIGATION SUMMARY

Load investigator_dataset.parquet

Display:

Total Cases
Open Cases
Critical Cases
Pending Review
Closed Cases

INVESTIGATION QUEUE

Load investigator_dataset.parquet

Display actual investigations.

Enable filtering, search and pagination.

SHAP EXPLAINABILITY

Replace empty panels with actual feature attribution summaries.

Use business language.

Example:

High transaction velocity increased risk by 18%.

Large mule network exposure increased risk by 24%.

No mock data.

No placeholders.

No empty containers.

Everything must be populated from real project files.