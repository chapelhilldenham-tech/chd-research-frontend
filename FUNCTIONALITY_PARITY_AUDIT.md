# PHP-to-Vite Public Functionality Parity Audit

Reference export inspected read-only from `C:\Users\aadedoyin\OneDrive - Chapel Hill Denham\Onedrive Desktop\chd-research-portal-v4_export.zip`.

## Scope Guardrails

- This audit covers public-facing route behavior, navigation, CTAs, filters, forms, disabled states, and copy patterns.
- PHP backend/session/auth/payment/upload logic was not copied or ported.
- Supabase schema, RLS, migrations, storage, uploads, admin writes, and deployment were not modified.
- Public Vite pages must only use safe public views or local static fallback data already present in the app.

## Public Feature Matrix

| PHP file/source location | User-facing behavior | Existing Vite equivalent | Status | Recommended action |
| --- | --- | --- | --- | --- |
| `public_html/includes/page.php` | Header nav links: Home, Reports, Data & Analytics, Analysts, Price Lists, Contact Us. Mobile drawer closes on link click. | `src/components/Navigation.tsx` | already_transferred | Keep React Router links. Public preview uses `/reports` for the CTA per approved Vite behavior. |
| `public_html/includes/page.php` | Guest header CTA is `RESEARCH ACCESS` to `/login.php`; authenticated users get account dropdown. | `src/components/Navigation.tsx` | partially_transferred | Auth/account dropdown is backend-dependent. Keep Vite public CTA as approved `EXPLORE RESEARCH` to `/reports`; document auth dropdown for later. |
| `public_html/includes/page.php` | Footer columns: Research, Contact, Access with Create Account, Sign In, Subscribe. | `src/components/Footer.tsx` | already_transferred | Create Account and Subscribe now route to safe Vite placeholder pages. |
| `public_html/index.php` | Home hero, latest research card, coverage tiles, analyst strip modals, access CTAs. | `src/pages/Home.tsx`, `src/components/AnalystStrip.tsx`, `src/components/ReportCard.tsx` | already_transferred | Keep visual baseline; home coverage query links now work through `/reports` query parsing. |
| `public_html/reports.php`, `public_html/assets/js/reports.js` | Research listing with search, category checkboxes, URL query initialization, clear filters, empty filter state, mobile bottom sheet filters. | `src/pages/Reports.tsx` | fixed_in_this_pass | Vite now reads and writes `?category=` and `?search=`, includes `Other`, and includes mobile filter sheet behavior. |
| `public_html/includes/page.php::report_card` | Public report cards link to detail; subscriber/internal cards show locked action and access link. | `src/components/ReportCard.tsx` | fixed_in_this_pass | Locked access now points to `/subscribe`; downloads remain unavailable unless a safe public file URL is exposed later. |
| `public_html/report.php` | Report detail supports id/uuid, hides non-published/internal records, locked download panel has Request Access and Sign In links, related reports. | `src/pages/ReportDetail.tsx` | partially_transferred | Public safe read is already through `public_research_reports`; locked action links added. True download and subscriber access remain backend-dependent. |
| `public_html/download.php` | Validates report file path, access level, MIME type, and streams only approved PDFs. | No Vite equivalent. | backend_dependent | Do not implement in frontend. Require private storage policy and signed-download design before enabling. |
| `public_html/analytics.php`, `public_html/assets/js/analytics.js` | Analytics dashboard has macro tabs, sector selector, market table, Paramount chart/methodology, and subscriber preview gate when locked. | `src/pages/Analytics.tsx` | partially_transferred | Public dashboard visual and local tab/sector interactions are represented. Subscriber gating and live chart series are backend-dependent. |
| `public_html/analysts.php`, `public_html/assets/js/analysts.js` | Analyst grid cards open dialogs; dialogs include biography and recent coverage; home strip hover-scrolls. | `src/pages/Analysts.tsx`, `src/components/AnalystModal.tsx`, `src/components/AnalystStrip.tsx` | partially_transferred | Modal/profile behavior exists. Recent coverage remains placeholder until safe public analyst-report mapping is finalized. |
| `public_html/price-lists.php` | Date form uses query parameter, displays matching file or empty state; download only for paid subscribers. | `src/pages/PriceLists.tsx` | partially_transferred | Date selection and empty/download-unavailable states exist. Real downloads remain backend-dependent and disabled. |
| `public_html/download-pricelist.php` | Paid-subscriber-only price list download with strict date/path validation. | No Vite download action. | backend_dependent | Do not fake downloads. Enable only after safe public/private file URL model is approved. |
| `public_html/contact.php`, `public_html/api/contact.php`, `public_html/assets/js/app.js` | Contact form validates required fields and sends AJAX email; shows inline success/error messages. Map link opens Google Maps. | `src/pages/Contact.tsx` | fixed_in_this_pass | Vite now performs frontend validation and shows a staging-unavailable message. Email sending remains backend-dependent. |
| `public_html/login.php` | Login form, forgot password link, create account link, inline auth errors. | `src/pages/Login.tsx` | fixed_in_this_pass | Links now route to `/reset-password` and `/signup`; sign-in remains intentionally disabled until Supabase Auth/RLS is approved. |
| `public_html/signup.php` | Create account form with industry, interests, referral source, terms, and subscription summary. | `src/pages/Signup.tsx` | fixed_in_this_pass | Safe placeholder route added. Submit is disabled; no account is created. |
| `public_html/reset-password.php` | Request reset link and token-based new password form. | `src/pages/ResetPassword.tsx` | fixed_in_this_pass | Safe placeholder route added. Email delivery/password update disabled. |
| `public_html/subscribe.php`, Paystack script | Subscription pricing page and Paystack checkout when configured. | `src/pages/Subscribe.tsx` | fixed_in_this_pass | Safe placeholder route added. Payment button is disabled; no payment flow is wired. |
| `public_html/404.php` | Friendly not-found page with return-home CTA. | React fallback currently handled inside detail route for report-not-found only. | missing | Add a general public 404 route in a later visual pass if desired. |
| `public_html/assets/js/app.js` | AJAX form helper, drawer close on Escape/overlay, account menu, table labels. | React component state and Router links. | partially_transferred | Public drawer behavior exists. AJAX/auth/logout behavior is backend-dependent and intentionally not ported. |

## Backend-Dependent Items Not Implemented

- Subscriber login, registration, reset-password email delivery, session redirects, logout, and account dropdown.
- Paystack subscription/payment flow.
- Contact email sending.
- Report PDF downloads and price-list downloads.
- Subscriber-only gating and paid access checks.
- Audit events for report views/downloads/login/contact/payment.
- Admin/back-office writes, imports, uploads, and storage behavior.

## Intentionally Disabled Public Actions

- Login submit.
- Create account submit.
- Password reset submit.
- Paystack payment.
- Report download buttons without a safe public file URL.
- Price-list download buttons without a safe public file URL.

## Verification Targets

- `/`
- `/reports`
- `/reports?category=equity`
- `/reports?search=strategy`
- `/report/101`
- `/report/not-a-real-report`
- `/analytics`
- `/analysts`
- `/price-lists`
- `/contact`
- `/login`
- `/signup`
- `/subscribe`
- `/reset-password`
