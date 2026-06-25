-- Batch 2A Outlook Fixed Insert SQL

DO $$
DECLARE
    v_cat_id uuid;
BEGIN
    SELECT id INTO v_cat_id FROM public.research_categories WHERE slug = 'research-report';
    
    INSERT INTO public.research_reports (
        id, category_id, display_title, research_synopsis, 
        published_at, publish_status
    ) VALUES (
        '8a8fd497-bcec-460a-968f-644e08bd36ed',
        v_cat_id, 
        'Daily Market Report', 
        $email$Subject: Daily Market Report (24 June 2026)
Sender: Chapel Hill Denham Research <research@chapelhilldenham.com>
Received: 2026-06-24T18:59:40Z
Template status: Outlook body/template metadata only. Do not use as approved public website copy.

Body preview:
Money Market
Today, the OPR rate remained flat at 22.00%, while the O/N rate decreased by 18bps to close at 22.15%. System liquidity decreased significantly as bank balances closed in a net long position of N3.82tn from a net long position of N6.14tn.$email$,
        cast('2026-06-24' as timestamptz), 
        'review'
    ) ON CONFLICT DO NOTHING;
END $$;

DO $$
DECLARE
    v_cat_id uuid;
BEGIN
    SELECT id INTO v_cat_id FROM public.research_categories WHERE slug = 'research-report';
    
    INSERT INTO public.research_reports (
        id, category_id, display_title, research_synopsis, 
        published_at, publish_status
    ) VALUES (
        '4edd3fa4-5026-45c7-a5de-f455d72f65a5',
        v_cat_id, 
        'Daily Market Report', 
        $email$Subject: Daily Market Report (23 June 2026)
Sender: Chapel Hill Denham Research <research@chapelhilldenham.com>
Received: 2026-06-23T19:55:35Z
Template status: Outlook body/template metadata only. Do not use as approved public website copy.

Body preview:
Money Market
Today, the OPR rate remained flat at 22.00%, while the O/N rate increased by 1bp to close at 22.33%. System liquidity increased significantly as bank balances closed in a net long position.$email$,
        cast('2026-06-23' as timestamptz), 
        'review'
    ) ON CONFLICT DO NOTHING;
END $$;

DO $$
DECLARE
    v_cat_id uuid;
BEGIN
    SELECT id INTO v_cat_id FROM public.research_categories WHERE slug = 'research-report';
    
    INSERT INTO public.research_reports (
        id, category_id, display_title, research_synopsis, 
        published_at, publish_status
    ) VALUES (
        '6769761e-3bac-4775-8f8d-b10b034d494a',
        v_cat_id, 
        'Daily Market Report', 
        $email$Subject: Daily Market Report (22 June 2026)
Sender: Chapel Hill Denham Research <research@chapelhilldenham.com>
Received: 2026-06-22T19:36:13Z
Template status: Outlook body/template metadata only. Do not use as approved public website copy.

Body preview:
Money Market
Today, the OPR rate remained flat at 22.00%, while the O/N rate increased by 12bps to close at 22.32%. System liquidity increased significantly as bank balances closed in a net long position.$email$,
        cast('2026-06-22' as timestamptz), 
        'review'
    ) ON CONFLICT DO NOTHING;
END $$;

DO $$
DECLARE
    v_cat_id uuid;
BEGIN
    SELECT id INTO v_cat_id FROM public.research_categories WHERE slug = 'research-report';
    
    INSERT INTO public.research_reports (
        id, category_id, display_title, research_synopsis, 
        published_at, publish_status
    ) VALUES (
        'c2360bf8-0343-49e7-9eab-f5e499503f67',
        v_cat_id, 
        'Daily Market Report', 
        $email$Subject: Daily Market Report (19 June 2026)
Sender: Chapel Hill Denham Research <research@chapelhilldenham.com>
Received: 2026-06-19T18:49:43Z
Template status: Outlook body/template metadata only. Do not use as approved public website copy.

Body preview:
Money Market
Today, the OPR rate remained flat at 22.00%, while the O/N rate increased by 1bp to close at 22.20%. System liquidity decreased significantly as bank balances closed in a net long position.$email$,
        cast('2026-06-19' as timestamptz), 
        'review'
    ) ON CONFLICT DO NOTHING;
END $$;

DO $$
DECLARE
    v_cat_id uuid;
