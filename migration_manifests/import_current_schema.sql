-- Insert Categories
INSERT INTO public.research_categories (name, slug) VALUES ('sector', 'sector') ON CONFLICT DO NOTHING;
INSERT INTO public.research_categories (name, slug) VALUES ('fixed-income', 'fixed-income') ON CONFLICT DO NOTHING;
INSERT INTO public.research_categories (name, slug) VALUES ('research-report', 'research-report') ON CONFLICT DO NOTHING;
INSERT INTO public.research_categories (name, slug) VALUES ('equity-research', 'equity-research') ON CONFLICT DO NOTHING;
INSERT INTO public.research_categories (name, slug) VALUES ('sector-research', 'sector-research') ON CONFLICT DO NOTHING;
-- Insert Analysts
INSERT INTO public.analysts (full_name, slug, title, bio, email, avatar_url, is_active) VALUES ('Tajudeen Ibrahim', 'tajudeen-ibrahim', 'Director, Research', 'Tajudeen Ibrahim leads the research function and coordinates coverage priorities across Chapel Hill Denham''s institutional research platform. His work focuses on telecommunications, market strategy and the interpretation of sector developments for investor decision-making.', NULL, 'public_assets/analysts/tajudeen-ibrahim.jpg', true) ON CONFLICT (slug) DO UPDATE SET full_name = EXCLUDED.full_name;
INSERT INTO public.analysts (full_name, slug, title, bio, email, avatar_url, is_active) VALUES ('Nabila Mohammed', 'nabila-mohammed', 'Analyst', 'Nabila Mohammed covers financial services, with emphasis on bank earnings, balance-sheet trends, capital adequacy and sector regulation. Her research supports institutional clients with concise analysis of valuation drivers and operating performance.', NULL, 'public_assets/analysts/nabila-mohammed.jpg', true) ON CONFLICT (slug) DO UPDATE SET full_name = EXCLUDED.full_name;
INSERT INTO public.analysts (full_name, slug, title, bio, email, avatar_url, is_active) VALUES ('Gideon Oshadumi', 'gideon-oshadumi', 'Analyst', 'Gideon Oshadumi covers cement and selected financial-services names, focusing on earnings quality, pricing trends, cost pressures and balance-sheet resilience. His work combines company analysis with sector context for actionable research views.', NULL, 'public_assets/analysts/gideon-oshadumi.jpg', true) ON CONFLICT (slug) DO UPDATE SET full_name = EXCLUDED.full_name;
INSERT INTO public.analysts (full_name, slug, title, bio, email, avatar_url, is_active) VALUES ('Boluwatife Ishola', 'boluwatife-ishola', 'Analyst', 'Boluwatife Ishola covers FMCG and agriculture-linked equities, tracking consumer demand, pricing power, input costs and margin trends. Her research focuses on the operating factors shaping listed companies in Nigeria''s consumer economy.', NULL, 'public_assets/analysts/boluwatife-ishola.jpg', true) ON CONFLICT (slug) DO UPDATE SET full_name = EXCLUDED.full_name;
INSERT INTO public.analysts (full_name, slug, title, bio, email, avatar_url, is_active) VALUES ('Bolade Agboola', 'bolade-agboola', 'Analyst', 'Bolade Agboola supports coverage across oil & gas and FMCG, with a focus on market developments, company fundamentals and sector themes. Her work contributes to timely research notes and the broader Chapel Hill Denham house view.', NULL, 'public_assets/analysts/bolade-agboola.jpg', true) ON CONFLICT (slug) DO UPDATE SET full_name = EXCLUDED.full_name;
INSERT INTO public.analysts (full_name, slug, title, bio, email, avatar_url, is_active) VALUES ('Chapel Hill Denham Research', 'chapel-hill-denham-research', 'Department Research / Routine Research', 'The House View represents Chapel Hill Denham Research''s consolidated perspective across equity, macroeconomic, sector and market strategy coverage. It is used where a report reflects the desk''s institutional view rather than a single named analyst.', NULL, NULL, true) ON CONFLICT (slug) DO UPDATE SET full_name = EXCLUDED.full_name;
-- Insert Reports

        DO $$
        DECLARE
            v_category_id uuid;
            v_report_id uuid;
        BEGIN
            SELECT id INTO v_category_id FROM public.research_categories WHERE slug = 'sector';
            
            INSERT INTO public.research_reports (
                category_id, display_title, short_summary, research_synopsis, publish_status, published_at
            ) VALUES (
                v_category_id,
                'Downstream Sector 2025: Pricing Reform Creates New Winners',
                NULL,
                NULL,
                'review',
                '2025-01-21 09:00:00'
            )
            RETURNING id INTO v_report_id;
        END $$;

        DO $$
        DECLARE
            v_category_id uuid;
            v_report_id uuid;
        BEGIN
            SELECT id INTO v_category_id FROM public.research_categories WHERE slug = 'fixed-income';
            
            INSERT INTO public.research_reports (
                category_id, display_title, short_summary, research_synopsis, publish_status, published_at
            ) VALUES (
                v_category_id,
                '2025 Debt TAI',
                'Legacy fixed income document staged for manual review: 2025 Debt TAI.',
                'This legacy research document has been staged from extractable document text and filename. The draft title and category require reviewer validation before any upload, access change, or publication decision. Topic cue: 2025 Debt TAI.',
                'published',
                '2025-09-11'
            )
            RETURNING id INTO v_report_id;
        END $$;

        DO $$
        DECLARE
            v_category_id uuid;
            v_report_id uuid;
        BEGIN
            SELECT id INTO v_category_id FROM public.research_categories WHERE slug = 'research-report';
            
            INSERT INTO public.research_reports (
                category_id, display_title, short_summary, research_synopsis, publish_status, published_at
            ) VALUES (
                v_category_id,
                'Accesscorp Company Update 2025',
                'Legacy research report document staged for manual review: Accesscorp Company Update 2025.',
                'This legacy research document has been staged from extractable document text and filename. The draft title and category require reviewer validation before any upload, access change, or publication decision. Topic cue: Accesscorp Company Update 2025.',
                'published',
                '2025-11-14'
            )
            RETURNING id INTO v_report_id;
        END $$;

        DO $$
        DECLARE
            v_category_id uuid;
            v_report_id uuid;
        BEGIN
            SELECT id INTO v_category_id FROM public.research_categories WHERE slug = 'equity-research';
            
            INSERT INTO public.research_reports (
                category_id, display_title, short_summary, research_synopsis, publish_status, published_at
            ) VALUES (
                v_category_id,
                'Airtel Africa Plc Company Research Update',
                'Legacy equity research document staged for manual review: Airtel Africa Plc Company Research Update.',
                'This legacy research document has been staged from extractable document text and filename. The draft title and category require reviewer validation before any upload, access change, or publication decision. Topic cue: Airtel Africa Plc Company Research Update.',
                'published',
                '2025-05-16'
            )
            RETURNING id INTO v_report_id;
        END $$;

        DO $$
        DECLARE
            v_category_id uuid;
            v_report_id uuid;
        BEGIN
            SELECT id INTO v_category_id FROM public.research_categories WHERE slug = 'sector-research';
            
            INSERT INTO public.research_reports (
                category_id, display_title, short_summary, research_synopsis, publish_status, published_at
            ) VALUES (
                v_category_id,
                'Dangote Cement 9M - 24 Initial Comment',
                'Legacy sector research document staged for manual review: Dangote Cement 9M - 24 Initial Comment.',
                'This legacy research document has been staged from extractable document text and filename. The draft title and category require reviewer validation before any upload, access change, or publication decision. Topic cue: Dangote Cement 9M - 24 Initial Comment.',
                'published',
                '2024-10-29'
            )
            RETURNING id INTO v_report_id;
        END $$;

        DO $$
        DECLARE
            v_category_id uuid;
            v_report_id uuid;
        BEGIN
            SELECT id INTO v_category_id FROM public.research_categories WHERE slug = 'equity-research';
            
            INSERT INTO public.research_reports (
                category_id, display_title, short_summary, research_synopsis, publish_status, published_at
            ) VALUES (
                v_category_id,
                'Dangote Cement Plc FY - 25 Company Update (1)',
                'Legacy equity research document staged for manual review: Dangote Cement Plc FY - 25 Company Update (1).',
                'This legacy research document has been staged from extractable document text and filename. The draft title and category require reviewer validation before any upload, access change, or publication decision. Topic cue: Dangote Cement Plc FY - 25 Company Update (1).',
                'published',
                '2026-03-16'
            )
            RETURNING id INTO v_report_id;
        END $$;

        DO $$
        DECLARE
            v_category_id uuid;
            v_report_id uuid;
        BEGIN
            SELECT id INTO v_category_id FROM public.research_categories WHERE slug = 'research-report';
            
            INSERT INTO public.research_reports (
                category_id, display_title, short_summary, research_synopsis, publish_status, published_at
            ) VALUES (
                v_category_id,
                'ETI H1 - 25 INITIAL COMMENTS',
                'Legacy research report document staged for manual review: ETI H1 - 25 INITIAL COMMENTS.',
                'This legacy research document has been staged from extractable document text and filename. The draft title and category require reviewer validation before any upload, access change, or publication decision. Topic cue: ETI H1 - 25 INITIAL COMMENTS.',
                'review',
                '2025-07-29'
            )
            RETURNING id INTO v_report_id;
        END $$;

        DO $$
        DECLARE
            v_category_id uuid;
            v_report_id uuid;
        BEGIN
            SELECT id INTO v_category_id FROM public.research_categories WHERE slug = 'research-report';
            
            INSERT INTO public.research_reports (
                category_id, display_title, short_summary, research_synopsis, publish_status, published_at
            ) VALUES (
                v_category_id,
                'FCMB Initial Comments FY - 24',
                'Legacy research report document staged for manual review: FCMB Initial Comments FY - 24.',
                'This legacy research document has been staged from extractable document text and filename. The draft title and category require reviewer validation before any upload, access change, or publication decision. Topic cue: FCMB Initial Comments FY - 24.',
                'review',
                '2025-01-30'
            )
            RETURNING id INTO v_report_id;
        END $$;

        DO $$
        DECLARE
            v_category_id uuid;
            v_report_id uuid;
        BEGIN
            SELECT id INTO v_category_id FROM public.research_categories WHERE slug = 'research-report';
            
            INSERT INTO public.research_reports (
                category_id, display_title, short_summary, research_synopsis, publish_status, published_at
            ) VALUES (
                v_category_id,
                'Fidelity FY - 24 INITIAL COMMENTS',
                'Legacy research report document staged for manual review: Fidelity FY - 24 INITIAL COMMENTS.',
                'This legacy research document has been staged from extractable document text and filename. The draft title and category require reviewer validation before any upload, access change, or publication decision. Topic cue: Fidelity FY - 24 INITIAL COMMENTS.',
                'review',
                '2025-04-02'
            )
            RETURNING id INTO v_report_id;
        END $$;

        DO $$
        DECLARE
            v_category_id uuid;
            v_report_id uuid;
        BEGIN
            SELECT id INTO v_category_id FROM public.research_categories WHERE slug = 'equity-research';
            
            INSERT INTO public.research_reports (
                category_id, display_title, short_summary, research_synopsis, publish_status, published_at
            ) VALUES (
                v_category_id,
                'First holdco H1 25 results',
                'Legacy equity research document staged for manual review: First holdco H1 25 results.',
                'This legacy research document has been staged from extractable document text and filename. The draft title and category require reviewer validation before any upload, access change, or publication decision. Topic cue: First holdco H1 25 results.',
                'review',
                '2025-07-30'
            )
            RETURNING id INTO v_report_id;
        END $$;

        DO $$
        DECLARE
            v_category_id uuid;
            v_report_id uuid;
        BEGIN
            SELECT id INTO v_category_id FROM public.research_categories WHERE slug = 'research-report';
            
            INSERT INTO public.research_reports (
                category_id, display_title, short_summary, research_synopsis, publish_status, published_at
            ) VALUES (
                v_category_id,
                'GTCO FY 25 Initial Comments',
                'Legacy research report document staged for manual review: GTCO FY 25 Initial Comments.',
                'This legacy research document has been staged from extractable document text and filename. The draft title and category require reviewer validation before any upload, access change, or publication decision. Topic cue: GTCO FY 25 Initial Comments.',
                'review',
                '2026-04-01'
            )
            RETURNING id INTO v_report_id;
        END $$;

        DO $$
        DECLARE
            v_category_id uuid;
            v_report_id uuid;
        BEGIN
            SELECT id INTO v_category_id FROM public.research_categories WHERE slug = 'research-report';
            
            INSERT INTO public.research_reports (
                category_id, display_title, short_summary, research_synopsis, publish_status, published_at
            ) VALUES (
                v_category_id,
                'GTCO H1 - 25 Initial Comments',
                'Legacy research report document staged for manual review: GTCO H1 - 25 Initial Comments.',
                'This legacy research document has been staged from extractable document text and filename. The draft title and category require reviewer validation before any upload, access change, or publication decision. Topic cue: GTCO H1 - 25 Initial Comments.',
                'review',
                '2025-09-23'
            )
            RETURNING id INTO v_report_id;
        END $$;

        DO $$
        DECLARE
            v_category_id uuid;
            v_report_id uuid;
        BEGIN
            SELECT id INTO v_category_id FROM public.research_categories WHERE slug = 'equity-research';
            
            INSERT INTO public.research_reports (
                category_id, display_title, short_summary, research_synopsis, publish_status, published_at
            ) VALUES (
                v_category_id,
                'Lafarge Africa Plc Q1 - 25 INITIAL COMMENTS',
                'Legacy equity research document staged for manual review: Lafarge Africa Plc Q1 - 25 INITIAL COMMENTS.',
                'This legacy research document has been staged from extractable document text and filename. The draft title and category require reviewer validation before any upload, access change, or publication decision. Topic cue: Lafarge Africa Plc Q1 - 25 INITIAL COMMENTS.',
                'review',
                '2025-04-25'
            )
            RETURNING id INTO v_report_id;
        END $$;

        DO $$
        DECLARE
            v_category_id uuid;
            v_report_id uuid;
        BEGIN
            SELECT id INTO v_category_id FROM public.research_categories WHERE slug = 'equity-research';
            
            INSERT INTO public.research_reports (
                category_id, display_title, short_summary, research_synopsis, publish_status, published_at
            ) VALUES (
                v_category_id,
                'MTN Nigeria Communications PLC Initial Comments',
                'Legacy equity research document staged for manual review: MTN Nigeria Communications PLC Initial Comments.',
                'This legacy research document has been staged from extractable document text and filename. The draft title and category require reviewer validation before any upload, access change, or publication decision. Topic cue: MTN Nigeria Communications PLC Initial Comments.',
                'review',
                '2025-04-30'
            )
            RETURNING id INTO v_report_id;
        END $$;

        DO $$
        DECLARE
            v_category_id uuid;
            v_report_id uuid;
        BEGIN
            SELECT id INTO v_category_id FROM public.research_categories WHERE slug = 'research-report';
            
            INSERT INTO public.research_reports (
                category_id, display_title, short_summary, research_synopsis, publish_status, published_at
            ) VALUES (
                v_category_id,
                'Nestlé Company Update 2025',
                'Legacy research report document staged for manual review: Nestlé Company Update 2025.',
                'This legacy research document has been staged from extractable document text and filename. The draft title and category require reviewer validation before any upload, access change, or publication decision. Topic cue: Nestlé Company Update 2025.',
                'review',
                '2026-03-03'
            )
            RETURNING id INTO v_report_id;
        END $$;

        DO $$
        DECLARE
            v_category_id uuid;
            v_report_id uuid;
        BEGIN
            SELECT id INTO v_category_id FROM public.research_categories WHERE slug = 'equity-research';
            
            INSERT INTO public.research_reports (
                category_id, display_title, short_summary, research_synopsis, publish_status, published_at
            ) VALUES (
                v_category_id,
                'Nestlé Nigeria Plc 9M - 25 Initial Comments',
                'Legacy equity research document staged for manual review: Nestlé Nigeria Plc 9M - 25 Initial Comments.',
                'This legacy research document has been staged from extractable document text and filename. The draft title and category require reviewer validation before any upload, access change, or publication decision. Topic cue: Nestlé Nigeria Plc 9M - 25 Initial Comments.',
                'review',
                '2025-10-29'
            )
            RETURNING id INTO v_report_id;
        END $$;

        DO $$
        DECLARE
            v_category_id uuid;
            v_report_id uuid;
        BEGIN
            SELECT id INTO v_category_id FROM public.research_categories WHERE slug = 'equity-research';
            
            INSERT INTO public.research_reports (
                category_id, display_title, short_summary, research_synopsis, publish_status, published_at
            ) VALUES (
                v_category_id,
                'Okomu Oil Palm Plc 9M - 25 Initial Comments',
                'Legacy equity research document staged for manual review: Okomu Oil Palm Plc 9M - 25 Initial Comments.',
                'This legacy research document has been staged from extractable document text and filename. The draft title and category require reviewer validation before any upload, access change, or publication decision. Topic cue: Okomu Oil Palm Plc 9M - 25 Initial Comments.',
                'review',
                '2025-10-20'
            )
            RETURNING id INTO v_report_id;
        END $$;

        DO $$
        DECLARE
            v_category_id uuid;
            v_report_id uuid;
        BEGIN
            SELECT id INTO v_category_id FROM public.research_categories WHERE slug = 'equity-research';
            
            INSERT INTO public.research_reports (
                category_id, display_title, short_summary, research_synopsis, publish_status, published_at
            ) VALUES (
                v_category_id,
                'Okomu Oil Palm Plc FY - 25 Initial Comments',
                'Legacy equity research document staged for manual review: Okomu Oil Palm Plc FY - 25 Initial Comments.',
                'This legacy research document has been staged from extractable document text and filename. The draft title and category require reviewer validation before any upload, access change, or publication decision. Topic cue: Okomu Oil Palm Plc FY - 25 Initial Comments.',
                'review',
                '2026-02-02'
            )
            RETURNING id INTO v_report_id;
        END $$;

        DO $$
        DECLARE
            v_category_id uuid;
            v_report_id uuid;
        BEGIN
            SELECT id INTO v_category_id FROM public.research_categories WHERE slug = 'equity-research';
            
            INSERT INTO public.research_reports (
                category_id, display_title, short_summary, research_synopsis, publish_status, published_at
            ) VALUES (
                v_category_id,
                'Presco Plc FY - 25 Initial Comments',
                'Legacy equity research document staged for manual review: Presco Plc FY - 25 Initial Comments.',
                'This legacy research document has been staged from extractable document text and filename. The draft title and category require reviewer validation before any upload, access change, or publication decision. Topic cue: Presco Plc FY - 25 Initial Comments.',
                'review',
                '2026-02-02'
            )
            RETURNING id INTO v_report_id;
        END $$;

        DO $$
        DECLARE
            v_category_id uuid;
            v_report_id uuid;
        BEGIN
            SELECT id INTO v_category_id FROM public.research_categories WHERE slug = 'equity-research';
            
            INSERT INTO public.research_reports (
                category_id, display_title, short_summary, research_synopsis, publish_status, published_at
            ) VALUES (
                v_category_id,
                'Q1 - 25 Presco Company update',
                'Legacy equity research document staged for manual review: Q1 - 25 Presco Company update.',
                'This legacy research document has been staged from extractable document text and filename. The draft title and category require reviewer validation before any upload, access change, or publication decision. Topic cue: Q1 - 25 Presco Company update.',
                'review',
                '2025-05-23'
            )
            RETURNING id INTO v_report_id;
        END $$;

        DO $$
        DECLARE
            v_category_id uuid;
            v_report_id uuid;
        BEGIN
            SELECT id INTO v_category_id FROM public.research_categories WHERE slug = 'research-report';
            
            INSERT INTO public.research_reports (
                category_id, display_title, short_summary, research_synopsis, publish_status, published_at
            ) VALUES (
                v_category_id,
                'Seplat Initial Comments 9M - 2025',
                'Legacy research report document staged for manual review: Seplat Initial Comments 9M - 2025.',
                'This legacy research document has been staged from extractable document text and filename. The draft title and category require reviewer validation before any upload, access change, or publication decision. Topic cue: Seplat Initial Comments 9M - 2025.',
                'review',
                '2025-10-31'
            )
            RETURNING id INTO v_report_id;
        END $$;

        DO $$
        DECLARE
            v_category_id uuid;
            v_report_id uuid;
        BEGIN
            SELECT id INTO v_category_id FROM public.research_categories WHERE slug = 'research-report';
            
            INSERT INTO public.research_reports (
                category_id, display_title, short_summary, research_synopsis, publish_status, published_at
            ) VALUES (
                v_category_id,
                'Seplat Initial Comments FY - 2024',
                'Legacy research report document staged for manual review: Seplat Initial Comments FY - 2024.',
                'This legacy research document has been staged from extractable document text and filename. The draft title and category require reviewer validation before any upload, access change, or publication decision. Topic cue: Seplat Initial Comments FY - 2024.',
                'review',
                '2025-03-04'
            )
            RETURNING id INTO v_report_id;
        END $$;

        DO $$
        DECLARE
            v_category_id uuid;
            v_report_id uuid;
        BEGIN
            SELECT id INTO v_category_id FROM public.research_categories WHERE slug = 'research-report';
            
            INSERT INTO public.research_reports (
                category_id, display_title, short_summary, research_synopsis, publish_status, published_at
            ) VALUES (
                v_category_id,
                'Stanbic H1 25 Initial Comments',
                'Legacy research report document staged for manual review: Stanbic H1 25 Initial Comments.',
                'This legacy research document has been staged from extractable document text and filename. The draft title and category require reviewer validation before any upload, access change, or publication decision. Topic cue: Stanbic H1 25 Initial Comments.',
                'review',
                '2025-09-22'
            )
            RETURNING id INTO v_report_id;
        END $$;

        DO $$
        DECLARE
            v_category_id uuid;
            v_report_id uuid;
        BEGIN
            SELECT id INTO v_category_id FROM public.research_categories WHERE slug = 'research-report';
            
            INSERT INTO public.research_reports (
                category_id, display_title, short_summary, research_synopsis, publish_status, published_at
            ) VALUES (
                v_category_id,
                'UBA H1 - 25 Initial comments',
                'Legacy research report document staged for manual review: UBA H1 - 25 Initial comments.',
                'This legacy research document has been staged from extractable document text and filename. The draft title and category require reviewer validation before any upload, access change, or publication decision. Topic cue: UBA H1 - 25 Initial comments.',
                'review',
                '2025-09-19'
            )
            RETURNING id INTO v_report_id;
        END $$;

        DO $$
        DECLARE
            v_category_id uuid;
            v_report_id uuid;
        BEGIN
            SELECT id INTO v_category_id FROM public.research_categories WHERE slug = 'research-report';
            
            INSERT INTO public.research_reports (
                category_id, display_title, short_summary, research_synopsis, publish_status, published_at
            ) VALUES (
                v_category_id,
                'Zenith Bank Initial Comments H1 25',
                'Legacy research report document staged for manual review: Zenith Bank Initial Comments H1 25.',
                'This legacy research document has been staged from extractable document text and filename. The draft title and category require reviewer validation before any upload, access change, or publication decision. Topic cue: Zenith Bank Initial Comments H1 25.',
                'review',
                '2025-09-18'
            )
            RETURNING id INTO v_report_id;
        END $$;

        DO $$
        DECLARE
            v_category_id uuid;
            v_report_id uuid;
        BEGIN
            SELECT id INTO v_category_id FROM public.research_categories WHERE slug = 'research-report';
            
            INSERT INTO public.research_reports (
                category_id, display_title, short_summary, research_synopsis, publish_status, published_at
            ) VALUES (
                v_category_id,
                'Zenith FY - 25 Initial Comments NEW',
                'Legacy research report document staged for manual review: Zenith FY - 25 Initial Comments NEW.',
                'This legacy research document has been staged from extractable document text and filename. The draft title and category require reviewer validation before any upload, access change, or publication decision. Topic cue: Zenith FY - 25 Initial Comments NEW.',
                'review',
                '2026-04-07'
            )
            RETURNING id INTO v_report_id;
        END $$;

        DO $$
        DECLARE
            v_category_id uuid;
            v_report_id uuid;
        BEGIN
            SELECT id INTO v_category_id FROM public.research_categories WHERE slug = 'research-report';
            
            INSERT INTO public.research_reports (
                category_id, display_title, short_summary, research_synopsis, publish_status, published_at
            ) VALUES (
                v_category_id,
                'Daily Market Report (02 - 04 - 2025)',
                'Legacy research report document staged for manual review: Daily Market Report (02 - 04 - 2025).',
                'This legacy research document has been staged from extractable document text and filename. The draft title and category require reviewer validation before any upload, access change, or publication decision. Topic cue: Daily Market Report (02 - 04 - 2025).',
                'review',
                '2025-04-02'
            )
            RETURNING id INTO v_report_id;
        END $$;

        DO $$
        DECLARE
            v_category_id uuid;
            v_report_id uuid;
        BEGIN
            SELECT id INTO v_category_id FROM public.research_categories WHERE slug = 'research-report';
            
            INSERT INTO public.research_reports (
                category_id, display_title, short_summary, research_synopsis, publish_status, published_at
            ) VALUES (
                v_category_id,
                'Daily Market Report (03 - 04 - 2025)',
                'Legacy research report document staged for manual review: Daily Market Report (03 - 04 - 2025).',
                'This legacy research document has been staged from extractable document text and filename. The draft title and category require reviewer validation before any upload, access change, or publication decision. Topic cue: Daily Market Report (03 - 04 - 2025).',
                'review',
                '2025-04-03'
            )
            RETURNING id INTO v_report_id;
        END $$;

        DO $$
        DECLARE
            v_category_id uuid;
            v_report_id uuid;
        BEGIN
            SELECT id INTO v_category_id FROM public.research_categories WHERE slug = 'research-report';
            
            INSERT INTO public.research_reports (
                category_id, display_title, short_summary, research_synopsis, publish_status, published_at
            ) VALUES (
                v_category_id,
                'Daily Market Report (04 - 04 - 2025)',
                'Legacy research report document staged for manual review: Daily Market Report (04 - 04 - 2025).',
                'This legacy research document has been staged from extractable document text and filename. The draft title and category require reviewer validation before any upload, access change, or publication decision. Topic cue: Daily Market Report (04 - 04 - 2025).',
                'review',
                '2025-04-04'
            )
            RETURNING id INTO v_report_id;
        END $$;

        DO $$
        DECLARE
            v_category_id uuid;
            v_report_id uuid;
        BEGIN
            SELECT id INTO v_category_id FROM public.research_categories WHERE slug = 'research-report';
            
            INSERT INTO public.research_reports (
                category_id, display_title, short_summary, research_synopsis, publish_status, published_at
            ) VALUES (
                v_category_id,
                'Daily Market Report (07 - 04 - 2025)',
                'Legacy research report document staged for manual review: Daily Market Report (07 - 04 - 2025).',
                'This legacy research document has been staged from extractable document text and filename. The draft title and category require reviewer validation before any upload, access change, or publication decision. Topic cue: Daily Market Report (07 - 04 - 2025).',
                'review',
                '2025-04-07'
            )
            RETURNING id INTO v_report_id;
        END $$;

        DO $$
        DECLARE
            v_category_id uuid;
            v_report_id uuid;
        BEGIN
            SELECT id INTO v_category_id FROM public.research_categories WHERE slug = 'research-report';
            
            INSERT INTO public.research_reports (
                category_id, display_title, short_summary, research_synopsis, publish_status, published_at
            ) VALUES (
                v_category_id,
                'Daily Market Report (08 - 04 - 2025)',
                'Legacy research report document staged for manual review: Daily Market Report (08 - 04 - 2025).',
                'This legacy research document has been staged from extractable document text and filename. The draft title and category require reviewer validation before any upload, access change, or publication decision. Topic cue: Daily Market Report (08 - 04 - 2025).',
                'review',
                '2025-03-28'
            )
            RETURNING id INTO v_report_id;
        END $$;

        DO $$
        DECLARE
            v_category_id uuid;
            v_report_id uuid;
        BEGIN
            SELECT id INTO v_category_id FROM public.research_categories WHERE slug = 'research-report';
            
            INSERT INTO public.research_reports (
                category_id, display_title, short_summary, research_synopsis, publish_status, published_at
            ) VALUES (
                v_category_id,
                'Daily Market Report (09 - 04 - 2025).',
                'Legacy research report document staged for manual review: Daily Market Report (09 - 04 - 2025)..',
                'This legacy research document has been staged from extractable document text and filename. The draft title and category require reviewer validation before any upload, access change, or publication decision. Topic cue: Daily Market Report (09 - 04 - 2025)..',
                'review',
                '2025-04-09'
            )
            RETURNING id INTO v_report_id;
        END $$;

        DO $$
        DECLARE
            v_category_id uuid;
            v_report_id uuid;
        BEGIN
            SELECT id INTO v_category_id FROM public.research_categories WHERE slug = 'research-report';
            
            INSERT INTO public.research_reports (
                category_id, display_title, short_summary, research_synopsis, publish_status, published_at
            ) VALUES (
                v_category_id,
                'Daily Market Report (10 - 04 - 2025)',
                'Legacy research report document staged for manual review: Daily Market Report (10 - 04 - 2025).',
                'This legacy research document has been staged from extractable document text and filename. The draft title and category require reviewer validation before any upload, access change, or publication decision. Topic cue: Daily Market Report (10 - 04 - 2025).',
                'review',
                '2025-04-10'
            )
            RETURNING id INTO v_report_id;
        END $$;

        DO $$
        DECLARE
            v_category_id uuid;
            v_report_id uuid;
        BEGIN
            SELECT id INTO v_category_id FROM public.research_categories WHERE slug = 'research-report';
            
            INSERT INTO public.research_reports (
                category_id, display_title, short_summary, research_synopsis, publish_status, published_at
            ) VALUES (
                v_category_id,
                'Daily Market Report (11 - 04 - 2025)',
                'Legacy research report document staged for manual review: Daily Market Report (11 - 04 - 2025).',
                'This legacy research document has been staged from extractable document text and filename. The draft title and category require reviewer validation before any upload, access change, or publication decision. Topic cue: Daily Market Report (11 - 04 - 2025).',
                'review',
                '2025-04-11'
            )
            RETURNING id INTO v_report_id;
        END $$;

        DO $$
        DECLARE
            v_category_id uuid;
            v_report_id uuid;
        BEGIN
            SELECT id INTO v_category_id FROM public.research_categories WHERE slug = 'research-report';
            
            INSERT INTO public.research_reports (
                category_id, display_title, short_summary, research_synopsis, publish_status, published_at
            ) VALUES (
                v_category_id,
                'Daily Market Report (14 - 04 - 2025)',
                'Legacy research report document staged for manual review: Daily Market Report (14 - 04 - 2025).',
                'This legacy research document has been staged from extractable document text and filename. The draft title and category require reviewer validation before any upload, access change, or publication decision. Topic cue: Daily Market Report (14 - 04 - 2025).',
                'review',
                '2025-04-14'
            )
            RETURNING id INTO v_report_id;
        END $$;

        DO $$
        DECLARE
            v_category_id uuid;
            v_report_id uuid;
        BEGIN
            SELECT id INTO v_category_id FROM public.research_categories WHERE slug = 'research-report';
            
            INSERT INTO public.research_reports (
                category_id, display_title, short_summary, research_synopsis, publish_status, published_at
            ) VALUES (
                v_category_id,
                'Daily Market Report (15 - 04 - 2025)',
                'Legacy research report document staged for manual review: Daily Market Report (15 - 04 - 2025).',
                'This legacy research document has been staged from extractable document text and filename. The draft title and category require reviewer validation before any upload, access change, or publication decision. Topic cue: Daily Market Report (15 - 04 - 2025).',
                'review',
                '2025-04-15'
            )
            RETURNING id INTO v_report_id;
        END $$;

        DO $$
        DECLARE
            v_category_id uuid;
            v_report_id uuid;
        BEGIN
            SELECT id INTO v_category_id FROM public.research_categories WHERE slug = 'research-report';
            
            INSERT INTO public.research_reports (
                category_id, display_title, short_summary, research_synopsis, publish_status, published_at
            ) VALUES (
                v_category_id,
                'Daily Market Report (16 - 04 - 2025)',
                'Legacy research report document staged for manual review: Daily Market Report (16 - 04 - 2025).',
                'This legacy research document has been staged from extractable document text and filename. The draft title and category require reviewer validation before any upload, access change, or publication decision. Topic cue: Daily Market Report (16 - 04 - 2025).',
                'review',
                '2025-04-16'
            )
            RETURNING id INTO v_report_id;
        END $$;

        DO $$
        DECLARE
            v_category_id uuid;
            v_report_id uuid;
        BEGIN
            SELECT id INTO v_category_id FROM public.research_categories WHERE slug = 'research-report';
            
            INSERT INTO public.research_reports (
                category_id, display_title, short_summary, research_synopsis, publish_status, published_at
            ) VALUES (
                v_category_id,
                'Daily Market Report (17 - 04 - 2025)',
                'Legacy research report document staged for manual review: Daily Market Report (17 - 04 - 2025).',
                'This legacy research document has been staged from extractable document text and filename. The draft title and category require reviewer validation before any upload, access change, or publication decision. Topic cue: Daily Market Report (17 - 04 - 2025).',
                'review',
                '2025-04-17'
            )
            RETURNING id INTO v_report_id;
        END $$;

        DO $$
        DECLARE
            v_category_id uuid;
            v_report_id uuid;
        BEGIN
            SELECT id INTO v_category_id FROM public.research_categories WHERE slug = 'research-report';
            
            INSERT INTO public.research_reports (
                category_id, display_title, short_summary, research_synopsis, publish_status, published_at
            ) VALUES (
                v_category_id,
                'Daily Market Report (22 - 04 - 2025).',
                'Legacy research report document staged for manual review: Daily Market Report (22 - 04 - 2025)..',
                'This legacy research document has been staged from extractable document text and filename. The draft title and category require reviewer validation before any upload, access change, or publication decision. Topic cue: Daily Market Report (22 - 04 - 2025)..',
                'review',
                '2025-04-22'
            )
            RETURNING id INTO v_report_id;
        END $$;

        DO $$
        DECLARE
            v_category_id uuid;
            v_report_id uuid;
        BEGIN
            SELECT id INTO v_category_id FROM public.research_categories WHERE slug = 'research-report';
            
            INSERT INTO public.research_reports (
                category_id, display_title, short_summary, research_synopsis, publish_status, published_at
            ) VALUES (
                v_category_id,
                'Daily Market Report (24 - 04 - 2025)',
                'Legacy research report document staged for manual review: Daily Market Report (24 - 04 - 2025).',
                'This legacy research document has been staged from extractable document text and filename. The draft title and category require reviewer validation before any upload, access change, or publication decision. Topic cue: Daily Market Report (24 - 04 - 2025).',
                'review',
                '2025-04-24'
            )
            RETURNING id INTO v_report_id;
        END $$;

        DO $$
        DECLARE
            v_category_id uuid;
            v_report_id uuid;
        BEGIN
            SELECT id INTO v_category_id FROM public.research_categories WHERE slug = 'research-report';
            
            INSERT INTO public.research_reports (
                category_id, display_title, short_summary, research_synopsis, publish_status, published_at
            ) VALUES (
                v_category_id,
                'Daily Market Report (25 - 04 - 2025)',
                'Legacy research report document staged for manual review: Daily Market Report (25 - 04 - 2025).',
                'This legacy research document has been staged from extractable document text and filename. The draft title and category require reviewer validation before any upload, access change, or publication decision. Topic cue: Daily Market Report (25 - 04 - 2025).',
                'review',
                '2025-04-25'
            )
            RETURNING id INTO v_report_id;
        END $$;

        DO $$
        DECLARE
            v_category_id uuid;
            v_report_id uuid;
        BEGIN
            SELECT id INTO v_category_id FROM public.research_categories WHERE slug = 'research-report';
            
            INSERT INTO public.research_reports (
                category_id, display_title, short_summary, research_synopsis, publish_status, published_at
            ) VALUES (
                v_category_id,
                'Daily Market Report (28 - 04 - 2025)',
                'Legacy research report document staged for manual review: Daily Market Report (28 - 04 - 2025).',
                'This legacy research document has been staged from extractable document text and filename. The draft title and category require reviewer validation before any upload, access change, or publication decision. Topic cue: Daily Market Report (28 - 04 - 2025).',
                'review',
                '2025-04-28'
            )
            RETURNING id INTO v_report_id;
        END $$;

        DO $$
        DECLARE
            v_category_id uuid;
            v_report_id uuid;
        BEGIN
            SELECT id INTO v_category_id FROM public.research_categories WHERE slug = 'research-report';
            
            INSERT INTO public.research_reports (
                category_id, display_title, short_summary, research_synopsis, publish_status, published_at
            ) VALUES (
                v_category_id,
                'Daily Market Report (29 - 04 - 2025)',
                'Legacy research report document staged for manual review: Daily Market Report (29 - 04 - 2025).',
                'This legacy research document has been staged from extractable document text and filename. The draft title and category require reviewer validation before any upload, access change, or publication decision. Topic cue: Daily Market Report (29 - 04 - 2025).',
                'review',
                '2025-04-29'
            )
            RETURNING id INTO v_report_id;
        END $$;

        DO $$
        DECLARE
            v_category_id uuid;
            v_report_id uuid;
        BEGIN
            SELECT id INTO v_category_id FROM public.research_categories WHERE slug = 'research-report';
            
            INSERT INTO public.research_reports (
                category_id, display_title, short_summary, research_synopsis, publish_status, published_at
            ) VALUES (
                v_category_id,
                'Daily Market Report (30 - 04 - 2025)',
                'Legacy research report document staged for manual review: Daily Market Report (30 - 04 - 2025).',
                'This legacy research document has been staged from extractable document text and filename. The draft title and category require reviewer validation before any upload, access change, or publication decision. Topic cue: Daily Market Report (30 - 04 - 2025).',
                'review',
                '2025-04-30'
            )
            RETURNING id INTO v_report_id;
        END $$;

        DO $$
        DECLARE
            v_category_id uuid;
            v_report_id uuid;
        BEGIN
            SELECT id INTO v_category_id FROM public.research_categories WHERE slug = 'research-report';
            
            INSERT INTO public.research_reports (
                category_id, display_title, short_summary, research_synopsis, publish_status, published_at
            ) VALUES (
                v_category_id,
                'Daily Market Report. (23 - 04 - 2025)',
                'Legacy research report document staged for manual review: Daily Market Report. (23 - 04 - 2025).',
                'This legacy research document has been staged from extractable document text and filename. The draft title and category require reviewer validation before any upload, access change, or publication decision. Topic cue: Daily Market Report. (23 - 04 - 2025).',
                'review',
                '2025-04-23'
            )
            RETURNING id INTO v_report_id;
        END $$;

        DO $$
        DECLARE
            v_category_id uuid;
            v_report_id uuid;
        BEGIN
            SELECT id INTO v_category_id FROM public.research_categories WHERE slug = 'research-report';
            
            INSERT INTO public.research_reports (
                category_id, display_title, short_summary, research_synopsis, publish_status, published_at
            ) VALUES (
                v_category_id,
                'Daily Market Report (01 - 08 - 2025)',
                'Legacy research report document staged for manual review: Daily Market Report (01 - 08 - 2025).',
                'This legacy research document has been staged from extractable document text and filename. The draft title and category require reviewer validation before any upload, access change, or publication decision. Topic cue: Daily Market Report (01 - 08 - 2025).',
                'review',
                '2025-08-01'
            )
            RETURNING id INTO v_report_id;
        END $$;

        DO $$
        DECLARE
            v_category_id uuid;
            v_report_id uuid;
        BEGIN
            SELECT id INTO v_category_id FROM public.research_categories WHERE slug = 'research-report';
            
            INSERT INTO public.research_reports (
                category_id, display_title, short_summary, research_synopsis, publish_status, published_at
            ) VALUES (
                v_category_id,
                'Daily Market Report (04 - 08 - 2025)',
                'Legacy research report document staged for manual review: Daily Market Report (04 - 08 - 2025).',
                'This legacy research document has been staged from extractable document text and filename. The draft title and category require reviewer validation before any upload, access change, or publication decision. Topic cue: Daily Market Report (04 - 08 - 2025).',
                'review',
                '2025-08-04'
            )
            RETURNING id INTO v_report_id;
        END $$;

        DO $$
        DECLARE
            v_category_id uuid;
            v_report_id uuid;
        BEGIN
            SELECT id INTO v_category_id FROM public.research_categories WHERE slug = 'research-report';
            
            INSERT INTO public.research_reports (
                category_id, display_title, short_summary, research_synopsis, publish_status, published_at
            ) VALUES (
                v_category_id,
                'Daily Market Report (05 - 08 - 2025)',
                'Legacy research report document staged for manual review: Daily Market Report (05 - 08 - 2025).',
                'This legacy research document has been staged from extractable document text and filename. The draft title and category require reviewer validation before any upload, access change, or publication decision. Topic cue: Daily Market Report (05 - 08 - 2025).',
                'review',
                '2025-08-05'
            )
            RETURNING id INTO v_report_id;
        END $$;

        DO $$
        DECLARE
            v_category_id uuid;
            v_report_id uuid;
        BEGIN
            SELECT id INTO v_category_id FROM public.research_categories WHERE slug = 'research-report';
            
            INSERT INTO public.research_reports (
                category_id, display_title, short_summary, research_synopsis, publish_status, published_at
            ) VALUES (
                v_category_id,
                'Daily Market Report (06 - 08 - 2025)',
                'Legacy research report document staged for manual review: Daily Market Report (06 - 08 - 2025).',
                'This legacy research document has been staged from extractable document text and filename. The draft title and category require reviewer validation before any upload, access change, or publication decision. Topic cue: Daily Market Report (06 - 08 - 2025).',
                'review',
                '2025-08-06'
            )
            RETURNING id INTO v_report_id;
        END $$;

        DO $$
        DECLARE
            v_category_id uuid;
            v_report_id uuid;
        BEGIN
            SELECT id INTO v_category_id FROM public.research_categories WHERE slug = 'research-report';
            
            INSERT INTO public.research_reports (
                category_id, display_title, short_summary, research_synopsis, publish_status, published_at
            ) VALUES (
                v_category_id,
                'Daily Market Report (07 - 08 - 2025)',
                'Legacy research report document staged for manual review: Daily Market Report (07 - 08 - 2025).',
                'This legacy research document has been staged from extractable document text and filename. The draft title and category require reviewer validation before any upload, access change, or publication decision. Topic cue: Daily Market Report (07 - 08 - 2025).',
                'review',
                '2025-08-07'
            )
            RETURNING id INTO v_report_id;
        END $$;

        DO $$
        DECLARE
            v_category_id uuid;
            v_report_id uuid;
        BEGIN
            SELECT id INTO v_category_id FROM public.research_categories WHERE slug = 'research-report';
            
            INSERT INTO public.research_reports (
                category_id, display_title, short_summary, research_synopsis, publish_status, published_at
            ) VALUES (
                v_category_id,
                'Daily Market Report (08 - 08 - 2025)',
                'Legacy research report document staged for manual review: Daily Market Report (08 - 08 - 2025).',
                'This legacy research document has been staged from extractable document text and filename. The draft title and category require reviewer validation before any upload, access change, or publication decision. Topic cue: Daily Market Report (08 - 08 - 2025).',
                'review',
                '2025-08-08'
            )
            RETURNING id INTO v_report_id;
        END $$;

        DO $$
        DECLARE
            v_category_id uuid;
            v_report_id uuid;
        BEGIN
            SELECT id INTO v_category_id FROM public.research_categories WHERE slug = 'research-report';
            
            INSERT INTO public.research_reports (
                category_id, display_title, short_summary, research_synopsis, publish_status, published_at
            ) VALUES (
                v_category_id,
                'Daily Market Report (08 - 12 - 2025)',
                'Legacy research report document staged for manual review: Daily Market Report (08 - 12 - 2025).',
                'This legacy research document has been staged from extractable document text and filename. The draft title and category require reviewer validation before any upload, access change, or publication decision. Topic cue: Daily Market Report (08 - 12 - 2025).',
                'review',
                '2025-08-12'
            )
            RETURNING id INTO v_report_id;
        END $$;

        DO $$
        DECLARE
            v_category_id uuid;
            v_report_id uuid;
        BEGIN
            SELECT id INTO v_category_id FROM public.research_categories WHERE slug = 'research-report';
            
            INSERT INTO public.research_reports (
                category_id, display_title, short_summary, research_synopsis, publish_status, published_at
            ) VALUES (
                v_category_id,
                'Daily Market Report (08 - 13 - 2025)',
                'Legacy research report document staged for manual review: Daily Market Report (08 - 13 - 2025).',
                'This legacy research document has been staged from extractable document text and filename. The draft title and category require reviewer validation before any upload, access change, or publication decision. Topic cue: Daily Market Report (08 - 13 - 2025).',
                'review',
                '2025-08-13'
            )
            RETURNING id INTO v_report_id;
        END $$;

        DO $$
        DECLARE
            v_category_id uuid;
            v_report_id uuid;
        BEGIN
            SELECT id INTO v_category_id FROM public.research_categories WHERE slug = 'research-report';
            
            INSERT INTO public.research_reports (
                category_id, display_title, short_summary, research_synopsis, publish_status, published_at
            ) VALUES (
                v_category_id,
                'Daily Market Report (08 - 14 - 2025)',
                'Legacy research report document staged for manual review: Daily Market Report (08 - 14 - 2025).',
                'This legacy research document has been staged from extractable document text and filename. The draft title and category require reviewer validation before any upload, access change, or publication decision. Topic cue: Daily Market Report (08 - 14 - 2025).',
                'review',
                '2025-08-14'
            )
            RETURNING id INTO v_report_id;
        END $$;

        DO $$
        DECLARE
            v_category_id uuid;
            v_report_id uuid;
        BEGIN
            SELECT id INTO v_category_id FROM public.research_categories WHERE slug = 'research-report';
            
            INSERT INTO public.research_reports (
                category_id, display_title, short_summary, research_synopsis, publish_status, published_at
            ) VALUES (
                v_category_id,
                'Daily Market Report (08 - 15 - 2025)',
                'Legacy research report document staged for manual review: Daily Market Report (08 - 15 - 2025).',
                'This legacy research document has been staged from extractable document text and filename. The draft title and category require reviewer validation before any upload, access change, or publication decision. Topic cue: Daily Market Report (08 - 15 - 2025).',
                'review',
                '2025-08-15'
            )
            RETURNING id INTO v_report_id;
        END $$;

        DO $$
        DECLARE
            v_category_id uuid;
            v_report_id uuid;
        BEGIN
            SELECT id INTO v_category_id FROM public.research_categories WHERE slug = 'research-report';
            
            INSERT INTO public.research_reports (
                category_id, display_title, short_summary, research_synopsis, publish_status, published_at
            ) VALUES (
                v_category_id,
                'Daily Market Report (08 - 18 - 2025)',
                'Legacy research report document staged for manual review: Daily Market Report (08 - 18 - 2025).',
                'This legacy research document has been staged from extractable document text and filename. The draft title and category require reviewer validation before any upload, access change, or publication decision. Topic cue: Daily Market Report (08 - 18 - 2025).',
                'review',
                '2025-08-18'
            )
            RETURNING id INTO v_report_id;
        END $$;

        DO $$
        DECLARE
            v_category_id uuid;
            v_report_id uuid;
        BEGIN
            SELECT id INTO v_category_id FROM public.research_categories WHERE slug = 'research-report';
            
            INSERT INTO public.research_reports (
                category_id, display_title, short_summary, research_synopsis, publish_status, published_at
            ) VALUES (
                v_category_id,
                'Daily Market Report (08 - 20 - 2025)',
                'Legacy research report document staged for manual review: Daily Market Report (08 - 20 - 2025).',
                'This legacy research document has been staged from extractable document text and filename. The draft title and category require reviewer validation before any upload, access change, or publication decision. Topic cue: Daily Market Report (08 - 20 - 2025).',
                'review',
                '2025-08-20'
            )
            RETURNING id INTO v_report_id;
        END $$;

        DO $$
        DECLARE
            v_category_id uuid;
            v_report_id uuid;
        BEGIN
            SELECT id INTO v_category_id FROM public.research_categories WHERE slug = 'research-report';
            
            INSERT INTO public.research_reports (
                category_id, display_title, short_summary, research_synopsis, publish_status, published_at
            ) VALUES (
                v_category_id,
                'Daily Market Report (08 - 21 - 2025)',
                'Legacy research report document staged for manual review: Daily Market Report (08 - 21 - 2025).',
                'This legacy research document has been staged from extractable document text and filename. The draft title and category require reviewer validation before any upload, access change, or publication decision. Topic cue: Daily Market Report (08 - 21 - 2025).',
                'review',
                '2025-08-21'
            )
            RETURNING id INTO v_report_id;
        END $$;

        DO $$
        DECLARE
            v_category_id uuid;
            v_report_id uuid;
        BEGIN
            SELECT id INTO v_category_id FROM public.research_categories WHERE slug = 'research-report';
            
            INSERT INTO public.research_reports (
                category_id, display_title, short_summary, research_synopsis, publish_status, published_at
            ) VALUES (
                v_category_id,
                'Daily Market Report (08 - 22 - 2025)',
                'Legacy research report document staged for manual review: Daily Market Report (08 - 22 - 2025).',
                'This legacy research document has been staged from extractable document text and filename. The draft title and category require reviewer validation before any upload, access change, or publication decision. Topic cue: Daily Market Report (08 - 22 - 2025).',
                'review',
                '2025-08-22'
            )
            RETURNING id INTO v_report_id;
        END $$;

        DO $$
        DECLARE
            v_category_id uuid;
            v_report_id uuid;
        BEGIN
            SELECT id INTO v_category_id FROM public.research_categories WHERE slug = 'research-report';
            
            INSERT INTO public.research_reports (
                category_id, display_title, short_summary, research_synopsis, publish_status, published_at
            ) VALUES (
                v_category_id,
                'Daily Market Report (08 - 25 - 2025)',
                'Legacy research report document staged for manual review: Daily Market Report (08 - 25 - 2025).',
                'This legacy research document has been staged from extractable document text and filename. The draft title and category require reviewer validation before any upload, access change, or publication decision. Topic cue: Daily Market Report (08 - 25 - 2025).',
                'review',
                '2025-08-25'
            )
            RETURNING id INTO v_report_id;
        END $$;

        DO $$
        DECLARE
            v_category_id uuid;
            v_report_id uuid;
        BEGIN
            SELECT id INTO v_category_id FROM public.research_categories WHERE slug = 'research-report';
            
            INSERT INTO public.research_reports (
                category_id, display_title, short_summary, research_synopsis, publish_status, published_at
            ) VALUES (
                v_category_id,
                'Daily Market Report (08 - 26 - 2025)',
                'Legacy research report document staged for manual review: Daily Market Report (08 - 26 - 2025).',
                'This legacy research document has been staged from extractable document text and filename. The draft title and category require reviewer validation before any upload, access change, or publication decision. Topic cue: Daily Market Report (08 - 26 - 2025).',
                'review',
                '2025-08-26'
            )
            RETURNING id INTO v_report_id;
        END $$;

        DO $$
        DECLARE
            v_category_id uuid;
            v_report_id uuid;
        BEGIN
            SELECT id INTO v_category_id FROM public.research_categories WHERE slug = 'research-report';
            
            INSERT INTO public.research_reports (
                category_id, display_title, short_summary, research_synopsis, publish_status, published_at
            ) VALUES (
                v_category_id,
                'Daily Market Report (08 - 27 - 2025)',
                'Legacy research report document staged for manual review: Daily Market Report (08 - 27 - 2025).',
                'This legacy research document has been staged from extractable document text and filename. The draft title and category require reviewer validation before any upload, access change, or publication decision. Topic cue: Daily Market Report (08 - 27 - 2025).',
                'review',
                '2025-08-27'
            )
            RETURNING id INTO v_report_id;
        END $$;

        DO $$
        DECLARE
            v_category_id uuid;
            v_report_id uuid;
        BEGIN
            SELECT id INTO v_category_id FROM public.research_categories WHERE slug = 'research-report';
            
            INSERT INTO public.research_reports (
                category_id, display_title, short_summary, research_synopsis, publish_status, published_at
            ) VALUES (
                v_category_id,
                'Daily Market Report (08 - 28 - 2025)',
                'Legacy research report document staged for manual review: Daily Market Report (08 - 28 - 2025).',
                'This legacy research document has been staged from extractable document text and filename. The draft title and category require reviewer validation before any upload, access change, or publication decision. Topic cue: Daily Market Report (08 - 28 - 2025).',
                'review',
                '2025-08-28'
            )
            RETURNING id INTO v_report_id;
        END $$;

        DO $$
        DECLARE
            v_category_id uuid;
            v_report_id uuid;
        BEGIN
            SELECT id INTO v_category_id FROM public.research_categories WHERE slug = 'research-report';
            
            INSERT INTO public.research_reports (
                category_id, display_title, short_summary, research_synopsis, publish_status, published_at
            ) VALUES (
                v_category_id,
                'Daily Market Report (08 - 29 - 2025)',
                'Legacy research report document staged for manual review: Daily Market Report (08 - 29 - 2025).',
                'This legacy research document has been staged from extractable document text and filename. The draft title and category require reviewer validation before any upload, access change, or publication decision. Topic cue: Daily Market Report (08 - 29 - 2025).',
                'review',
                '2025-08-29'
            )
            RETURNING id INTO v_report_id;
        END $$;

        DO $$
        DECLARE
            v_category_id uuid;
            v_report_id uuid;
        BEGIN
            SELECT id INTO v_category_id FROM public.research_categories WHERE slug = 'research-report';
            
            INSERT INTO public.research_reports (
                category_id, display_title, short_summary, research_synopsis, publish_status, published_at
            ) VALUES (
                v_category_id,
                'Daily Market Report (11 - 08 - 2025)',
                'Legacy research report document staged for manual review: Daily Market Report (11 - 08 - 2025).',
                'This legacy research document has been staged from extractable document text and filename. The draft title and category require reviewer validation before any upload, access change, or publication decision. Topic cue: Daily Market Report (11 - 08 - 2025).',
                'review',
                '2025-08-11'
            )
            RETURNING id INTO v_report_id;
        END $$;

        DO $$
        DECLARE
            v_category_id uuid;
            v_report_id uuid;
        BEGIN
            SELECT id INTO v_category_id FROM public.research_categories WHERE slug = 'research-report';
            
            INSERT INTO public.research_reports (
                category_id, display_title, short_summary, research_synopsis, publish_status, published_at
            ) VALUES (
                v_category_id,
                'Daily Market Report (12 - 01 - 2025)',
                'Legacy research report document staged for manual review: Daily Market Report (12 - 01 - 2025).',
                'This legacy research document has been staged from extractable document text and filename. The draft title and category require reviewer validation before any upload, access change, or publication decision. Topic cue: Daily Market Report (12 - 01 - 2025).',
                'review',
                '2025-12-01'
            )
            RETURNING id INTO v_report_id;
        END $$;

        DO $$
        DECLARE
            v_category_id uuid;
            v_report_id uuid;
        BEGIN
            SELECT id INTO v_category_id FROM public.research_categories WHERE slug = 'research-report';
            
            INSERT INTO public.research_reports (
                category_id, display_title, short_summary, research_synopsis, publish_status, published_at
            ) VALUES (
                v_category_id,
                'Daily Market Report (12 - 02 - 2025)',
                'Legacy research report document staged for manual review: Daily Market Report (12 - 02 - 2025).',
                'This legacy research document has been staged from extractable document text and filename. The draft title and category require reviewer validation before any upload, access change, or publication decision. Topic cue: Daily Market Report (12 - 02 - 2025).',
                'review',
                '2025-12-02'
            )
            RETURNING id INTO v_report_id;
        END $$;

        DO $$
        DECLARE
            v_category_id uuid;
            v_report_id uuid;
        BEGIN
            SELECT id INTO v_category_id FROM public.research_categories WHERE slug = 'research-report';
            
            INSERT INTO public.research_reports (
                category_id, display_title, short_summary, research_synopsis, publish_status, published_at
            ) VALUES (
                v_category_id,
                'Daily Market Report (12 - 03 - 2025)',
                'Legacy research report document staged for manual review: Daily Market Report (12 - 03 - 2025).',
                'This legacy research document has been staged from extractable document text and filename. The draft title and category require reviewer validation before any upload, access change, or publication decision. Topic cue: Daily Market Report (12 - 03 - 2025).',
                'review',
                '2025-12-03'
            )
            RETURNING id INTO v_report_id;
        END $$;

        DO $$
        DECLARE
            v_category_id uuid;
            v_report_id uuid;
        BEGIN
            SELECT id INTO v_category_id FROM public.research_categories WHERE slug = 'research-report';
            
            INSERT INTO public.research_reports (
                category_id, display_title, short_summary, research_synopsis, publish_status, published_at
            ) VALUES (
                v_category_id,
                'Daily Market Report (12 - 04 - 2025)',
                'Legacy research report document staged for manual review: Daily Market Report (12 - 04 - 2025).',
                'This legacy research document has been staged from extractable document text and filename. The draft title and category require reviewer validation before any upload, access change, or publication decision. Topic cue: Daily Market Report (12 - 04 - 2025).',
                'review',
                '2025-12-04'
            )
            RETURNING id INTO v_report_id;
        END $$;

        DO $$
        DECLARE
            v_category_id uuid;
            v_report_id uuid;
        BEGIN
            SELECT id INTO v_category_id FROM public.research_categories WHERE slug = 'research-report';
            
            INSERT INTO public.research_reports (
                category_id, display_title, short_summary, research_synopsis, publish_status, published_at
            ) VALUES (
                v_category_id,
                'Daily Market Report (12 - 08 - 2025)',
                'Legacy research report document staged for manual review: Daily Market Report (12 - 08 - 2025).',
                'This legacy research document has been staged from extractable document text and filename. The draft title and category require reviewer validation before any upload, access change, or publication decision. Topic cue: Daily Market Report (12 - 08 - 2025).',
                'review',
                '2025-12-08'
            )
            RETURNING id INTO v_report_id;
        END $$;

        DO $$
        DECLARE
            v_category_id uuid;
            v_report_id uuid;
        BEGIN
            SELECT id INTO v_category_id FROM public.research_categories WHERE slug = 'research-report';
            
            INSERT INTO public.research_reports (
                category_id, display_title, short_summary, research_synopsis, publish_status, published_at
            ) VALUES (
                v_category_id,
                'Daily Market Report (12 - 09 - 2025)',
                'Legacy research report document staged for manual review: Daily Market Report (12 - 09 - 2025).',
                'This legacy research document has been staged from extractable document text and filename. The draft title and category require reviewer validation before any upload, access change, or publication decision. Topic cue: Daily Market Report (12 - 09 - 2025).',
                'review',
                '2025-12-09'
            )
            RETURNING id INTO v_report_id;
        END $$;

        DO $$
        DECLARE
            v_category_id uuid;
            v_report_id uuid;
        BEGIN
            SELECT id INTO v_category_id FROM public.research_categories WHERE slug = 'research-report';
            
            INSERT INTO public.research_reports (
                category_id, display_title, short_summary, research_synopsis, publish_status, published_at
            ) VALUES (
                v_category_id,
                'Daily Market Report (12 - 10 - 2025)',
                'Legacy research report document staged for manual review: Daily Market Report (12 - 10 - 2025).',
                'This legacy research document has been staged from extractable document text and filename. The draft title and category require reviewer validation before any upload, access change, or publication decision. Topic cue: Daily Market Report (12 - 10 - 2025).',
                'review',
                '2025-12-10'
            )
            RETURNING id INTO v_report_id;
        END $$;

        DO $$
        DECLARE
            v_category_id uuid;
            v_report_id uuid;
        BEGIN
            SELECT id INTO v_category_id FROM public.research_categories WHERE slug = 'research-report';
            
            INSERT INTO public.research_reports (
                category_id, display_title, short_summary, research_synopsis, publish_status, published_at
            ) VALUES (
                v_category_id,
                'Daily Market Report (12 - 11 - 2025)',
                'Legacy research report document staged for manual review: Daily Market Report (12 - 11 - 2025).',
                'This legacy research document has been staged from extractable document text and filename. The draft title and category require reviewer validation before any upload, access change, or publication decision. Topic cue: Daily Market Report (12 - 11 - 2025).',
                'review',
                '2025-12-11'
            )
            RETURNING id INTO v_report_id;
        END $$;

        DO $$
        DECLARE
            v_category_id uuid;
            v_report_id uuid;
        BEGIN
            SELECT id INTO v_category_id FROM public.research_categories WHERE slug = 'research-report';
            
            INSERT INTO public.research_reports (
                category_id, display_title, short_summary, research_synopsis, publish_status, published_at
            ) VALUES (
                v_category_id,
                'Daily Market Report (12 - 12 - 2025)',
                'Legacy research report document staged for manual review: Daily Market Report (12 - 12 - 2025).',
                'This legacy research document has been staged from extractable document text and filename. The draft title and category require reviewer validation before any upload, access change, or publication decision. Topic cue: Daily Market Report (12 - 12 - 2025).',
                'review',
                '2025-12-12'
            )
            RETURNING id INTO v_report_id;
        END $$;

        DO $$
        DECLARE
            v_category_id uuid;
            v_report_id uuid;
        BEGIN
            SELECT id INTO v_category_id FROM public.research_categories WHERE slug = 'research-report';
            
            INSERT INTO public.research_reports (
                category_id, display_title, short_summary, research_synopsis, publish_status, published_at
            ) VALUES (
                v_category_id,
                'Daily Market Report (12 - 15 - 2025)',
                'Legacy research report document staged for manual review: Daily Market Report (12 - 15 - 2025).',
                'This legacy research document has been staged from extractable document text and filename. The draft title and category require reviewer validation before any upload, access change, or publication decision. Topic cue: Daily Market Report (12 - 15 - 2025).',
                'review',
                '2025-12-15'
            )
            RETURNING id INTO v_report_id;
        END $$;

        DO $$
        DECLARE
            v_category_id uuid;
            v_report_id uuid;
        BEGIN
            SELECT id INTO v_category_id FROM public.research_categories WHERE slug = 'research-report';
            
            INSERT INTO public.research_reports (
                category_id, display_title, short_summary, research_synopsis, publish_status, published_at
            ) VALUES (
                v_category_id,
                'Daily Market Report (12 - 16 - 2025)',
                'Legacy research report document staged for manual review: Daily Market Report (12 - 16 - 2025).',
                'This legacy research document has been staged from extractable document text and filename. The draft title and category require reviewer validation before any upload, access change, or publication decision. Topic cue: Daily Market Report (12 - 16 - 2025).',
                'review',
                '2025-12-16'
            )
            RETURNING id INTO v_report_id;
        END $$;

        DO $$
        DECLARE
            v_category_id uuid;
            v_report_id uuid;
        BEGIN
            SELECT id INTO v_category_id FROM public.research_categories WHERE slug = 'research-report';
            
            INSERT INTO public.research_reports (
                category_id, display_title, short_summary, research_synopsis, publish_status, published_at
            ) VALUES (
                v_category_id,
                'Daily Market Report (12 - 17 - 2025)',
                'Legacy research report document staged for manual review: Daily Market Report (12 - 17 - 2025).',
                'This legacy research document has been staged from extractable document text and filename. The draft title and category require reviewer validation before any upload, access change, or publication decision. Topic cue: Daily Market Report (12 - 17 - 2025).',
                'review',
                '2025-12-17'
            )
            RETURNING id INTO v_report_id;
        END $$;

        DO $$
        DECLARE
            v_category_id uuid;
            v_report_id uuid;
        BEGIN
            SELECT id INTO v_category_id FROM public.research_categories WHERE slug = 'research-report';
            
            INSERT INTO public.research_reports (
                category_id, display_title, short_summary, research_synopsis, publish_status, published_at
            ) VALUES (
                v_category_id,
                'Daily Market Report (12 - 18 - 2025)',
                'Legacy research report document staged for manual review: Daily Market Report (12 - 18 - 2025).',
                'This legacy research document has been staged from extractable document text and filename. The draft title and category require reviewer validation before any upload, access change, or publication decision. Topic cue: Daily Market Report (12 - 18 - 2025).',
                'review',
                '2025-12-18'
            )
            RETURNING id INTO v_report_id;
        END $$;

        DO $$
        DECLARE
            v_category_id uuid;
            v_report_id uuid;
        BEGIN
            SELECT id INTO v_category_id FROM public.research_categories WHERE slug = 'research-report';
            
            INSERT INTO public.research_reports (
                category_id, display_title, short_summary, research_synopsis, publish_status, published_at
            ) VALUES (
                v_category_id,
                'Daily Market Report (12 - 19 - 2025)',
                'Legacy research report document staged for manual review: Daily Market Report (12 - 19 - 2025).',
                'This legacy research document has been staged from extractable document text and filename. The draft title and category require reviewer validation before any upload, access change, or publication decision. Topic cue: Daily Market Report (12 - 19 - 2025).',
                'review',
                '2025-12-19'
            )
            RETURNING id INTO v_report_id;
        END $$;

        DO $$
        DECLARE
            v_category_id uuid;
            v_report_id uuid;
        BEGIN
            SELECT id INTO v_category_id FROM public.research_categories WHERE slug = 'research-report';
            
            INSERT INTO public.research_reports (
                category_id, display_title, short_summary, research_synopsis, publish_status, published_at
            ) VALUES (
                v_category_id,
                'Daily Market Report (12 - 22 - 2025)',
                'Legacy research report document staged for manual review: Daily Market Report (12 - 22 - 2025).',
                'This legacy research document has been staged from extractable document text and filename. The draft title and category require reviewer validation before any upload, access change, or publication decision. Topic cue: Daily Market Report (12 - 22 - 2025).',
                'review',
                '2025-12-22'
            )
            RETURNING id INTO v_report_id;
        END $$;

        DO $$
        DECLARE
            v_category_id uuid;
            v_report_id uuid;
        BEGIN
            SELECT id INTO v_category_id FROM public.research_categories WHERE slug = 'research-report';
            
            INSERT INTO public.research_reports (
                category_id, display_title, short_summary, research_synopsis, publish_status, published_at
            ) VALUES (
                v_category_id,
                'Daily Market Report (12 - 23 - 2025)',
                'Legacy research report document staged for manual review: Daily Market Report (12 - 23 - 2025).',
                'This legacy research document has been staged from extractable document text and filename. The draft title and category require reviewer validation before any upload, access change, or publication decision. Topic cue: Daily Market Report (12 - 23 - 2025).',
                'review',
                '2025-12-23'
            )
            RETURNING id INTO v_report_id;
        END $$;

        DO $$
        DECLARE
            v_category_id uuid;
            v_report_id uuid;
        BEGIN
            SELECT id INTO v_category_id FROM public.research_categories WHERE slug = 'research-report';
            
            INSERT INTO public.research_reports (
                category_id, display_title, short_summary, research_synopsis, publish_status, published_at
            ) VALUES (
                v_category_id,
                'Daily Market Report (12 - 24 - 2025)',
                'Legacy research report document staged for manual review: Daily Market Report (12 - 24 - 2025).',
                'This legacy research document has been staged from extractable document text and filename. The draft title and category require reviewer validation before any upload, access change, or publication decision. Topic cue: Daily Market Report (12 - 24 - 2025).',
                'review',
                '2025-12-24'
            )
            RETURNING id INTO v_report_id;
        END $$;

        DO $$
        DECLARE
            v_category_id uuid;
            v_report_id uuid;
        BEGIN
            SELECT id INTO v_category_id FROM public.research_categories WHERE slug = 'research-report';
            
            INSERT INTO public.research_reports (
                category_id, display_title, short_summary, research_synopsis, publish_status, published_at
            ) VALUES (
                v_category_id,
                'Daily Market Report (12 - 29 - 2025)',
                'Legacy research report document staged for manual review: Daily Market Report (12 - 29 - 2025).',
                'This legacy research document has been staged from extractable document text and filename. The draft title and category require reviewer validation before any upload, access change, or publication decision. Topic cue: Daily Market Report (12 - 29 - 2025).',
                'review',
                '2026-01-06'
            )
            RETURNING id INTO v_report_id;
        END $$;

        DO $$
        DECLARE
            v_category_id uuid;
            v_report_id uuid;
        BEGIN
            SELECT id INTO v_category_id FROM public.research_categories WHERE slug = 'research-report';
            
            INSERT INTO public.research_reports (
                category_id, display_title, short_summary, research_synopsis, publish_status, published_at
            ) VALUES (
                v_category_id,
                'Daily Market Report (12 - 30 - 2025)',
                'Legacy research report document staged for manual review: Daily Market Report (12 - 30 - 2025).',
                'This legacy research document has been staged from extractable document text and filename. The draft title and category require reviewer validation before any upload, access change, or publication decision. Topic cue: Daily Market Report (12 - 30 - 2025).',
                'review',
                '2025-12-30'
            )
            RETURNING id INTO v_report_id;
        END $$;

        DO $$
        DECLARE
            v_category_id uuid;
            v_report_id uuid;
        BEGIN
            SELECT id INTO v_category_id FROM public.research_categories WHERE slug = 'research-report';
            
            INSERT INTO public.research_reports (
                category_id, display_title, short_summary, research_synopsis, publish_status, published_at
            ) VALUES (
                v_category_id,
                'Daily Market Report (12 - 31 - 2025)',
                'Legacy research report document staged for manual review: Daily Market Report (12 - 31 - 2025).',
                'This legacy research document has been staged from extractable document text and filename. The draft title and category require reviewer validation before any upload, access change, or publication decision. Topic cue: Daily Market Report (12 - 31 - 2025).',
                'review',
                '2025-12-31'
            )
            RETURNING id INTO v_report_id;
        END $$;

        DO $$
        DECLARE
            v_category_id uuid;
            v_report_id uuid;
        BEGIN
            SELECT id INTO v_category_id FROM public.research_categories WHERE slug = 'research-report';
            
            INSERT INTO public.research_reports (
                category_id, display_title, short_summary, research_synopsis, publish_status, published_at
            ) VALUES (
                v_category_id,
                'Daily Market Report (12 - 5 - 2025)',
                'Legacy research report document staged for manual review: Daily Market Report (12 - 5 - 2025).',
                'This legacy research document has been staged from extractable document text and filename. The draft title and category require reviewer validation before any upload, access change, or publication decision. Topic cue: Daily Market Report (12 - 5 - 2025).',
                'review',
                '2025-12-05'
            )
            RETURNING id INTO v_report_id;
        END $$;

        DO $$
        DECLARE
            v_category_id uuid;
            v_report_id uuid;
        BEGIN
            SELECT id INTO v_category_id FROM public.research_categories WHERE slug = 'research-report';
            
            INSERT INTO public.research_reports (
                category_id, display_title, short_summary, research_synopsis, publish_status, published_at
            ) VALUES (
                v_category_id,
                'Daily Market Report (03 - 02 - 2025)',
                'Legacy research report document staged for manual review: Daily Market Report (03 - 02 - 2025).',
                'This legacy research document has been staged from extractable document text and filename. The draft title and category require reviewer validation before any upload, access change, or publication decision. Topic cue: Daily Market Report (03 - 02 - 2025).',
                'review',
                '2025-02-03'
            )
            RETURNING id INTO v_report_id;
        END $$;

        DO $$
        DECLARE
            v_category_id uuid;
            v_report_id uuid;
        BEGIN
            SELECT id INTO v_category_id FROM public.research_categories WHERE slug = 'research-report';
            
            INSERT INTO public.research_reports (
                category_id, display_title, short_summary, research_synopsis, publish_status, published_at
            ) VALUES (
                v_category_id,
                'Daily Market Report (04 - 02 - 2025)...',
                'Legacy research report document staged for manual review: Daily Market Report (04 - 02 - 2025)....',
                'This legacy research document has been staged from extractable document text and filename. The draft title and category require reviewer validation before any upload, access change, or publication decision. Topic cue: Daily Market Report (04 - 02 - 2025)....',
                'review',
                '2025-02-04'
            )
            RETURNING id INTO v_report_id;
        END $$;

        DO $$
        DECLARE
            v_category_id uuid;
            v_report_id uuid;
        BEGIN
            SELECT id INTO v_category_id FROM public.research_categories WHERE slug = 'research-report';
            
            INSERT INTO public.research_reports (
                category_id, display_title, short_summary, research_synopsis, publish_status, published_at
            ) VALUES (
                v_category_id,
                'Daily Market Report (05 - 02 - 2025)',
                'Legacy research report document staged for manual review: Daily Market Report (05 - 02 - 2025).',
                'This legacy research document has been staged from extractable document text and filename. The draft title and category require reviewer validation before any upload, access change, or publication decision. Topic cue: Daily Market Report (05 - 02 - 2025).',
                'review',
                '2025-02-05'
            )
            RETURNING id INTO v_report_id;
        END $$;

        DO $$
        DECLARE
            v_category_id uuid;
            v_report_id uuid;
        BEGIN
            SELECT id INTO v_category_id FROM public.research_categories WHERE slug = 'research-report';
            
            INSERT INTO public.research_reports (
                category_id, display_title, short_summary, research_synopsis, publish_status, published_at
            ) VALUES (
                v_category_id,
                'Daily Market Report (06 - 02 - 2025)',
                'Legacy research report document staged for manual review: Daily Market Report (06 - 02 - 2025).',
                'This legacy research document has been staged from extractable document text and filename. The draft title and category require reviewer validation before any upload, access change, or publication decision. Topic cue: Daily Market Report (06 - 02 - 2025).',
                'review',
                '2025-02-06'
            )
            RETURNING id INTO v_report_id;
        END $$;

        DO $$
        DECLARE
            v_category_id uuid;
            v_report_id uuid;
        BEGIN
            SELECT id INTO v_category_id FROM public.research_categories WHERE slug = 'research-report';
            
            INSERT INTO public.research_reports (
                category_id, display_title, short_summary, research_synopsis, publish_status, published_at
            ) VALUES (
                v_category_id,
                'Daily Market Report (07 - 02 - 2025)',
                'Legacy research report document staged for manual review: Daily Market Report (07 - 02 - 2025).',
                'This legacy research document has been staged from extractable document text and filename. The draft title and category require reviewer validation before any upload, access change, or publication decision. Topic cue: Daily Market Report (07 - 02 - 2025).',
                'review',
                '2025-02-07'
            )
            RETURNING id INTO v_report_id;
        END $$;

        DO $$
        DECLARE
            v_category_id uuid;
            v_report_id uuid;
        BEGIN
            SELECT id INTO v_category_id FROM public.research_categories WHERE slug = 'research-report';
            
            INSERT INTO public.research_reports (
                category_id, display_title, short_summary, research_synopsis, publish_status, published_at
            ) VALUES (
                v_category_id,
                'Daily Market Report (11 - 02 - 2025)',
                'Legacy research report document staged for manual review: Daily Market Report (11 - 02 - 2025).',
                'This legacy research document has been staged from extractable document text and filename. The draft title and category require reviewer validation before any upload, access change, or publication decision. Topic cue: Daily Market Report (11 - 02 - 2025).',
                'review',
                '2025-02-10'
            )
            RETURNING id INTO v_report_id;
        END $$;

        DO $$
        DECLARE
            v_category_id uuid;
            v_report_id uuid;
        BEGIN
            SELECT id INTO v_category_id FROM public.research_categories WHERE slug = 'research-report';
            
            INSERT INTO public.research_reports (
                category_id, display_title, short_summary, research_synopsis, publish_status, published_at
            ) VALUES (
                v_category_id,
                'Daily Market Report (13 - 02 - 2025)',
                'Legacy research report document staged for manual review: Daily Market Report (13 - 02 - 2025).',
                'This legacy research document has been staged from extractable document text and filename. The draft title and category require reviewer validation before any upload, access change, or publication decision. Topic cue: Daily Market Report (13 - 02 - 2025).',
                'review',
                '2025-02-13'
            )
            RETURNING id INTO v_report_id;
        END $$;

        DO $$
        DECLARE
            v_category_id uuid;
            v_report_id uuid;
        BEGIN
            SELECT id INTO v_category_id FROM public.research_categories WHERE slug = 'research-report';
            
            INSERT INTO public.research_reports (
                category_id, display_title, short_summary, research_synopsis, publish_status, published_at
            ) VALUES (
                v_category_id,
                'Daily Market Report (14 - 02 - 2025)',
                'Legacy research report document staged for manual review: Daily Market Report (14 - 02 - 2025).',
                'This legacy research document has been staged from extractable document text and filename. The draft title and category require reviewer validation before any upload, access change, or publication decision. Topic cue: Daily Market Report (14 - 02 - 2025).',
                'review',
                '2025-02-14'
            )
            RETURNING id INTO v_report_id;
        END $$;

        DO $$
        DECLARE
            v_category_id uuid;
            v_report_id uuid;
        BEGIN
            SELECT id INTO v_category_id FROM public.research_categories WHERE slug = 'research-report';
            
            INSERT INTO public.research_reports (
                category_id, display_title, short_summary, research_synopsis, publish_status, published_at
            ) VALUES (
                v_category_id,
                'Daily Market Report (17 - 02 - 2025)',
                'Legacy research report document staged for manual review: Daily Market Report (17 - 02 - 2025).',
                'This legacy research document has been staged from extractable document text and filename. The draft title and category require reviewer validation before any upload, access change, or publication decision. Topic cue: Daily Market Report (17 - 02 - 2025).',
                'review',
                '2025-02-17'
            )
            RETURNING id INTO v_report_id;
        END $$;

        DO $$
        DECLARE
            v_category_id uuid;
            v_report_id uuid;
        BEGIN
            SELECT id INTO v_category_id FROM public.research_categories WHERE slug = 'research-report';
            
            INSERT INTO public.research_reports (
                category_id, display_title, short_summary, research_synopsis, publish_status, published_at
            ) VALUES (
                v_category_id,
                'Daily Market Report (18 - 02 - 2025)',
                'Legacy research report document staged for manual review: Daily Market Report (18 - 02 - 2025).',
                'This legacy research document has been staged from extractable document text and filename. The draft title and category require reviewer validation before any upload, access change, or publication decision. Topic cue: Daily Market Report (18 - 02 - 2025).',
                'review',
                '2025-02-18'
            )
            RETURNING id INTO v_report_id;
        END $$;

        DO $$
        DECLARE
            v_category_id uuid;
            v_report_id uuid;
        BEGIN
            SELECT id INTO v_category_id FROM public.research_categories WHERE slug = 'research-report';
            
            INSERT INTO public.research_reports (
                category_id, display_title, short_summary, research_synopsis, publish_status, published_at
            ) VALUES (
                v_category_id,
                'Daily Market Report (19 - 02 - 2025)',
                'Legacy research report document staged for manual review: Daily Market Report (19 - 02 - 2025).',
                'This legacy research document has been staged from extractable document text and filename. The draft title and category require reviewer validation before any upload, access change, or publication decision. Topic cue: Daily Market Report (19 - 02 - 2025).',
                'review',
                '2025-02-19'
            )
            RETURNING id INTO v_report_id;
        END $$;

        DO $$
        DECLARE
            v_category_id uuid;
            v_report_id uuid;
        BEGIN
            SELECT id INTO v_category_id FROM public.research_categories WHERE slug = 'research-report';
            
            INSERT INTO public.research_reports (
                category_id, display_title, short_summary, research_synopsis, publish_status, published_at
            ) VALUES (
                v_category_id,
                'Daily Market Report (20 - 02 - 2025)',
                'Legacy research report document staged for manual review: Daily Market Report (20 - 02 - 2025).',
                'This legacy research document has been staged from extractable document text and filename. The draft title and category require reviewer validation before any upload, access change, or publication decision. Topic cue: Daily Market Report (20 - 02 - 2025).',
                'review',
                '2025-02-20'
            )
            RETURNING id INTO v_report_id;
        END $$;

        DO $$
        DECLARE
            v_category_id uuid;
            v_report_id uuid;
        BEGIN
            SELECT id INTO v_category_id FROM public.research_categories WHERE slug = 'research-report';
            
            INSERT INTO public.research_reports (
                category_id, display_title, short_summary, research_synopsis, publish_status, published_at
            ) VALUES (
                v_category_id,
                'Daily Market Report (21 - 02 - 2025)',
                'Legacy research report document staged for manual review: Daily Market Report (21 - 02 - 2025).',
                'This legacy research document has been staged from extractable document text and filename. The draft title and category require reviewer validation before any upload, access change, or publication decision. Topic cue: Daily Market Report (21 - 02 - 2025).',
                'review',
                '2025-02-21'
            )
            RETURNING id INTO v_report_id;
        END $$;

        DO $$
        DECLARE
            v_category_id uuid;
            v_report_id uuid;
        BEGIN
            SELECT id INTO v_category_id FROM public.research_categories WHERE slug = 'research-report';
            
            INSERT INTO public.research_reports (
                category_id, display_title, short_summary, research_synopsis, publish_status, published_at
            ) VALUES (
                v_category_id,
                'Daily Market Report (24 - 02 - 2025)',
                'Legacy research report document staged for manual review: Daily Market Report (24 - 02 - 2025).',
                'This legacy research document has been staged from extractable document text and filename. The draft title and category require reviewer validation before any upload, access change, or publication decision. Topic cue: Daily Market Report (24 - 02 - 2025).',
                'review',
                '2025-02-24'
            )
            RETURNING id INTO v_report_id;
        END $$;

        DO $$
        DECLARE
            v_category_id uuid;
            v_report_id uuid;
        BEGIN
            SELECT id INTO v_category_id FROM public.research_categories WHERE slug = 'research-report';
            
            INSERT INTO public.research_reports (
                category_id, display_title, short_summary, research_synopsis, publish_status, published_at
            ) VALUES (
                v_category_id,
                'Daily Market Report (25 - 02 - 2025)',
                'Legacy research report document staged for manual review: Daily Market Report (25 - 02 - 2025).',
                'This legacy research document has been staged from extractable document text and filename. The draft title and category require reviewer validation before any upload, access change, or publication decision. Topic cue: Daily Market Report (25 - 02 - 2025).',
                'review',
                '2025-02-25'
            )
            RETURNING id INTO v_report_id;
        END $$;

        DO $$
        DECLARE
            v_category_id uuid;
            v_report_id uuid;
        BEGIN
            SELECT id INTO v_category_id FROM public.research_categories WHERE slug = 'research-report';
            
            INSERT INTO public.research_reports (
                category_id, display_title, short_summary, research_synopsis, publish_status, published_at
            ) VALUES (
                v_category_id,
                'Daily Market Report (26 - 02 - 2025)',
                'Legacy research report document staged for manual review: Daily Market Report (26 - 02 - 2025).',
                'This legacy research document has been staged from extractable document text and filename. The draft title and category require reviewer validation before any upload, access change, or publication decision. Topic cue: Daily Market Report (26 - 02 - 2025).',
                'review',
                '2025-02-26'
            )
            RETURNING id INTO v_report_id;
        END $$;

        DO $$
        DECLARE
            v_category_id uuid;
            v_report_id uuid;
        BEGIN
            SELECT id INTO v_category_id FROM public.research_categories WHERE slug = 'research-report';
            
            INSERT INTO public.research_reports (
                category_id, display_title, short_summary, research_synopsis, publish_status, published_at
            ) VALUES (
                v_category_id,
                'Daily Market Report (27 - 02 - 2025)',
                'Legacy research report document staged for manual review: Daily Market Report (27 - 02 - 2025).',
                'This legacy research document has been staged from extractable document text and filename. The draft title and category require reviewer validation before any upload, access change, or publication decision. Topic cue: Daily Market Report (27 - 02 - 2025).',
                'review',
                '2025-02-27'
            )
            RETURNING id INTO v_report_id;
        END $$;

        DO $$
        DECLARE
            v_category_id uuid;
            v_report_id uuid;
        BEGIN
            SELECT id INTO v_category_id FROM public.research_categories WHERE slug = 'research-report';
            
            INSERT INTO public.research_reports (
                category_id, display_title, short_summary, research_synopsis, publish_status, published_at
            ) VALUES (
                v_category_id,
                'Daily Market Report (28 - 02 - 2025)',
                'Legacy research report document staged for manual review: Daily Market Report (28 - 02 - 2025).',
                'This legacy research document has been staged from extractable document text and filename. The draft title and category require reviewer validation before any upload, access change, or publication decision. Topic cue: Daily Market Report (28 - 02 - 2025).',
                'review',
                '2025-02-28'
            )
            RETURNING id INTO v_report_id;
        END $$;

        DO $$
        DECLARE
            v_category_id uuid;
            v_report_id uuid;
        BEGIN
            SELECT id INTO v_category_id FROM public.research_categories WHERE slug = 'research-report';
            
            INSERT INTO public.research_reports (
                category_id, display_title, short_summary, research_synopsis, publish_status, published_at
            ) VALUES (
                v_category_id,
                'Daily Market Report (01 - 06 - 2025)',
                'Legacy research report document staged for manual review: Daily Market Report (01 - 06 - 2025).',
                'This legacy research document has been staged from extractable document text and filename. The draft title and category require reviewer validation before any upload, access change, or publication decision. Topic cue: Daily Market Report (01 - 06 - 2025).',
                'review',
                '2025-01-06'
            )
            RETURNING id INTO v_report_id;
        END $$;

        DO $$
        DECLARE
            v_category_id uuid;
            v_report_id uuid;
        BEGIN
            SELECT id INTO v_category_id FROM public.research_categories WHERE slug = 'research-report';
            
            INSERT INTO public.research_reports (
                category_id, display_title, short_summary, research_synopsis, publish_status, published_at
            ) VALUES (
                v_category_id,
                'Daily Market Report (01 - 07 - 2025)',
                'Legacy research report document staged for manual review: Daily Market Report (01 - 07 - 2025).',
                'This legacy research document has been staged from extractable document text and filename. The draft title and category require reviewer validation before any upload, access change, or publication decision. Topic cue: Daily Market Report (01 - 07 - 2025).',
                'review',
                '2025-01-07'
            )
            RETURNING id INTO v_report_id;
        END $$;

        DO $$
        DECLARE
            v_category_id uuid;
            v_report_id uuid;
        BEGIN
            SELECT id INTO v_category_id FROM public.research_categories WHERE slug = 'research-report';
            
            INSERT INTO public.research_reports (
                category_id, display_title, short_summary, research_synopsis, publish_status, published_at
            ) VALUES (
                v_category_id,
                'Daily Market Report (01 - 09 - 2025)',
                'Legacy research report document staged for manual review: Daily Market Report (01 - 09 - 2025).',
                'This legacy research document has been staged from extractable document text and filename. The draft title and category require reviewer validation before any upload, access change, or publication decision. Topic cue: Daily Market Report (01 - 09 - 2025).',
                'review',
                '2025-01-09'
            )
            RETURNING id INTO v_report_id;
        END $$;

        DO $$
        DECLARE
            v_category_id uuid;
            v_report_id uuid;
        BEGIN
            SELECT id INTO v_category_id FROM public.research_categories WHERE slug = 'research-report';
            
            INSERT INTO public.research_reports (
                category_id, display_title, short_summary, research_synopsis, publish_status, published_at
            ) VALUES (
                v_category_id,
                'Daily Market Report (01 - 10 - 2025)',
                'Legacy research report document staged for manual review: Daily Market Report (01 - 10 - 2025).',
                'This legacy research document has been staged from extractable document text and filename. The draft title and category require reviewer validation before any upload, access change, or publication decision. Topic cue: Daily Market Report (01 - 10 - 2025).',
                'review',
                '2025-01-10'
            )
            RETURNING id INTO v_report_id;
        END $$;

        DO $$
        DECLARE
            v_category_id uuid;
            v_report_id uuid;
        BEGIN
            SELECT id INTO v_category_id FROM public.research_categories WHERE slug = 'research-report';
            
            INSERT INTO public.research_reports (
                category_id, display_title, short_summary, research_synopsis, publish_status, published_at
            ) VALUES (
                v_category_id,
                'Daily Market Report (01 - 13 - 2025)',
                'Legacy research report document staged for manual review: Daily Market Report (01 - 13 - 2025).',
                'This legacy research document has been staged from extractable document text and filename. The draft title and category require reviewer validation before any upload, access change, or publication decision. Topic cue: Daily Market Report (01 - 13 - 2025).',
                'review',
                '2025-01-13'
            )
            RETURNING id INTO v_report_id;
        END $$;

        DO $$
        DECLARE
            v_category_id uuid;
            v_report_id uuid;
        BEGIN
            SELECT id INTO v_category_id FROM public.research_categories WHERE slug = 'research-report';
            
            INSERT INTO public.research_reports (
                category_id, display_title, short_summary, research_synopsis, publish_status, published_at
            ) VALUES (
                v_category_id,
                'Daily Market Report (01 - 14 - 2025)',
                'Legacy research report document staged for manual review: Daily Market Report (01 - 14 - 2025).',
                'This legacy research document has been staged from extractable document text and filename. The draft title and category require reviewer validation before any upload, access change, or publication decision. Topic cue: Daily Market Report (01 - 14 - 2025).',
                'review',
                '2025-01-14'
            )
            RETURNING id INTO v_report_id;
        END $$;

        DO $$
        DECLARE
            v_category_id uuid;
            v_report_id uuid;
        BEGIN
            SELECT id INTO v_category_id FROM public.research_categories WHERE slug = 'research-report';
            
            INSERT INTO public.research_reports (
                category_id, display_title, short_summary, research_synopsis, publish_status, published_at
            ) VALUES (
                v_category_id,
                'Daily Market Report (01 - 15 - 2025)',
                'Legacy research report document staged for manual review: Daily Market Report (01 - 15 - 2025).',
                'This legacy research document has been staged from extractable document text and filename. The draft title and category require reviewer validation before any upload, access change, or publication decision. Topic cue: Daily Market Report (01 - 15 - 2025).',
                'review',
                '2025-01-15'
            )
            RETURNING id INTO v_report_id;
        END $$;

        DO $$
        DECLARE
            v_category_id uuid;
            v_report_id uuid;
        BEGIN
            SELECT id INTO v_category_id FROM public.research_categories WHERE slug = 'research-report';
            
            INSERT INTO public.research_reports (
                category_id, display_title, short_summary, research_synopsis, publish_status, published_at
            ) VALUES (
                v_category_id,
                'Daily Market Report (01 - 16 - 2025)',
                'Legacy research report document staged for manual review: Daily Market Report (01 - 16 - 2025).',
                'This legacy research document has been staged from extractable document text and filename. The draft title and category require reviewer validation before any upload, access change, or publication decision. Topic cue: Daily Market Report (01 - 16 - 2025).',
                'review',
                '2025-01-16'
            )
            RETURNING id INTO v_report_id;
        END $$;

        DO $$
        DECLARE
            v_category_id uuid;
            v_report_id uuid;
        BEGIN
            SELECT id INTO v_category_id FROM public.research_categories WHERE slug = 'research-report';
            
            INSERT INTO public.research_reports (
                category_id, display_title, short_summary, research_synopsis, publish_status, published_at
            ) VALUES (
                v_category_id,
                'Daily Market Report (01 - 17 - 2025)',
                'Legacy research report document staged for manual review: Daily Market Report (01 - 17 - 2025).',
                'This legacy research document has been staged from extractable document text and filename. The draft title and category require reviewer validation before any upload, access change, or publication decision. Topic cue: Daily Market Report (01 - 17 - 2025).',
                'review',
                '2025-01-17'
            )
            RETURNING id INTO v_report_id;
        END $$;

        DO $$
        DECLARE
            v_category_id uuid;
            v_report_id uuid;
        BEGIN
            SELECT id INTO v_category_id FROM public.research_categories WHERE slug = 'research-report';
            
            INSERT INTO public.research_reports (
                category_id, display_title, short_summary, research_synopsis, publish_status, published_at
            ) VALUES (
                v_category_id,
                'Daily Market Report (01 - 20 - 2025)',
                'Legacy research report document staged for manual review: Daily Market Report (01 - 20 - 2025).',
                'This legacy research document has been staged from extractable document text and filename. The draft title and category require reviewer validation before any upload, access change, or publication decision. Topic cue: Daily Market Report (01 - 20 - 2025).',
                'review',
                '2025-01-20'
            )
            RETURNING id INTO v_report_id;
        END $$;

        DO $$
        DECLARE
            v_category_id uuid;
            v_report_id uuid;
        BEGIN
            SELECT id INTO v_category_id FROM public.research_categories WHERE slug = 'research-report';
            
            INSERT INTO public.research_reports (
                category_id, display_title, short_summary, research_synopsis, publish_status, published_at
            ) VALUES (
                v_category_id,
                'Daily Market Report (01 - 21 - 2025)',
                'Legacy research report document staged for manual review: Daily Market Report (01 - 21 - 2025).',
                'This legacy research document has been staged from extractable document text and filename. The draft title and category require reviewer validation before any upload, access change, or publication decision. Topic cue: Daily Market Report (01 - 21 - 2025).',
                'review',
                '2025-01-21'
            )
            RETURNING id INTO v_report_id;
        END $$;

        DO $$
        DECLARE
            v_category_id uuid;
            v_report_id uuid;
        BEGIN
            SELECT id INTO v_category_id FROM public.research_categories WHERE slug = 'research-report';
            
            INSERT INTO public.research_reports (
                category_id, display_title, short_summary, research_synopsis, publish_status, published_at
            ) VALUES (
                v_category_id,
                'Daily Market Report (01 - 22 - 2025)',
                'Legacy research report document staged for manual review: Daily Market Report (01 - 22 - 2025).',
                'This legacy research document has been staged from extractable document text and filename. The draft title and category require reviewer validation before any upload, access change, or publication decision. Topic cue: Daily Market Report (01 - 22 - 2025).',
                'review',
                '2025-01-22'
            )
            RETURNING id INTO v_report_id;
        END $$;

        DO $$
        DECLARE
            v_category_id uuid;
            v_report_id uuid;
        BEGIN
            SELECT id INTO v_category_id FROM public.research_categories WHERE slug = 'research-report';
            
            INSERT INTO public.research_reports (
                category_id, display_title, short_summary, research_synopsis, publish_status, published_at
            ) VALUES (
                v_category_id,
                'Daily Market Report (01 - 23 - 2025)',
                'Legacy research report document staged for manual review: Daily Market Report (01 - 23 - 2025).',
                'This legacy research document has been staged from extractable document text and filename. The draft title and category require reviewer validation before any upload, access change, or publication decision. Topic cue: Daily Market Report (01 - 23 - 2025).',
                'review',
                '2025-01-23'
            )
            RETURNING id INTO v_report_id;
        END $$;

        DO $$
        DECLARE
            v_category_id uuid;
            v_report_id uuid;
        BEGIN
            SELECT id INTO v_category_id FROM public.research_categories WHERE slug = 'research-report';
            
            INSERT INTO public.research_reports (
                category_id, display_title, short_summary, research_synopsis, publish_status, published_at
            ) VALUES (
                v_category_id,
                'Daily Market Report (01 - 24 - 2025)',
                'Legacy research report document staged for manual review: Daily Market Report (01 - 24 - 2025).',
                'This legacy research document has been staged from extractable document text and filename. The draft title and category require reviewer validation before any upload, access change, or publication decision. Topic cue: Daily Market Report (01 - 24 - 2025).',
                'review',
                '2025-01-24'
            )
            RETURNING id INTO v_report_id;
        END $$;

        DO $$
        DECLARE
            v_category_id uuid;
            v_report_id uuid;
        BEGIN
            SELECT id INTO v_category_id FROM public.research_categories WHERE slug = 'research-report';
            
            INSERT INTO public.research_reports (
                category_id, display_title, short_summary, research_synopsis, publish_status, published_at
            ) VALUES (
                v_category_id,
                'Daily Market Report (01 - 27 - 2025)',
                'Legacy research report document staged for manual review: Daily Market Report (01 - 27 - 2025).',
                'This legacy research document has been staged from extractable document text and filename. The draft title and category require reviewer validation before any upload, access change, or publication decision. Topic cue: Daily Market Report (01 - 27 - 2025).',
                'review',
                '2025-01-27'
            )
            RETURNING id INTO v_report_id;
        END $$;

        DO $$
        DECLARE
            v_category_id uuid;
            v_report_id uuid;
        BEGIN
            SELECT id INTO v_category_id FROM public.research_categories WHERE slug = 'research-report';
            
            INSERT INTO public.research_reports (
                category_id, display_title, short_summary, research_synopsis, publish_status, published_at
            ) VALUES (
                v_category_id,
                'Daily Market Report (01 - 28 - 2025)',
                'Legacy research report document staged for manual review: Daily Market Report (01 - 28 - 2025).',
                'This legacy research document has been staged from extractable document text and filename. The draft title and category require reviewer validation before any upload, access change, or publication decision. Topic cue: Daily Market Report (01 - 28 - 2025).',
                'review',
                '2025-01-28'
            )
            RETURNING id INTO v_report_id;
        END $$;

        DO $$
        DECLARE
            v_category_id uuid;
            v_report_id uuid;
        BEGIN
            SELECT id INTO v_category_id FROM public.research_categories WHERE slug = 'research-report';
            
            INSERT INTO public.research_reports (
                category_id, display_title, short_summary, research_synopsis, publish_status, published_at
            ) VALUES (
                v_category_id,
                'Daily Market Report (01 - 29 - 2025)',
                'Legacy research report document staged for manual review: Daily Market Report (01 - 29 - 2025).',
                'This legacy research document has been staged from extractable document text and filename. The draft title and category require reviewer validation before any upload, access change, or publication decision. Topic cue: Daily Market Report (01 - 29 - 2025).',
                'review',
                '2025-01-29'
            )
            RETURNING id INTO v_report_id;
        END $$;

        DO $$
        DECLARE
            v_category_id uuid;
            v_report_id uuid;
        BEGIN
            SELECT id INTO v_category_id FROM public.research_categories WHERE slug = 'research-report';
            
            INSERT INTO public.research_reports (
                category_id, display_title, short_summary, research_synopsis, publish_status, published_at
            ) VALUES (
                v_category_id,
                'Daily Market Report (01 - 30 - 2025)',
                'Legacy research report document staged for manual review: Daily Market Report (01 - 30 - 2025).',
                'This legacy research document has been staged from extractable document text and filename. The draft title and category require reviewer validation before any upload, access change, or publication decision. Topic cue: Daily Market Report (01 - 30 - 2025).',
                'review',
                '2025-01-30'
            )
            RETURNING id INTO v_report_id;
        END $$;

        DO $$
        DECLARE
            v_category_id uuid;
            v_report_id uuid;
        BEGIN
            SELECT id INTO v_category_id FROM public.research_categories WHERE slug = 'research-report';
            
            INSERT INTO public.research_reports (
                category_id, display_title, short_summary, research_synopsis, publish_status, published_at
            ) VALUES (
                v_category_id,
                'Daily Market Report (01 - 31 - 2025)',
                'Legacy research report document staged for manual review: Daily Market Report (01 - 31 - 2025).',
                'This legacy research document has been staged from extractable document text and filename. The draft title and category require reviewer validation before any upload, access change, or publication decision. Topic cue: Daily Market Report (01 - 31 - 2025).',
                'review',
                '2025-01-31'
            )
            RETURNING id INTO v_report_id;
        END $$;

        DO $$
        DECLARE
            v_category_id uuid;
            v_report_id uuid;
        BEGIN
            SELECT id INTO v_category_id FROM public.research_categories WHERE slug = 'research-report';
            
            INSERT INTO public.research_reports (
                category_id, display_title, short_summary, research_synopsis, publish_status, published_at
            ) VALUES (
                v_category_id,
                'Daily Market Report (1 - 02 - 2025).',
                'Legacy research report document staged for manual review: Daily Market Report (1 - 02 - 2025)..',
                'This legacy research document has been staged from extractable document text and filename. The draft title and category require reviewer validation before any upload, access change, or publication decision. Topic cue: Daily Market Report (1 - 02 - 2025)..',
                'review',
                '2025-01-02'
            )
            RETURNING id INTO v_report_id;
        END $$;

        DO $$
        DECLARE
            v_category_id uuid;
            v_report_id uuid;
        BEGIN
            SELECT id INTO v_category_id FROM public.research_categories WHERE slug = 'research-report';
            
            INSERT INTO public.research_reports (
                category_id, display_title, short_summary, research_synopsis, publish_status, published_at
            ) VALUES (
                v_category_id,
                'Daily Market Report (1 - 03 - 2025)',
                'Legacy research report document staged for manual review: Daily Market Report (1 - 03 - 2025).',
                'This legacy research document has been staged from extractable document text and filename. The draft title and category require reviewer validation before any upload, access change, or publication decision. Topic cue: Daily Market Report (1 - 03 - 2025).',
                'review',
                '2025-01-03'
            )
            RETURNING id INTO v_report_id;
        END $$;

        DO $$
        DECLARE
            v_category_id uuid;
            v_report_id uuid;
        BEGIN
            SELECT id INTO v_category_id FROM public.research_categories WHERE slug = 'research-report';
            
            INSERT INTO public.research_reports (
                category_id, display_title, short_summary, research_synopsis, publish_status, published_at
            ) VALUES (
                v_category_id,
                'Daily Market Report (02 - 07 - 2025)',
                'Legacy research report document staged for manual review: Daily Market Report (02 - 07 - 2025).',
                'This legacy research document has been staged from extractable document text and filename. The draft title and category require reviewer validation before any upload, access change, or publication decision. Topic cue: Daily Market Report (02 - 07 - 2025).',
                'review',
                '2025-07-02'
            )
            RETURNING id INTO v_report_id;
        END $$;

        DO $$
        DECLARE
            v_category_id uuid;
            v_report_id uuid;
        BEGIN
            SELECT id INTO v_category_id FROM public.research_categories WHERE slug = 'research-report';
            
            INSERT INTO public.research_reports (
                category_id, display_title, short_summary, research_synopsis, publish_status, published_at
            ) VALUES (
                v_category_id,
                'Daily Market Report (03 - 07 - 2025)',
                'Legacy research report document staged for manual review: Daily Market Report (03 - 07 - 2025).',
                'This legacy research document has been staged from extractable document text and filename. The draft title and category require reviewer validation before any upload, access change, or publication decision. Topic cue: Daily Market Report (03 - 07 - 2025).',
                'review',
                '2025-07-03'
            )
            RETURNING id INTO v_report_id;
        END $$;

        DO $$
        DECLARE
            v_category_id uuid;
            v_report_id uuid;
        BEGIN
            SELECT id INTO v_category_id FROM public.research_categories WHERE slug = 'research-report';
            
            INSERT INTO public.research_reports (
                category_id, display_title, short_summary, research_synopsis, publish_status, published_at
            ) VALUES (
                v_category_id,
                'Daily Market Report (04 - 07 - 2025)',
                'Legacy research report document staged for manual review: Daily Market Report (04 - 07 - 2025).',
                'This legacy research document has been staged from extractable document text and filename. The draft title and category require reviewer validation before any upload, access change, or publication decision. Topic cue: Daily Market Report (04 - 07 - 2025).',
                'review',
                '2025-07-04'
            )
            RETURNING id INTO v_report_id;
        END $$;

        DO $$
        DECLARE
            v_category_id uuid;
            v_report_id uuid;
        BEGIN
            SELECT id INTO v_category_id FROM public.research_categories WHERE slug = 'research-report';
            
            INSERT INTO public.research_reports (
                category_id, display_title, short_summary, research_synopsis, publish_status, published_at
            ) VALUES (
                v_category_id,
                'Daily Market Report (07 - 07 - 2025)',
                'Legacy research report document staged for manual review: Daily Market Report (07 - 07 - 2025).',
                'This legacy research document has been staged from extractable document text and filename. The draft title and category require reviewer validation before any upload, access change, or publication decision. Topic cue: Daily Market Report (07 - 07 - 2025).',
                'review',
                '2025-07-07'
            )
            RETURNING id INTO v_report_id;
        END $$;

        DO $$
        DECLARE
            v_category_id uuid;
            v_report_id uuid;
        BEGIN
            SELECT id INTO v_category_id FROM public.research_categories WHERE slug = 'research-report';
            
            INSERT INTO public.research_reports (
                category_id, display_title, short_summary, research_synopsis, publish_status, published_at
            ) VALUES (
                v_category_id,
                'Daily Market Report (08 - 07 - 2025)',
                'Legacy research report document staged for manual review: Daily Market Report (08 - 07 - 2025).',
                'This legacy research document has been staged from extractable document text and filename. The draft title and category require reviewer validation before any upload, access change, or publication decision. Topic cue: Daily Market Report (08 - 07 - 2025).',
                'review',
                '2025-07-08'
            )
            RETURNING id INTO v_report_id;
        END $$;

        DO $$
        DECLARE
            v_category_id uuid;
            v_report_id uuid;
        BEGIN
            SELECT id INTO v_category_id FROM public.research_categories WHERE slug = 'research-report';
            
            INSERT INTO public.research_reports (
                category_id, display_title, short_summary, research_synopsis, publish_status, published_at
            ) VALUES (
                v_category_id,
                'Daily Market Report (09 - 07 - 2025)',
                'Legacy research report document staged for manual review: Daily Market Report (09 - 07 - 2025).',
                'This legacy research document has been staged from extractable document text and filename. The draft title and category require reviewer validation before any upload, access change, or publication decision. Topic cue: Daily Market Report (09 - 07 - 2025).',
                'review',
                '2025-07-09'
            )
            RETURNING id INTO v_report_id;
        END $$;

        DO $$
        DECLARE
            v_category_id uuid;
            v_report_id uuid;
        BEGIN
            SELECT id INTO v_category_id FROM public.research_categories WHERE slug = 'research-report';
            
            INSERT INTO public.research_reports (
                category_id, display_title, short_summary, research_synopsis, publish_status, published_at
            ) VALUES (
                v_category_id,
                'Daily Market Report (10 - 07 - 2025)',
                'Legacy research report document staged for manual review: Daily Market Report (10 - 07 - 2025).',
                'This legacy research document has been staged from extractable document text and filename. The draft title and category require reviewer validation before any upload, access change, or publication decision. Topic cue: Daily Market Report (10 - 07 - 2025).',
                'review',
                '2025-07-10'
            )
            RETURNING id INTO v_report_id;
        END $$;

        DO $$
        DECLARE
            v_category_id uuid;
            v_report_id uuid;
        BEGIN
            SELECT id INTO v_category_id FROM public.research_categories WHERE slug = 'research-report';
            
            INSERT INTO public.research_reports (
                category_id, display_title, short_summary, research_synopsis, publish_status, published_at
            ) VALUES (
                v_category_id,
                'Daily Market Report (11 - 07 - 2025)',
                'Legacy research report document staged for manual review: Daily Market Report (11 - 07 - 2025).',
                'This legacy research document has been staged from extractable document text and filename. The draft title and category require reviewer validation before any upload, access change, or publication decision. Topic cue: Daily Market Report (11 - 07 - 2025).',
                'review',
                '2025-07-11'
            )
            RETURNING id INTO v_report_id;
        END $$;

        DO $$
        DECLARE
            v_category_id uuid;
            v_report_id uuid;
        BEGIN
            SELECT id INTO v_category_id FROM public.research_categories WHERE slug = 'research-report';
            
            INSERT INTO public.research_reports (
                category_id, display_title, short_summary, research_synopsis, publish_status, published_at
            ) VALUES (
                v_category_id,
                'Daily Market Report (14 - 06 - 2025)',
                'Legacy research report document staged for manual review: Daily Market Report (14 - 06 - 2025).',
                'This legacy research document has been staged from extractable document text and filename. The draft title and category require reviewer validation before any upload, access change, or publication decision. Topic cue: Daily Market Report (14 - 06 - 2025).',
                'review',
                '2025-07-14'
            )
            RETURNING id INTO v_report_id;
        END $$;

        DO $$
        DECLARE
            v_category_id uuid;
            v_report_id uuid;
        BEGIN
            SELECT id INTO v_category_id FROM public.research_categories WHERE slug = 'research-report';
            
            INSERT INTO public.research_reports (
                category_id, display_title, short_summary, research_synopsis, publish_status, published_at
            ) VALUES (
                v_category_id,
                'Equities Market Update 2025',
                'Legacy research report document staged for manual review: Equities Market Update 2025.',
                'This legacy research document has been staged from extractable document text and filename. The draft title and category require reviewer validation before any upload, access change, or publication decision. Topic cue: Equities Market Update 2025.',
                'review',
                '2025-08-14'
            )
            RETURNING id INTO v_report_id;
        END $$;