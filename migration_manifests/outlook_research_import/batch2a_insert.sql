-- Batch 2A Outlook Insert SQL

DO $$
DECLARE
    v_cat_id uuid;
BEGIN
    SELECT id INTO v_cat_id FROM public.research_categories WHERE slug = 'research-report';
    
    INSERT INTO public.research_reports (
        category_id, display_title, slug, original_file_name, storage_path, 
        published_date, publish_status, excerpt, source_type
    ) VALUES (
        v_cat_id, 
        'Daily Market Report', 
        'daily-market-report-2026-06-24', 
        'Daily Market Report (24-06-2026).pdf', 
        'outlook_research_import/batch2a/daily-market-report-2026-06-24/Daily Market Report (24-06-2026).pdf', 
        '2026-06-24', 
        'needs_review', 
        $email$Subject: Daily Market Report (24 June 2026)
Sender: Chapel Hill Denham Research <research@chapelhilldenham.com>
Received: 2026-06-24T18:59:40Z
Template status: Outlook body/template metadata only. Do not use as approved public website copy.

Body preview:
Money Market
Today, the OPR rate remained flat at 22.00%, while the O/N rate decreased by 18bps to close at 22.15%. System liquidity decreased significantly as bank balances closed in a net long position of N3.82tn from a net long position of N6.14tn.$email$,
        'outlook_batch2a'
    ) ON CONFLICT DO NOTHING;
END $$;

DO $$
DECLARE
    v_cat_id uuid;
BEGIN
    SELECT id INTO v_cat_id FROM public.research_categories WHERE slug = 'research-report';
    
    INSERT INTO public.research_reports (
        category_id, display_title, slug, original_file_name, storage_path, 
        published_date, publish_status, excerpt, source_type
    ) VALUES (
        v_cat_id, 
        'Daily Market Report', 
        'daily-market-report-2026-06-23', 
        'Daily Market Report (23-06-2026).pdf', 
        'outlook_research_import/batch2a/daily-market-report-2026-06-23/Daily Market Report (23-06-2026).pdf', 
        '2026-06-23', 
        'needs_review', 
        $email$Subject: Daily Market Report (23 June 2026)
Sender: Chapel Hill Denham Research <research@chapelhilldenham.com>
Received: 2026-06-23T19:55:35Z
Template status: Outlook body/template metadata only. Do not use as approved public website copy.

Body preview:
Money Market
Today, the OPR rate remained flat at 22.00%, while the O/N rate increased by 1bp to close at 22.33%. System liquidity increased significantly as bank balances closed in a net long position.$email$,
        'outlook_batch2a'
    ) ON CONFLICT DO NOTHING;
END $$;

DO $$
DECLARE
    v_cat_id uuid;
BEGIN
    SELECT id INTO v_cat_id FROM public.research_categories WHERE slug = 'research-report';
    
    INSERT INTO public.research_reports (
        category_id, display_title, slug, original_file_name, storage_path, 
        published_date, publish_status, excerpt, source_type
    ) VALUES (
        v_cat_id, 
        'Daily Market Report', 
        'daily-market-report-2026-06-22', 
        'Daily Market Report (22-06-2026).pdf', 
        'outlook_research_import/batch2a/daily-market-report-2026-06-22/Daily Market Report (22-06-2026).pdf', 
        '2026-06-22', 
        'needs_review', 
        $email$Subject: Daily Market Report (22 June 2026)
Sender: Chapel Hill Denham Research <research@chapelhilldenham.com>
Received: 2026-06-22T19:36:13Z
Template status: Outlook body/template metadata only. Do not use as approved public website copy.

Body preview:
Money Market
Today, the OPR rate remained flat at 22.00%, while the O/N rate increased by 12bps to close at 22.32%. System liquidity increased significantly as bank balances closed in a net long position.$email$,
        'outlook_batch2a'
    ) ON CONFLICT DO NOTHING;
END $$;

DO $$
DECLARE
    v_cat_id uuid;