BEGIN
    SELECT id INTO v_cat_id FROM public.research_categories WHERE slug = 'research-report';
    
    INSERT INTO public.research_reports (
        id, category_id, display_title, research_synopsis, 
        published_at, publish_status
    ) VALUES (
        'fe6a89a5-735c-479e-91d9-5b0b774f61f0',
        v_cat_id, 
        'Daily Market Report', 
        $email$Subject: Daily Market Report (18 June 2026)
Sender: Chapel Hill Denham Research <research@chapelhilldenham.com>
Received: 2026-06-18T18:29:30Z
Template status: Outlook body/template metadata only. Do not use as approved public website copy.

Body preview:
Money Market
Today, the OPR rate remained flat at 22.00%, while the O/N rate increased by 3bps to close at 22.19%. System liquidity increased as bank balances closed in a net long position.$email$,
        cast('2026-06-18' as timestamptz), 
        'review'
    ) ON CONFLICT DO NOTHING;
END $$;

DO $$
DECLARE
    v_cat_id uuid;
BEGIN
    SELECT id INTO v_cat_id FROM public.research_categories WHERE slug = 'research-report';
    
    INSERT INTO public.research_reports (
        id, category_id, display_title, research_synopsis, 
        published_at, publish_status
    ) VALUES (
        'fae5daa9-850b-4706-9339-cc23b96ee7c4',
        v_cat_id, 
        'Daily Market Report', 
        $email$Subject: Daily Market Report (17 June 2026)
Sender: Chapel Hill Denham Research <research@chapelhilldenham.com>
Received: 2026-06-17T19:49:02Z
Template status: Outlook body/template metadata only. Do not use as approved public website copy.

Body preview:
Money Market
Today, the OPR rate remained flat at 22.00%, while the O/N rate increased by 5bps to close at 22.21%. System liquidity increased as bank balances closed in a net long position.$email$,
        cast('2026-06-17' as timestamptz), 
        'review'
    ) ON CONFLICT DO NOTHING;
END $$;

DO $$
DECLARE
    v_cat_id uuid;
BEGIN
    SELECT id INTO v_cat_id FROM public.research_categories WHERE slug = 'research-report';
    
    INSERT INTO public.research_reports (
        id, category_id, display_title, research_synopsis, 
        published_at, publish_status
    ) VALUES (
        'd9ec6fb8-1367-4942-946c-b16e1a1bdae6',
        v_cat_id, 
        'Daily Market Report', 
        $email$Subject: Daily Market Report (16 June 2026)
Sender: Chapel Hill Denham Research <research@chapelhilldenham.com>
Received: 2026-06-16T19:00:46Z
Template status: Outlook body/template metadata only. Do not use as approved public website copy.

Body preview:
Money Market
Today, the OPR rate remained flat at 22.00%, while the O/N rate increased by 3bps to close at 22.26%. System liquidity increased as bank balances closed in a net long position.$email$,
        cast('2026-06-16' as timestamptz), 
        'review'
    ) ON CONFLICT DO NOTHING;
END $$;

DO $$
DECLARE
    v_cat_id uuid;
BEGIN
    SELECT id INTO v_cat_id FROM public.research_categories WHERE slug = 'research-report';
    
    INSERT INTO public.research_reports (
        id, category_id, display_title, research_synopsis, 
        published_at, publish_status
    ) VALUES (
        'ceb1b742-8ef0-487c-8bf8-e0cf10139c50',
        v_cat_id, 
        'Daily Market Report', 
        $email$Subject: Daily Market Report (15 June 2026)
Sender: Chapel Hill Denham Research <research@chapelhilldenham.com>
Received: 2026-06-15T17:35:47Z
Template status: Outlook body/template metadata only. Do not use as approved public website copy.

Body preview:
Money Market
Today, the OPR rate remained flat at 22.00%, while the O/N rate increased by 7bps to close at 22.23%. System liquidity decreased as bank balances closed in a net long position.$email$,
        cast('2026-06-15' as timestamptz), 
        'review'
    ) ON CONFLICT DO NOTHING;
END $$;

DO $$
DECLARE
    v_cat_id uuid;
BEGIN
    SELECT id INTO v_cat_id FROM public.research_categories WHERE slug = 'research-report';
    
    INSERT INTO public.research_reports (
        id, category_id, display_title, research_synopsis, 
        published_at, publish_status
    ) VALUES (
        '22cdf67a-afc0-4d84-b375-112afd6ab2f3',
        v_cat_id, 
        'Daily Market Report', 
        $email$Subject: Daily Market Report (11 June 2026)
Sender: Chapel Hill Denham Research <research@chapelhilldenham.com>
Received: 2026-06-11T17:09:23Z
Template status: Outlook body/template metadata only. Do not use as approved public website copy.

Body preview:
Money Market
Today, the OPR rate remained flat at 22.00%, while the O/N rate increased by 12bps to close at 22.16%. System liquidity decreased as bank balances closed in a net long position.$email$,
        cast('2026-06-11' as timestamptz), 
        'review'
    ) ON CONFLICT DO NOTHING;
