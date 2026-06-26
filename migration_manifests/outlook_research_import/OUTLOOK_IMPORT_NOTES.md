# Outlook Research Import Notes

Batch: `outlook_research_import`

## Scope Applied

- Source account searched: signed-in Outlook account `aadedoyin@chapelhilldenham.com`.
- Target mailbox requested: Research mailbox. No exact shared mailbox UPN was provided, so shared-mailbox APIs were not used.
- Selected source: June 2026 Daily Market Report emails from `research@chapelhilldenham.com`.
- Tajudeen 2023-2024 macro/update scope: no matching attached-report emails were available through the signed-in Outlook connector.

## Outlook Search Queries Used

- `"Daily Market Report" received>=2026-06-01 received<=2026-06-24 hasattachment:true`
- `DMR received>=2026-06-01 received<=2026-06-24 hasattachment:true`
- `Tajudeen macro update received>=2023-01-01 received<=2024-12-31 hasattachment:true`
- `Tajudeen received>2023-01-01 received<2025-01-01 hasattachment:true`
- `macro received>2023-01-01 received<2025-01-01 hasattachment:true`
- `update received>2023-01-01 received<2025-01-01 hasattachment:true Tajudeen`
- `received>2023-01-01 received<2025-01-01 hasattachment:true from:research@chapelhilldenham.com`
- `from:tibrahim@chapelhilldenham.com received>2023-01-01 received<2025-01-01 hasattachment:true`
- `macro from:tibrahim@chapelhilldenham.com hasattachment:true`
- `update from:tibrahim@chapelhilldenham.com hasattachment:true`
- `CPI from:tibrahim@chapelhilldenham.com hasattachment:true`
- `pricelist received>=2026-06-01 received<=2026-06-24 hasattachment:true from:research@chapelhilldenham.com`
- `"price list" received>=2026-06-01 received<=2026-06-24 hasattachment:true from:research@chapelhilldenham.com`
- `received>=2026-06-01 received<=2026-06-24 hasattachment:true from:research@chapelhilldenham.com`
- `"West Africa Weekly Market Report" received>=2026-06-01 received<=2026-06-24 hasattachment:true from:research@chapelhilldenham.com`
- `Corporate Action Tracker received>=2026-06-01 received<=2026-06-24 hasattachment:true from:research@chapelhilldenham.com`

## Emails Found

- Daily Market Report query: 16 in-scope June 2026 DMR emails from 2026-06-01 through 2026-06-24.
- DMR abbreviation query: 0.
- Tajudeen 2023-2024 attached report queries: 0 usable in-scope messages.
- Additional Research-team searches found June 2026 West Africa Weekly Market Report emails, Daily/Ghanaian Daily Market Summary pricelist emails, and dividend/corporate-action tracker emails.
- Some broad keyword searches returned unrelated 2026 operational emails and were not selected.

## Emails Selected

16 Daily Market Report emails:

- Daily Market Report (24 June 2026)
- Daily Market Report (23 June 2026)
- Daily Market Report (22 June 2026)
- Daily Market Report (19 June 2026)
- Daily Market Report (18 June 2026)
- Daily Market Report (17 June 2026)
- Daily Market Report (16 June 2026)
- Daily Market Report (15 June 2026)
- Daily Market Report (11 June 2026)
- Daily Market Report (10 June 2026)
- Daily Market Report (08 June 2026)
- Daily Market Report (05 June 2026)
- Daily Market Report (04 June 2026)
- Daily Market Report (03 June 2026)
- Daily Market Report (02 June 2026)
- Daily Market Report (01 June 2026)

Additional Research-team emails selected after the pricelist/other-research follow-up:

- West Africa Weekly Market Report (22 June, 2026)
- West Africa Weekly Market Report (15 June, 2026)
- West Africa Weekly Market Report (08 June, 2026)
- West Africa Weekly Market Report (01 June, 2026)
- Daily Market Summary (June 24, 2026)
- Daily Market Summary (June 23, 2026)
- Ghanaian Daily Market Summary (June 24, 2026)
- Ghanaian Daily Market Summary (June 23, 2026)
- N15.55bn expected in dividend payments this week
- N82.30bn expected in dividend payments this week
- N3.00bn expected in dividend payments this week
- N5.32bn expected in dividend payments this week