BEGIN
    SELECT id INTO v_cat_id FROM public.research_categories WHERE slug = 'research-report';
    
    INSERT INTO public.research_reports (
        category_id, display_title, slug, original_file_name, storage_path, 
        published_date, publish_status, excerpt, source_type
    ) VALUES (
        v_cat_id, 
        'Daily Market Report', 
        'daily-market-report-2026-06-19', 
        'Daily Market Report (19-06-2026).pdf', 
        'outlook_research_import/batch2a/daily-market-report-2026-06-19/Daily Market Report (19-06-2026).pdf', 
        '2026-06-19', 
        'needs_review', 
        $email$Subject: Daily Market Report (19 June 2026)
Sender: Chapel Hill Denham Research <research@chapelhilldenham.com>
Received: 2026-06-19T18:49:43Z
Template status: Outlook body/template metadata only. Do not use as approved public website copy.

Body preview:
Money Market
Today, the OPR rate remained flat at 22.00%, while the O/N rate increased by 1bp to close at 22.20%. System liquidity decreased significantly as bank balances closed in a net long position.$email$,
        'outlook_batch2a'
    ) ON CONFLICT DO NOTHING;
END $$;

DO $$
DECLARE
    v_cat_id uuid;
BEGIN
    SELECT id INTO v_cat_id FROM public.research_categories WHERE slug = 'research-report';
    
    INSERT INTO public.research_reports (
        category_id, display_title, slug, original_file_name, storage_path, 
        published_date, publish_status, excerpt, source_type
    ) VALUES (
        v_cat_id, 
        'Daily Market Report', 
        'daily-market-report-2026-06-18', 
        'Daily Market Report (18-06-2026).pdf', 
        'outlook_research_import/batch2a/daily-market-report-2026-06-18/Daily Market Report (18-06-2026).pdf', 
        '2026-06-18', 
        'needs_review', 
        $email$Subject: Daily Market Report (18 June 2026)
Sender: Chapel Hill Denham Research <research@chapelhilldenham.com>
Received: 2026-06-18T18:29:30Z
Template status: Outlook body/template metadata only. Do not use as approved public website copy.

Body preview:
Money Market
Today, the OPR rate remained flat at 22.00%, while the O/N rate increased by 3bps to close at 22.19%. System liquidity increased as bank balances closed in a net long position.$email$,
        'outlook_batch2a'
    ) ON CONFLICT DO NOTHING;
END $$;

DO $$
DECLARE
    v_cat_id uuid;
BEGIN
    SELECT id INTO v_cat_id FROM public.research_categories WHERE slug = 'research-report';
    
    INSERT INTO public.research_reports (
        category_id, display_title, slug, original_file_name, storage_path, 
        published_date, publish_status, excerpt, source_type
    ) VALUES (
        v_cat_id, 
        'Daily Market Report', 
        'daily-market-report-2026-06-17', 
        'Daily Market Report (17-06-2026).pdf', 
        'outlook_research_import/batch2a/daily-market-report-2026-06-17/Daily Market Report (17-06-2026).pdf', 
        '2026-06-17', 
        'needs_review', 
        $email$Subject: Daily Market Report (17 June 2026)
Sender: Chapel Hill Denham Research <research@chapelhilldenham.com>
Received: 2026-06-17T19:49:02Z
Template status: Outlook body/template metadata only. Do not use as approved public website copy.

Body preview:
Money Market
Today, the OPR rate remained flat at 22.00%, while the O/N rate increased by 5bps to close at 22.21%. System liquidity increased as bank balances closed in a net long position.$email$,
        'outlook_batch2a'
    ) ON CONFLICT DO NOTHING;
END $$;

DO $$
DECLARE
    v_cat_id uuid;