END $$;

DO $$
DECLARE
    v_cat_id uuid;
BEGIN
    SELECT id INTO v_cat_id FROM public.research_categories WHERE slug = 'research-report';
    
    INSERT INTO public.research_reports (
        id, category_id, display_title, research_synopsis, 
        published_at, publish_status
    ) VALUES (
        '1a93d694-8f3a-4a33-9623-fd0f4f6afed9',
        v_cat_id, 
        'Daily Market Report', 
        $email$Subject: Daily Market Report (10 June 2026)
Sender: Chapel Hill Denham Research <research@chapelhilldenham.com>
Received: 2026-06-10T18:40:25Z
Template status: Outlook body/template metadata only. Do not use as approved public website copy.

Body preview:
Money Market
Today, the OPR rate remained flat at 22.00%, while the O/N rate decreased by 10bps to close at 22.04%. System liquidity increased as bank balances closed in a net long position.$email$,
        cast('2026-06-10' as timestamptz), 
        'review'
    ) ON CONFLICT DO NOTHING;
END $$;

DO $$
DECLARE
    v_cat_id uuid;
BEGIN
    SELECT id INTO v_cat_id FROM public.research_categories WHERE slug = 'research-report';
    
    INSERT INTO public.research_reports (
        id, category_id, display_title, research_synopsis, 
        published_at, publish_status
    ) VALUES (
        '05825341-adcd-41e3-a7d7-8362ea18ca4a',
        v_cat_id, 
        'Daily Market Report', 
        $email$Subject: Daily Market Report (08 June 2026)
Sender: Chapel Hill Denham Research <research@chapelhilldenham.com>
Received: 2026-06-08T17:27:34Z
Template status: Outlook body/template metadata only. Do not use as approved public website copy.

Body preview:
Money Market
Today, the OPR rate remained flat at 22.00%, while the O/N rate rose by 7bps to close at 22.17%. System liquidity decreased as bank balances closed in a net long position.$email$,
        cast('2026-06-08' as timestamptz), 
        'review'
    ) ON CONFLICT DO NOTHING;
END $$;

DO $$
DECLARE
    v_cat_id uuid;
BEGIN
    SELECT id INTO v_cat_id FROM public.research_categories WHERE slug = 'research-report';
    
    INSERT INTO public.research_reports (
        id, category_id, display_title, research_synopsis, 
        published_at, publish_status
    ) VALUES (
        '09914c1b-82b9-42d8-9c48-7eb63780612d',
        v_cat_id, 
        'Daily Market Report', 
        $email$Subject: Daily Market Report (04 June 2026)
Sender: Chapel Hill Denham Research <research@chapelhilldenham.com>
Received: 2026-06-04T17:22:47Z
Template status: Outlook body/template metadata only. Do not use as approved public website copy.

Body preview:
Money Market
Today, the OPR rate remained flat at 22.00%, while the O/N rate increased by 4bps to close at 22.15%. System liquidity decreased as bank balances closed in a net long position.$email$,
        cast('2026-06-04' as timestamptz), 
        'review'
    ) ON CONFLICT DO NOTHING;
END $$;

DO $$
DECLARE
    v_cat_id uuid;
BEGIN
    SELECT id INTO v_cat_id FROM public.research_categories WHERE slug = 'research-report';
    
    INSERT INTO public.research_reports (
        id, category_id, display_title, research_synopsis, 
        published_at, publish_status
    ) VALUES (
        'd6db5e44-b238-4a82-ac04-302245368019',
        v_cat_id, 
        'Daily Market Report', 
        $email$Subject: Daily Market Report (03 June 2026)
Sender: Chapel Hill Denham Research <research@chapelhilldenham.com>
Received: 2026-06-03T19:42:15Z
Template status: Outlook body/template metadata only. Do not use as approved public website copy.

Body preview:
Money Market
Today, the OPR rate remained flat at 22.00%, while the O/N rate increased by 3bps to close at 22.19%. System liquidity decreased as bank balances closed in a net long position.$email$,
        cast('2026-06-03' as timestamptz), 
        'review'
    ) ON CONFLICT DO NOTHING;
