# Batch 2A Outlook Import - Dry Run Report

## Overview
Reconciliation of the Batch 2A Outlook package against existing staging database (represented by canonical manifest).

- **Total Rows Reviewed**: 28
- **Total Files Reviewed**: 26 (2 rows missing files)

## Classification Results
- **New Import Candidates**: 26
- **Duplicate Existing Records**: 0
- **Duplicate Existing Files**: 0
- **Missing File Pending**: 2
- **Needs Manual Review**: 0

## Actionable Next Steps
- Proposed Upload Count: 26 (only new files)
- Proposed Insert Count: 26 (metadata records for new files)

All proposed inserts remain configured with `review_status = needs_review` and `publish_status_recommendation = internal`. Email bodies are template content only.