BEGIN
    SELECT id INTO v_cat_id FROM public.research_categories WHERE slug = 'research-report';
    
    INSERT INTO public.research_reports (
        category_id, display_title, slug, original_file_name, storage_path, 
        published_date, publish_status, excerpt, source_type
    ) VALUES (
        v_cat_id, 
        'Daily Market Report', 
        'daily-market-report-2026-06-16', 
        'Daily Market Report (16-06-2026).pdf', 
        'outlook_research_import/batch2a/daily-market-report-2026-06-16/Daily Market Report (16-06-2026).pdf', 
        '2026-06-16', 
        'needs_review', 
        $email$Subject: Daily Market Report (16 June 2026)
Sender: Chapel Hill Denham Research <research@chapelhilldenham.com>
Received: 2026-06-16T19:00:46Z
Template status: Outlook body/template metadata only. Do not use as approved public website copy.

Body preview:
Money Market
Today, the OPR rate remained flat at 22.00%, while the O/N rate increased by 3bps to close at 22.26%. System liquidity increased as bank balances closed in a net long position.$email$,
        'outlook_batch2a'
    ) ON CONFLICT DO NOTHING;
END $$;

DO $$
DECLARE
    v_cat_id uuid;
BEGIN
    SELECT id INTO v_cat_id FROM public.research_categories WHERE slug = 'research-report';
    
    INSERT INTO public.research_reports (
        category_id, display_title, slug, original_file_name, storage_path, 
        published_date, publish_status, excerpt, source_type
    ) VALUES (
        v_cat_id, 
        'Daily Market Report', 
        'daily-market-report-2026-06-15', 
        'Daily Market Report (15-06-2026).pdf', 
        'outlook_research_import/batch2a/daily-market-report-2026-06-15/Daily Market Report (15-06-2026).pdf', 
        '2026-06-15', 
        'needs_review', 
        $email$Subject: Daily Market Report (15 June 2026)
Sender: Chapel Hill Denham Research <research@chapelhilldenham.com>
Received: 2026-06-15T17:35:47Z
Template status: Outlook body/template metadata only. Do not use as approved public website copy.

Body preview:
Money Market
Today, the OPR rate remained flat at 22.00%, while the O/N rate increased by 7bps to close at 22.23%. System liquidity decreased as bank balances closed in a net long position.$email$,
        'outlook_batch2a'
    ) ON CONFLICT DO NOTHING;
END $$;

DO $$
DECLARE
    v_cat_id uuid;
BEGIN
    SELECT id INTO v_cat_id FROM public.research_categories WHERE slug = 'research-report';
    
    INSERT INTO public.research_reports (
        category_id, display_title, slug, original_file_name, storage_path, 
        published_date, publish_status, excerpt, source_type
    ) VALUES (
        v_cat_id, 
        'Daily Market Report', 
        'daily-market-report-2026-06-11', 
        'Daily Market Report (11-06-2026).pdf', 
        'outlook_research_import/batch2a/daily-market-report-2026-06-11/Daily Market Report (11-06-2026).pdf', 
        '2026-06-11', 
        'needs_review', 
        $email$Subject: Daily Market Report (11 June 2026)
Sender: Chapel Hill Denham Research <research@chapelhilldenham.com>
Received: 2026-06-11T17:09:23Z
Template status: Outlook body/template metadata only. Do not use as approved public website copy.

Body preview:
Money Market
Today, the OPR rate remained flat at 22.00%, while the O/N rate increased by 12bps to close at 22.16%. System liquidity decreased as bank balances closed in a net long position.$email$,
        'outlook_batch2a'
    ) ON CONFLICT DO NOTHING;
END $$;

DO $$
DECLARE
    v_cat_id uuid;
BEGIN
    SELECT id INTO v_cat_id FROM public.research_categories WHERE slug = 'research-report';
    
    INSERT INTO public.research_reports (
        category_id, display_title, slug, original_file_name, storage_path, 
        published_date, publish_status, excerpt, source_type
    ) VALUES (
        v_cat_id, 
        'Daily Market Report', 
        'daily-market-report-2026-06-10', 
        'Daily Market Report (10-06-2026).pdf', 
        'outlook_research_import/batch2a/daily-market-report-2026-06-10/Daily Market Report (10-06-2026).pdf', 
        '2026-06-10', 
        'needs_review', 
        $email$Subject: Daily Market Report (10 June 2026)
Sender: Chapel Hill Denham Research <research@chapelhilldenham.com>
Received: 2026-06-10T18:40:25Z
Template status: Outlook body/template metadata only. Do not use as approved public website copy.

Body preview:
Money Market
Today, the OPR rate remained flat at 22.00%, while the O/N rate decreased by 10bps to close at 22.04%. System liquidity increased as bank balances closed in a net long position.$email$,
        'outlook_batch2a'
    ) ON CONFLICT DO NOTHING;