## Attachment Handling

- Outlook connector attachments downloaded: 0.
- Batch 2A manually downloaded files copied into `PDFs/`: 39 root files after the second manual batch.
- Batch 2A ZIP files extracted under `PDFs/_extracted/`: 15.
- Batch 2A total scanned files under `PDFs/`, excluding `.gitkeep`: 67.
- Batch 2A manifest matches: 26 of 28.
- Batch 2A manifest rows still missing files: 2.
- Non-PDF pricelist attachments identified: 4 candidate Excel rows.
- Additional PDF attachment candidates identified: 8 WAMR/corporate-action rows.
- The 24 June message attachment metadata showed inline image assets plus `Daily Market Report (24-06-2026).pdf`.
- The Outlook connector exposed attachment bytes inside the tool response, but did not provide a stable filesystem export path. Because the response was very large and truncated in the agent context, local PDF files could not be safely reconstructed.
- Batch 2A SHA256 values were calculated only for matched local files.
- `file_exists` is `true` where an exact filename, normalized filename, or clear title/date match was found.

### Batch 2A Rows Still Missing Files

- `Daily Market Report (05 June 2026)` / `Daily Market Report (05-06-2026).pdf`
- `N82.30bn expected in dividend payments this week` / `Nigeria Corporate Action Tracker 15062026.pdf`

### Batch 2A Unmatched File Types

- Supporting FMDQ PDF files extracted from Daily Market Report ZIPs were left in the package but not matched to manifest rows.
- Original Daily Market Report ZIP files were left in the package but not matched to manifest rows where the contained PDF was matched instead.
- Duplicate manually downloaded files with browser-added suffixes were left in the package and flagged by SHA256.
- `MyWealth UAT_Script.xlsx` remains unmatched.

### Batch 2A Duplicate Checks

- Duplicate filenames: none.
- Duplicate SHA256: `Daily Market Report (22-06-2026).pdf` and `Daily Market Report1 (22-06-2026).pdf`.
- Duplicate SHA256: `Daily Market Report (23-06-2026).pdf` and `Daily Market Report (23-06-2026)1.pdf`.
- Duplicate SHA256: `Pricelist 23 June 2026.xlsx` and `Pricelist 23 June 20261.xlsx`.
- Additional duplicate SHA256 groups exist between root files and extracted ZIP contents for the same Daily Market Report PDFs and supporting FMDQ PDFs.

## Email Templates

- Email templates created: 28.
- Template files are saved under `email_templates/`.
- Template content is Outlook body preview/template metadata only. It is not approved public website copy.

## Duplicate Check

- Duplicate files found by SHA256 after Batch 2A local scan.
- Duplicate filename groups found: 0.

## Skipped Emails

- External or operational reply chains such as `RE: Data Migration Update`, `Re: Zanibal-SAP Recon`, and `Re: SYMPLUS AM & TRUST MGT IMPLEMENTATION FOR CHAPEL HILL` were skipped because they were not original research report PDF emails.
- Tajudeen 2026 emails without attachments, such as morning call/timetable/demo messages, were skipped because they were outside the 2023-2024 report-PDF scope and had no PDF attachments.
- Search results outside June 2026 or unrelated to the requested DMR/Tajudeen scope were skipped.
- Extra Research-team searches returned older May/April/March 2026 WAMR and corporate-action emails; these were skipped to keep the package in the latest-June scope.
- Some additional daily market summary/pricelist dates were visible in paginated results but not selected in this pass because attachment filenames beyond the latest confirmed examples require reviewer confirmation or a stable export path.

## Safety Confirmation

- Nothing was uploaded.
- No database rows were inserted.
- Nothing was published.
- No migrations were run.
- No Supabase configuration or storage path was modified.
- No frontend or backend source code was modified.
