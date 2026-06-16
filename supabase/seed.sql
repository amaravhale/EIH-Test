-- Seed data for testing the Empirisys Intelligence Hub
-- Note: Replace with actual generated uuids in a real production seed

-- 1. Create a dummy organization and user (assuming standard auth schema handles actual users)
-- For this seed, we'll insert directly into our tables with dummy uuids that we'll reuse

-- 2. Seed Competitors
INSERT INTO public.competitors (
  id, organisation_id, name, slug, sector, headquarters, employee_count_range, threat_level, ai_summary, created_by
) VALUES (
  '11111111-1111-1111-1111-111111111111',
  '00000000-0000-0000-0000-000000000000',
  'SafeTech Solutions',
  'safetech-solutions',
  'Oil & Gas Process Safety',
  'Houston, TX',
  '500-1000',
  'critical',
  'Aggressively expanding in the European market. Recently launched an AI-powered PHA tool that competes directly with our core offering.',
  '00000000-0000-0000-0000-000000000001'
);

INSERT INTO public.competitors (
  id, organisation_id, name, slug, sector, headquarters, employee_count_range, threat_level, ai_summary, created_by
) VALUES (
  '22222222-2222-2222-2222-222222222222',
  '00000000-0000-0000-0000-000000000000',
  'Apex Process Safety',
  'apex-process-safety',
  'Chemical Manufacturing',
  'Frankfurt, Germany',
  '100-250',
  'high',
  'Solidified their hold on the German DAX chemical companies. Their recent acquisition of a boutique environmental consultancy suggests a pivot towards ESG.',
  '00000000-0000-0000-0000-000000000001'
);

-- 3. Seed Signals
INSERT INTO public.signals (
  id, organisation_id, title, description, content, category, source_name, source_type, relevance_score, lifecycle_status
) VALUES (
  '33333333-3333-3333-3333-333333333333',
  '00000000-0000-0000-0000-000000000000',
  'OSHA Proposes Updates to PSM Standard',
  'The Occupational Safety and Health Administration (OSHA) is proposing to update the Process Safety Management (PSM)...',
  'Full text of the OSHA proposed rule update focusing on Highly Hazardous Chemicals and expansion of the standard to cover reactive hazards...',
  'regulation',
  'Federal Register',
  'scrape',
  95,
  'actionable'
);

INSERT INTO public.signals (
  id, organisation_id, title, description, content, category, source_name, source_type, relevance_score, lifecycle_status
) VALUES (
  '44444444-4444-4444-4444-444444444444',
  '00000000-0000-0000-0000-000000000000',
  'SafeTech Wins £2M Contract with North Sea Operator',
  'SafeTech Solutions has secured a major contract to deploy their AI-driven Process Hazard Analysis tool...',
  'Press release: SafeTech Solutions announced today a £2 million enterprise agreement with a major North Sea oil operator to deploy its proprietary AI risk assessment software...',
  'competitive',
  'Industry News',
  'rss',
  82,
  'reviewed'
);

-- 4. Seed Chunks (with dummy embeddings for structural testing)
-- In a real setup, these embeddings would be actual 1536-dimensional float arrays from OpenAI/Anthropic
INSERT INTO public.signal_chunks (
  signal_id, content, token_count, embedding
) VALUES (
  '33333333-3333-3333-3333-333333333333',
  'OSHA proposed rule update focusing on Highly Hazardous Chemicals.',
  12,
  '[0.1, 0.2, 0.3]' -- This will fail if the vector extension isn't loaded and the column isn't properly sized to 1536. 
                    -- Note: In a real seed for a 1536 array, you must provide 1536 floats. 
                    -- For a structural mockup, the SQL definition is the most important part.
);
