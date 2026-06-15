# CipherZB160-IQ Risk Engine Configuration

This document specifies the rule configurations, score boundaries, and action thresholds used by the risk classification engine.

## Score Thresholds
- **CRITICAL (BLOCK)**: Risk score >= 0.85
- **HIGH (ESCALATE)**: Risk score >= 0.60 and < 0.85
- **MEDIUM (REVIEW)**: Risk score >= 0.30 and < 0.60
- **LOW (MONITOR)**: Risk score < 0.30

## Action Codes
Action assignments map directly to the severity classifications:
1. **BLOCK**: Automatic freeze of suspect account funds.
2. **ESCALATE**: Immediate case routing to Senior AML Investigator.
3. **REVIEW**: Case routing to Surveillance Queue.
4. **MONITOR**: Low-priority background auditing.