END $$;

DO $$
DECLARE
    v_cat_id uuid;
BEGIN
    SELECT id INTO v_cat_id FROM public.research_categories WHERE slug = 'research-report';
    
    INSERT INTO public.research_reports (
        category_id, display_title, slug, original_file_name, storage_path, 
        published_date, publish_status, excerpt, source_type
    ) VALUES (
        v_cat_id, 
        'Daily Market Report', 
        'daily-market-report-2026-06-08', 
        'Daily Market Report (08-06-2026).pdf', 
        'outlook_research_import/batch2a/daily-market-report-2026-06-08/Daily Market Report (08-06-2026).pdf', 
        '2026-06-08', 
        'needs_review', 
        $email$Subject: Daily Market Report (08 June 2026)
Sender: Chapel Hill Denham Research <research@chapelhilldenham.com>
Received: 2026-06-08T17:27:34Z
Template status: Outlook body/template metadata only. Do not use as approved public website copy.

Body preview:
Money Market
Today, the OPR rate remained flat at 22.00%, while the O/N rate rose by 7bps to close at 22.17%. System liquidity decreased as bank balances closed in a net long position.$email$,
        'outlook_batch2a'
    ) ON CONFLICT DO NOTHING;
END $$;

DO $$
DECLARE
    v_cat_id uuid;
BEGIN
    SELECT id INTO v_cat_id FROM public.research_categories WHERE slug = 'research-report';
    
    INSERT INTO public.research_reports (
        category_id, display_title, slug, original_file_name, storage_path, 
        published_date, publish_status, excerpt, source_type
    ) VALUES (
        v_cat_id, 
        'Daily Market Report', 
        'daily-market-report-2026-06-04', 
        'Daily Market Report (04-06-2026).pdf', 
        'outlook_research_import/batch2a/daily-market-report-2026-06-04/Daily Market Report (04-06-2026).pdf', 
        '2026-06-04', 
        'needs_review', 
        $email$Subject: Daily Market Report (04 June 2026)
Sender: Chapel Hill Denham Research <research@chapelhilldenham.com>
Received: 2026-06-04T17:22:47Z
Template status: Outlook body/template metadata only. Do not use as approved public website copy.

Body preview:
Money Market
Today, the OPR rate remained flat at 22.00%, while the O/N rate increased by 4bps to close at 22.15%. System liquidity decreased as bank balances closed in a net long position.$email$,
        'outlook_batch2a'
    ) ON CONFLICT DO NOTHING;
END $$;

DO $$
DECLARE
    v_cat_id uuid;
BEGIN
    SELECT id INTO v_cat_id FROM public.research_categories WHERE slug = 'research-report';
    
    INSERT INTO public.research_reports (
        category_id, display_title, slug, original_file_name, storage_path, 
        published_date, publish_status, excerpt, source_type
    ) VALUES (
        v_cat_id, 
        'Daily Market Report', 
        'daily-market-report-2026-06-03', 
        'Daily Market Report (03-06-2026).pdf', 
        'outlook_research_import/batch2a/daily-market-report-2026-06-03/Daily Market Report (03-06-2026).pdf', 
        '2026-06-03', 
        'needs_review', 
        $email$Subject: Daily Market Report (03 June 2026)
Sender: Chapel Hill Denham Research <research@chapelhilldenham.com>
Received: 2026-06-03T19:42:15Z
Template status: Outlook body/template metadata only. Do not use as approved public website copy.

Body preview:
Money Market
Today, the OPR rate remained flat at 22.00%, while the O/N rate increased by 3bps to close at 22.19%. System liquidity decreased as bank balances closed in a net long position.$email$,
        'outlook_batch2a'
    ) ON CONFLICT DO NOTHING;
END $$;

DO $$
DECLARE
    v_cat_id uuid;