END $$;

DO $$
DECLARE
    v_cat_id uuid;
BEGIN
    SELECT id INTO v_cat_id FROM public.research_categories WHERE slug = 'research-report';
    
    INSERT INTO public.research_reports (
        id, category_id, display_title, research_synopsis, 
        published_at, publish_status
    ) VALUES (
        '6899af33-05b1-48d8-ad5f-f2c9d6626749',
        v_cat_id, 
        'Daily Market Report', 
        $email$Subject: Daily Market Report (02 June 2026)
Sender: Chapel Hill Denham Research <research@chapelhilldenham.com>
Received: 2026-06-02T17:34:34Z
Template status: Outlook body/template metadata only. Do not use as approved public website copy.

Body preview:
Money Market
Today, the OPR rate remained flat at 22.00%, while the O/N rate decreased by 7bps to close at 22.17%. System liquidity increased as bank balances closed in a net long position.$email$,
        cast('2026-06-02' as timestamptz), 
        'review'
    ) ON CONFLICT DO NOTHING;
END $$;

DO $$
DECLARE
    v_cat_id uuid;
BEGIN
    SELECT id INTO v_cat_id FROM public.research_categories WHERE slug = 'research-report';
    
    INSERT INTO public.research_reports (
        id, category_id, display_title, research_synopsis, 
        published_at, publish_status
    ) VALUES (
        '2547a098-4c40-4003-8b7b-13ef440a55c6',
        v_cat_id, 
        'Daily Market Report', 
        $email$Subject: Daily Market Report (01 June 2026)
Sender: Chapel Hill Denham Research <research@chapelhilldenham.com>
Received: 2026-06-01T17:37:20Z
Template status: Outlook body/template metadata only. Do not use as approved public website copy.

Body preview:
Money Market
Today, the OPR rate remained flat at 22.00%, while the O/N rate increased by 5bps to close at 22.24%. System liquidity decreased as bank balances closed in a net long position.$email$,
        cast('2026-06-01' as timestamptz), 
        'review'
    ) ON CONFLICT DO NOTHING;
END $$;

DO $$
DECLARE
    v_cat_id uuid;
BEGIN
    SELECT id INTO v_cat_id FROM public.research_categories WHERE slug = 'research-report';
    
    INSERT INTO public.research_reports (
        id, category_id, display_title, research_synopsis, 
        published_at, publish_status
    ) VALUES (
        '9d522ec2-8856-4afa-b8a8-e8dda9416016',
        v_cat_id, 
        'West Africa Weekly Market Report', 
        $email$Source: Outlook email body preview/template metadata only.
Subject: West Africa Weekly Market Report (22 June, 2026)
Sender: Chapel Hill Denham Research <research@chapelhilldenham.com>
Received: 2026-06-22T15:49:44Z

Body preview:
Body preview was not available in the retained search result. Subject, sender, received date, and attachment metadata were captured for review.

Do not treat this text as approved public website copy.$email$,
        cast('2026-06-22' as timestamptz), 
        'review'
    ) ON CONFLICT DO NOTHING;
END $$;

DO $$
DECLARE
    v_cat_id uuid;
BEGIN
    SELECT id INTO v_cat_id FROM public.research_categories WHERE slug = 'research-report';
    
    INSERT INTO public.research_reports (
        id, category_id, display_title, research_synopsis, 
        published_at, publish_status
    ) VALUES (
        'e7e45424-a569-4653-b014-fb2c594fbc61',
        v_cat_id, 
        'West Africa Weekly Market Report', 
        $email$Source: Outlook email body preview/template metadata only.
Subject: West Africa Weekly Market Report (15 June, 2026)
Sender: Chapel Hill Denham Research <research@chapelhilldenham.com>
Received: 2026-06-15T14:54:19Z

Body preview:
Body preview was not available in the retained search result. Subject, sender, received date, and attachment metadata were captured for review.

Do not treat this text as approved public website copy.$email$,
        cast('2026-06-15' as timestamptz), 
        'review'
    ) ON CONFLICT DO NOTHING;
END $$;

DO $$
DECLARE
    v_cat_id uuid;