BEGIN
    SELECT id INTO v_cat_id FROM public.research_categories WHERE slug = 'research-report';
    
    INSERT INTO public.research_reports (
        category_id, display_title, slug, original_file_name, storage_path, 
        published_date, publish_status, excerpt, source_type
    ) VALUES (
        v_cat_id, 
        'Daily Market Report', 
        'daily-market-report-2026-06-02', 
        'Daily Market Report (02-06-2026).pdf', 
        'outlook_research_import/batch2a/daily-market-report-2026-06-02/Daily Market Report (02-06-2026).pdf', 
        '2026-06-02', 
        'needs_review', 
        $email$Subject: Daily Market Report (02 June 2026)
Sender: Chapel Hill Denham Research <research@chapelhilldenham.com>
Received: 2026-06-02T17:34:34Z
Template status: Outlook body/template metadata only. Do not use as approved public website copy.

Body preview:
Money Market
Today, the OPR rate remained flat at 22.00%, while the O/N rate decreased by 7bps to close at 22.17%. System liquidity increased as bank balances closed in a net long position.$email$,
        'outlook_batch2a'
    ) ON CONFLICT DO NOTHING;
END $$;

DO $$
DECLARE
    v_cat_id uuid;
BEGIN
    SELECT id INTO v_cat_id FROM public.research_categories WHERE slug = 'research-report';
    
    INSERT INTO public.research_reports (
        category_id, display_title, slug, original_file_name, storage_path, 
        published_date, publish_status, excerpt, source_type
    ) VALUES (
        v_cat_id, 
        'Daily Market Report', 
        'daily-market-report-2026-06-01', 
        'Daily Market Report (01-06-2026).pdf', 
        'outlook_research_import/batch2a/daily-market-report-2026-06-01/Daily Market Report (01-06-2026).pdf', 
        '2026-06-01', 
        'needs_review', 
        $email$Subject: Daily Market Report (01 June 2026)
Sender: Chapel Hill Denham Research <research@chapelhilldenham.com>
Received: 2026-06-01T17:37:20Z
Template status: Outlook body/template metadata only. Do not use as approved public website copy.

Body preview:
Money Market
Today, the OPR rate remained flat at 22.00%, while the O/N rate increased by 5bps to close at 22.24%. System liquidity decreased as bank balances closed in a net long position.$email$,
        'outlook_batch2a'
    ) ON CONFLICT DO NOTHING;
END $$;

DO $$
DECLARE
    v_cat_id uuid;
BEGIN
    SELECT id INTO v_cat_id FROM public.research_categories WHERE slug = 'research-report';
    
    INSERT INTO public.research_reports (
        category_id, display_title, slug, original_file_name, storage_path, 
        published_date, publish_status, excerpt, source_type
    ) VALUES (
        v_cat_id, 
        'West Africa Weekly Market Report', 
        'west-africa-weekly-market-report-2026-06-22', 
        'CHDWAMR 220626.pdf', 
        'outlook_research_import/batch2a/west-africa-weekly-market-report-2026-06-22/CHDWAMR 220626.pdf', 
        '2026-06-22', 
        'needs_review', 
        $email$Source: Outlook email body preview/template metadata only.
Subject: West Africa Weekly Market Report (22 June, 2026)
Sender: Chapel Hill Denham Research <research@chapelhilldenham.com>
Received: 2026-06-22T15:49:44Z

Body preview:
Body preview was not available in the retained search result. Subject, sender, received date, and attachment metadata were captured for review.

Do not treat this text as approved public website copy.$email$,
        'outlook_batch2a'
    ) ON CONFLICT DO NOTHING;
END $$;

DO $$
DECLARE
    v_cat_id uuid;
BEGIN
    SELECT id INTO v_cat_id FROM public.research_categories WHERE slug = 'research-report';
    
    INSERT INTO public.research_reports (
        category_id, display_title, slug, original_file_name, storage_path, 
        published_date, publish_status, excerpt, source_type
    ) VALUES (
        v_cat_id, 
        'West Africa Weekly Market Report', 
        'west-africa-weekly-market-report-2026-06-15', 
        'CHDWAMR 150626.pdf', 
        'outlook_research_import/batch2a/west-africa-weekly-market-report-2026-06-15/CHDWAMR 150626.pdf', 
        '2026-06-15', 
        'needs_review', 
        $email$Source: Outlook email body preview/template metadata only.
Subject: West Africa Weekly Market Report (15 June, 2026)
Sender: Chapel Hill Denham Research <research@chapelhilldenham.com>
Received: 2026-06-15T14:54:19Z

Body preview:
Body preview was not available in the retained search result. Subject, sender, received date, and attachment metadata were captured for review.

Do not treat this text as approved public website copy.$email$,
        'outlook_batch2a'
    ) ON CONFLICT DO NOTHING;
END $$;

DO $$
DECLARE
    v_cat_id uuid;
BEGIN
    SELECT id INTO v_cat_id FROM public.research_categories WHERE slug = 'research-report';
    
    INSERT INTO public.research_reports (
        category_id, display_title, slug, original_file_name, storage_path, 
        published_date, publish_status, excerpt, source_type
    ) VALUES (
        v_cat_id, 
        'West Africa Weekly Market Report', 
        'west-africa-weekly-market-report-2026-06-08', 
        'CHDWAMR 080626.pdf', 
        'outlook_research_import/batch2a/west-africa-weekly-market-report-2026-06-08/CHDWAMR 080626.pdf', 
        '2026-06-08', 
        'needs_review', 
        $email$Source: Outlook email body preview/template metadata only.
Subject: West Africa Weekly Market Report (08 June, 2026)
Sender: Chapel Hill Denham Research <research@chapelhilldenham.com>
Received: 2026-06-08T17:09:31Z

Body preview:
Body preview was not available in the retained search result. Subject, sender, received date, and attachment metadata were captured for review.

Do not treat this text as approved public website copy.$email$,
        'outlook_batch2a'
    ) ON CONFLICT DO NOTHING;
END $$;

DO $$
DECLARE
    v_cat_id uuid;
BEGIN
    SELECT id INTO v_cat_id FROM public.research_categories WHERE slug = 'research-report';
    
    INSERT INTO public.research_reports (
        category_id, display_title, slug, original_file_name, storage_path, 
        published_date, publish_status, excerpt, source_type
    ) VALUES (
        v_cat_id, 
        'West Africa Weekly Market Report', 
        'west-africa-weekly-market-report-2026-06-01', 
        'CHDWAMR010626.pdf', 
        'outlook_research_import/batch2a/west-africa-weekly-market-report-2026-06-01/CHDWAMR010626.pdf', 
        '2026-06-01', 
        'needs_review', 
        $email$Source: Outlook email body preview/template metadata only.
Subject: West Africa Weekly Market Report (01 June, 2026)
Sender: Chapel Hill Denham Research <research@chapelhilldenham.com>
Received: 2026-06-01T14:18:44Z

Body preview:
Body preview was not available in the retained search result. Subject, sender, received date, and attachment metadata were captured for review.

Do not treat this text as approved public website copy.$email$,
        'outlook_batch2a'
    ) ON CONFLICT DO NOTHING;
END $$;

DO $$
DECLARE
    v_cat_id uuid;
BEGIN
    SELECT id INTO v_cat_id FROM public.research_categories WHERE slug = 'research-report';
    
    INSERT INTO public.research_reports (
        category_id, display_title, slug, original_file_name, storage_path, 
        published_date, publish_status, excerpt, source_type
    ) VALUES (
        v_cat_id, 
        'Daily Market Summary', 
        'daily-market-summary-2026-06-24', 
        '24 June Pricelist.xlsx', 
        'outlook_research_import/batch2a/daily-market-summary-2026-06-24/24 June Pricelist.xlsx', 
        '2026-06-24', 
        'needs_review', 
        $email$Source: Outlook email body preview/template metadata only.
Subject: Daily Market Summary (June 24, 2026)
Sender: Chapel Hill Denham Research <research@chapelhilldenham.com>
Received: 2026-06-24T15:46:15Z

Body preview:
Body preview was not available in the retained search result. Attachment metadata identified an Excel pricelist: 24 June Pricelist.xlsx.

Do not treat this text as approved public website copy.$email$,
        'outlook_batch2a'
    ) ON CONFLICT DO NOTHING;