BEGIN
    SELECT id INTO v_cat_id FROM public.research_categories WHERE slug = 'research-report';
    
    INSERT INTO public.research_reports (
        id, category_id, display_title, research_synopsis, 
        published_at, publish_status
    ) VALUES (
        '1f35b446-9d4e-4e9c-9e49-17ebb999b49c',
        v_cat_id, 
        'West Africa Weekly Market Report', 
        $email$Source: Outlook email body preview/template metadata only.
Subject: West Africa Weekly Market Report (08 June, 2026)
Sender: Chapel Hill Denham Research <research@chapelhilldenham.com>
Received: 2026-06-08T17:09:31Z

Body preview:
Body preview was not available in the retained search result. Subject, sender, received date, and attachment metadata were captured for review.

Do not treat this text as approved public website copy.$email$,
        cast('2026-06-08' as timestamptz), 
        'review'
    ) ON CONFLICT DO NOTHING;
END $$;

DO $$
DECLARE
    v_cat_id uuid;
BEGIN
    SELECT id INTO v_cat_id FROM public.research_categories WHERE slug = 'research-report';
    
    INSERT INTO public.research_reports (
        id, category_id, display_title, research_synopsis, 
        published_at, publish_status
    ) VALUES (
        '613ad600-36f8-41bd-92e7-b0d95536a2c9',
        v_cat_id, 
        'West Africa Weekly Market Report', 
        $email$Source: Outlook email body preview/template metadata only.
Subject: West Africa Weekly Market Report (01 June, 2026)
Sender: Chapel Hill Denham Research <research@chapelhilldenham.com>
Received: 2026-06-01T14:18:44Z

Body preview:
Body preview was not available in the retained search result. Subject, sender, received date, and attachment metadata were captured for review.

Do not treat this text as approved public website copy.$email$,
        cast('2026-06-01' as timestamptz), 
        'review'
    ) ON CONFLICT DO NOTHING;
END $$;

DO $$
DECLARE
    v_cat_id uuid;
BEGIN
    SELECT id INTO v_cat_id FROM public.research_categories WHERE slug = 'research-report';
    
    INSERT INTO public.research_reports (
        id, category_id, display_title, research_synopsis, 
        published_at, publish_status
    ) VALUES (
        'd9f5ff51-3d3d-44e7-93ad-6eb50b05888c',
        v_cat_id, 
        'Daily Market Summary', 
        $email$Source: Outlook email body preview/template metadata only.
Subject: Daily Market Summary (June 24, 2026)
Sender: Chapel Hill Denham Research <research@chapelhilldenham.com>
Received: 2026-06-24T15:46:15Z

Body preview:
Body preview was not available in the retained search result. Attachment metadata identified an Excel pricelist: 24 June Pricelist.xlsx.

Do not treat this text as approved public website copy.$email$,
        cast('2026-06-24' as timestamptz), 
        'review'
    ) ON CONFLICT DO NOTHING;
END $$;

DO $$
DECLARE
    v_cat_id uuid;
BEGIN
    SELECT id INTO v_cat_id FROM public.research_categories WHERE slug = 'research-report';
    
    INSERT INTO public.research_reports (
        id, category_id, display_title, research_synopsis, 
        published_at, publish_status
    ) VALUES (
        'c8f0baca-5ea1-4ac5-96ea-e3f3a95645d4',
        v_cat_id, 
        'Daily Market Summary', 
        $email$Source: Outlook email body preview/template metadata only.
Subject: Daily Market Summary (June 23, 2026)
Sender: Chapel Hill Denham Research <research@chapelhilldenham.com>
Received: 2026-06-23T15:30:31Z

Body preview:
Body preview was not available in the retained search result. Search result identified this as a Research-team daily market summary with attachments; pricelist filename follows the recurring daily pattern but needs reviewer confirmation.

Do not treat this text as approved public website copy.$email$,
        cast('2026-06-23' as timestamptz), 
        'review'
    ) ON CONFLICT DO NOTHING;
END $$;

DO $$
DECLARE
    v_cat_id uuid;
BEGIN
    SELECT id INTO v_cat_id FROM public.research_categories WHERE slug = 'research-report';
    
    INSERT INTO public.research_reports (
        id, category_id, display_title, research_synopsis, 
        published_at, publish_status
    ) VALUES (
        '55e80c3b-76e8-455a-8603-87985d2ccb2e',
        v_cat_id, 
        'Ghanaian Daily Market Summary', 
        $email$Source: Outlook email body preview/template metadata only.
Subject: Ghanaian Daily Market Summary (June 24, 2026)
Sender: Chapel Hill Denham Research <research@chapelhilldenham.com>
Received: 2026-06-24T16:23:52Z

Body preview:
Body preview was not available in the retained search result. Attachment metadata identified an Excel pricelist: Pricelist 24 June 2026.xlsx.

Do not treat this text as approved public website copy.$email$,
        cast('2026-06-24' as timestamptz), 
        'review'
    ) ON CONFLICT DO NOTHING;