END $$;

DO $$
DECLARE
    v_cat_id uuid;
BEGIN
    SELECT id INTO v_cat_id FROM public.research_categories WHERE slug = 'research-report';
    
    INSERT INTO public.research_reports (
        category_id, display_title, slug, original_file_name, storage_path, 
        published_date, publish_status, excerpt, source_type
    ) VALUES (
        v_cat_id, 
        'Daily Market Summary', 
        'daily-market-summary-2026-06-23', 
        '23 June Pricelist.xlsx', 
        'outlook_research_import/batch2a/daily-market-summary-2026-06-23/23 June Pricelist.xlsx', 
        '2026-06-23', 
        'needs_review', 
        $email$Source: Outlook email body preview/template metadata only.
Subject: Daily Market Summary (June 23, 2026)
Sender: Chapel Hill Denham Research <research@chapelhilldenham.com>
Received: 2026-06-23T15:30:31Z

Body preview:
Body preview was not available in the retained search result. Search result identified this as a Research-team daily market summary with attachments; pricelist filename follows the recurring daily pattern but needs reviewer confirmation.

Do not treat this text as approved public website copy.$email$,
        'outlook_batch2a'
    ) ON CONFLICT DO NOTHING;
END $$;

DO $$
DECLARE
    v_cat_id uuid;
BEGIN
    SELECT id INTO v_cat_id FROM public.research_categories WHERE slug = 'research-report';
    
    INSERT INTO public.research_reports (
        category_id, display_title, slug, original_file_name, storage_path, 
        published_date, publish_status, excerpt, source_type
    ) VALUES (
        v_cat_id, 
        'Ghanaian Daily Market Summary', 
        'ghanaian-daily-market-summary-2026-06-24', 
        'Pricelist 24 June 2026.xlsx', 
        'outlook_research_import/batch2a/ghanaian-daily-market-summary-2026-06-24/Pricelist 24 June 2026.xlsx', 
        '2026-06-24', 
        'needs_review', 
        $email$Source: Outlook email body preview/template metadata only.
Subject: Ghanaian Daily Market Summary (June 24, 2026)
Sender: Chapel Hill Denham Research <research@chapelhilldenham.com>
Received: 2026-06-24T16:23:52Z

Body preview:
Body preview was not available in the retained search result. Attachment metadata identified an Excel pricelist: Pricelist 24 June 2026.xlsx.

Do not treat this text as approved public website copy.$email$,
        'outlook_batch2a'
    ) ON CONFLICT DO NOTHING;
END $$;

DO $$
DECLARE
    v_cat_id uuid;
BEGIN
    SELECT id INTO v_cat_id FROM public.research_categories WHERE slug = 'research-report';
    
    INSERT INTO public.research_reports (
        category_id, display_title, slug, original_file_name, storage_path, 
        published_date, publish_status, excerpt, source_type
    ) VALUES (
        v_cat_id, 
        'Ghanaian Daily Market Summary', 
        'ghanaian-daily-market-summary-2026-06-23', 
        'Pricelist 23 June 2026.xlsx', 
        'outlook_research_import/batch2a/ghanaian-daily-market-summary-2026-06-23/Pricelist 23 June 2026.xlsx', 
        '2026-06-23', 
        'needs_review', 
        $email$Source: Outlook email body preview/template metadata only.
Subject: Ghanaian Daily Market Summary (June 23, 2026)
Sender: Chapel Hill Denham Research <research@chapelhilldenham.com>
Received: 2026-06-23T16:58:37Z

Body preview:
Body preview was not available in the retained search result. Search result identified this as a Research-team Ghanaian daily market summary with attachments; pricelist filename follows the recurring daily pattern but needs reviewer confirmation.

Do not treat this text as approved public website copy.$email$,
        'outlook_batch2a'
    ) ON CONFLICT DO NOTHING;
END $$;

DO $$
DECLARE
    v_cat_id uuid;