END $$;

DO $$
DECLARE
    v_cat_id uuid;
BEGIN
    SELECT id INTO v_cat_id FROM public.research_categories WHERE slug = 'research-report';
    
    INSERT INTO public.research_reports (
        id, category_id, display_title, research_synopsis, 
        published_at, publish_status
    ) VALUES (
        '04202710-92e7-43c5-a0ad-4f058ed04271',
        v_cat_id, 
        'Ghanaian Daily Market Summary', 
        $email$Source: Outlook email body preview/template metadata only.
Subject: Ghanaian Daily Market Summary (June 23, 2026)
Sender: Chapel Hill Denham Research <research@chapelhilldenham.com>
Received: 2026-06-23T16:58:37Z

Body preview:
Body preview was not available in the retained search result. Search result identified this as a Research-team Ghanaian daily market summary with attachments; pricelist filename follows the recurring daily pattern but needs reviewer confirmation.

Do not treat this text as approved public website copy.$email$,
        cast('2026-06-23' as timestamptz), 
        'review'
    ) ON CONFLICT DO NOTHING;
END $$;

DO $$
DECLARE
    v_cat_id uuid;
BEGIN
    SELECT id INTO v_cat_id FROM public.research_categories WHERE slug = 'research-report';
    
    INSERT INTO public.research_reports (
        id, category_id, display_title, research_synopsis, 
        published_at, publish_status
    ) VALUES (
        '7c454687-7def-45df-832d-a32c71704249',
        v_cat_id, 
        'Nigeria Corporate Action Tracker', 
        $email$Source: Outlook email body preview/template metadata only.
Subject: N15.55bn expected in dividend payments this week
Sender: Chapel Hill Denham Research <research@chapelhilldenham.com>
Received: 2026-06-22T10:47:40Z

Body preview:
N15.55bn expected in dividend payments this week. Last week, SEPLAT, HMCALL, JBERGER, UH REIT and CILEASING paid a total of N82.30bn in dividends based on their various FY-25 and...

Do not treat this text as approved public website copy.$email$,
        cast('2026-06-22' as timestamptz), 
        'review'
    ) ON CONFLICT DO NOTHING;
END $$;

DO $$
DECLARE
    v_cat_id uuid;
BEGIN
    SELECT id INTO v_cat_id FROM public.research_categories WHERE slug = 'research-report';
    
    INSERT INTO public.research_reports (
        id, category_id, display_title, research_synopsis, 
        published_at, publish_status
    ) VALUES (
        '9280aeae-743a-4558-a019-e15339b72fad',
        v_cat_id, 
        'Nigeria Corporate Action Tracker', 
        $email$Source: Outlook email body preview/template metadata only.
Subject: N3.00bn expected in dividend payments this week
Sender: Chapel Hill Denham Research <research@chapelhilldenham.com>
Received: 2026-06-08T11:00:39Z

Body preview:
N3.00bn expected in dividend payments this week. Last week, AIICO, MAYBAKER and IKEJAHOTEL paid a total of N5.32bn in dividends based on their FY-25 and Q1-26 results, respectively...

Do not treat this text as approved public website copy.$email$,
        cast('2026-06-08' as timestamptz), 
        'review'
    ) ON CONFLICT DO NOTHING;
END $$;

DO $$
DECLARE
    v_cat_id uuid;
BEGIN
    SELECT id INTO v_cat_id FROM public.research_categories WHERE slug = 'research-report';
    
    INSERT INTO public.research_reports (
        id, category_id, display_title, research_synopsis, 
        published_at, publish_status
    ) VALUES (
        'e4ec01b4-af7f-4b07-aba5-b6e103f1fff9',
        v_cat_id, 
        'Nigeria Corporate Action Tracker', 
        $email$Source: Outlook email body preview/template metadata only.
Subject: N5.32bn expected in dividend payments this week
Sender: Chapel Hill Denham Research <research@chapelhilldenham.com>
Received: 2026-06-01T09:34:31Z

Body preview:
N5.32bn expected in dividend payments this week. Last week, STANBIC, SEPLAT, OKOMUOIL, VFDGROUP, ABBEYBDS and MEYER paid a total of N150.80bn in dividends based on their FY-25...

Do not treat this text as approved public website copy.$email$,
        cast('2026-06-01' as timestamptz), 
        'review'
    ) ON CONFLICT DO NOTHING;
END $$;