BEGIN
    SELECT id INTO v_cat_id FROM public.research_categories WHERE slug = 'research-report';
    
    INSERT INTO public.research_reports (
        category_id, display_title, slug, original_file_name, storage_path, 
        published_date, publish_status, excerpt, source_type
    ) VALUES (
        v_cat_id, 
        'Nigeria Corporate Action Tracker', 
        'nigeria-corporate-action-tracker-2026-06-22', 
        'Nigeria Corporate Action Tracker 22062026.pdf', 
        'outlook_research_import/batch2a/nigeria-corporate-action-tracker-2026-06-22/Nigeria Corporate Action Tracker 22062026.pdf', 
        '2026-06-22', 
        'needs_review', 
        $email$Source: Outlook email body preview/template metadata only.
Subject: N15.55bn expected in dividend payments this week
Sender: Chapel Hill Denham Research <research@chapelhilldenham.com>
Received: 2026-06-22T10:47:40Z

Body preview:
N15.55bn expected in dividend payments this week. Last week, SEPLAT, HMCALL, JBERGER, UH REIT and CILEASING paid a total of N82.30bn in dividends based on their various FY-25 and...

Do not treat this text as approved public website copy.$email$,
        'outlook_batch2a'
    ) ON CONFLICT DO NOTHING;
END $$;

DO $$
DECLARE
    v_cat_id uuid;
BEGIN
    SELECT id INTO v_cat_id FROM public.research_categories WHERE slug = 'research-report';
    
    INSERT INTO public.research_reports (
        category_id, display_title, slug, original_file_name, storage_path, 
        published_date, publish_status, excerpt, source_type
    ) VALUES (
        v_cat_id, 
        'Nigeria Corporate Action Tracker', 
        'nigeria-corporate-action-tracker-2026-06-08', 
        'Nigeria Dividend Tracker - 080626.pdf', 
        'outlook_research_import/batch2a/nigeria-corporate-action-tracker-2026-06-08/Nigeria Dividend Tracker - 080626.pdf', 
        '2026-06-08', 
        'needs_review', 
        $email$Source: Outlook email body preview/template metadata only.
Subject: N3.00bn expected in dividend payments this week
Sender: Chapel Hill Denham Research <research@chapelhilldenham.com>
Received: 2026-06-08T11:00:39Z

Body preview:
N3.00bn expected in dividend payments this week. Last week, AIICO, MAYBAKER and IKEJAHOTEL paid a total of N5.32bn in dividends based on their FY-25 and Q1-26 results, respectively...

Do not treat this text as approved public website copy.$email$,
        'outlook_batch2a'
    ) ON CONFLICT DO NOTHING;
END $$;

DO $$
DECLARE
    v_cat_id uuid;
BEGIN
    SELECT id INTO v_cat_id FROM public.research_categories WHERE slug = 'research-report';
    
    INSERT INTO public.research_reports (
        category_id, display_title, slug, original_file_name, storage_path, 
        published_date, publish_status, excerpt, source_type
    ) VALUES (
        v_cat_id, 
        'Nigeria Corporate Action Tracker', 
        'nigeria-corporate-action-tracker-2026-06-01', 
        'Nigeria Corporate Actions Dividend Tracker - 010626.pdf', 
        'outlook_research_import/batch2a/nigeria-corporate-action-tracker-2026-06-01/Nigeria Corporate Actions Dividend Tracker - 010626.pdf', 
        '2026-06-01', 
        'needs_review', 
        $email$Source: Outlook email body preview/template metadata only.
Subject: N5.32bn expected in dividend payments this week
Sender: Chapel Hill Denham Research <research@chapelhilldenham.com>
Received: 2026-06-01T09:34:31Z

Body preview:
N5.32bn expected in dividend payments this week. Last week, STANBIC, SEPLAT, OKOMUOIL, VFDGROUP, ABBEYBDS and MEYER paid a total of N150.80bn in dividends based on their FY-25...

Do not treat this text as approved public website copy.$email$,
        'outlook_batch2a'
    ) ON CONFLICT DO NOTHING;
END $$;
