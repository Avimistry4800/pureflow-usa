-- Article tag enum
DO $$ BEGIN
  CREATE TYPE public.article_tag AS ENUM ('regulation', 'health', 'industry', 'guides');
EXCEPTION WHEN duplicate_object THEN null; END $$;

-- Articles
CREATE TABLE IF NOT EXISTS public.articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  excerpt text NOT NULL,
  body_md text NOT NULL,
  cover_url text,
  tag public.article_tag NOT NULL DEFAULT 'industry',
  reading_minutes int NOT NULL DEFAULT 4,
  published_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Published articles are public"
  ON public.articles FOR SELECT
  TO anon, authenticated
  USING (published_at <= now());

-- Newsletter subscribers
CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL UNIQUE,
  source_page text,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can subscribe"
  ON public.newsletter_subscribers FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    char_length(email) BETWEEN 3 AND 255
    AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
    AND (source_page IS NULL OR char_length(source_page) <= 120)
  );
-- No SELECT/UPDATE/DELETE policies → readable only via service role.

-- Timestamp trigger
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END $$;

DROP TRIGGER IF EXISTS articles_set_updated_at ON public.articles;
CREATE TRIGGER articles_set_updated_at
BEFORE UPDATE ON public.articles
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE INDEX IF NOT EXISTS articles_published_idx ON public.articles (published_at DESC);
CREATE INDEX IF NOT EXISTS articles_tag_idx ON public.articles (tag);

-- Seed articles
INSERT INTO public.articles (slug, title, excerpt, body_md, tag, reading_minutes, published_at) VALUES
('pfas-forever-chemicals-us-tap-water',
 'PFAS in US tap water: what the new EPA limits actually mean',
 'The EPA''s 2024 maximum contaminant levels finally regulate six PFAS — but compliance is years away and most utilities are unprepared.',
 E'## The forever chemicals are everywhere\n\nPer- and polyfluoroalkyl substances (PFAS) have been detected in **over 99% of Americans tested**. The EPA''s April 2024 rule sets enforceable limits of 4 parts per trillion for PFOA and PFOS — orders of magnitude lower than previous advisories.\n\n## Why home filtration matters now\n\nUtilities have until 2029 to comply. Reverse osmosis paired with activated carbon removes **>99% of PFAS** at the tap today.\n\n## What we recommend\n\n- A multi-stage RO + carbon block + DI configuration\n- Annual membrane replacement\n- Independent post-install lab test', 'health', 6, now() - interval '2 days'),

('lead-in-american-schools',
 'Lead in American schools: an infrastructure crisis hiding in plain sight',
 'Half of US school districts that tested for lead found it. There is no safe level of lead exposure for children.',
 E'## The numbers\n\nA Government Accountability Office review found **41% of school districts had not tested** for lead in the last year. Of those that did, **half found elevated levels**.\n\n## Where it comes from\n\nLead leaches from solder, brass fittings, and service lines installed before 1986. Flushing helps briefly; it doesn''t solve the problem.\n\n## Point-of-use is the only reliable answer\n\nWhole-building treatment is expensive and slow. Point-of-use RO at every drinking fixture removes **>99% of lead** immediately.', 'health', 5, now() - interval '6 days'),

('microplastics-bottled-water-study',
 'A liter of bottled water contains 240,000 plastic fragments',
 'Columbia University researchers used a new laser technique to count nanoplastics. The results were 100× higher than expected.',
 E'## The 2024 PNAS finding\n\nUsing stimulated Raman scattering microscopy, researchers at Columbia counted an average of **240,000 plastic particles per liter** of bottled water — 90% of them nanoplastics small enough to enter cells.\n\n## Why filtration beats bottling\n\nPolyethylene terephthalate sheds particles into its contents. A high-quality RO + UF system delivers water that has **never touched plastic** at the point of use.', 'industry', 4, now() - interval '12 days'),

('chlorine-byproducts-disinfection',
 'Chlorine works. Its byproducts don''t.',
 'Trihalomethanes and haloacetic acids form when chlorine meets organic matter. Long-term exposure is linked to bladder cancer.',
 E'## The disinfection paradox\n\nChlorine kills pathogens — and reacts with leaves, soil, and pipe biofilm to form **disinfection byproducts (DBPs)**. The EPA caps total trihalomethanes at 80 µg/L; many utilities run close to that ceiling.\n\n## Removing DBPs at home\n\nActivated carbon adsorbs DBPs. UV-C handles residual pathogens without adding chemistry. Together they finish what the utility started.', 'guides', 5, now() - interval '20 days'),

('reverse-osmosis-explained',
 'Reverse osmosis, explained without the marketing',
 'The semipermeable membrane is 60 years old. Here is what it actually does, what it cannot do, and why pairing matters.',
 E'## The membrane\n\nA thin-film composite membrane has pores around **0.0001 microns**. Water molecules pass under pressure; dissolved salts, metals, PFAS, and microbes don''t.\n\n## What RO doesn''t do well alone\n\nDissolved gases (chloramine, radon) and very small organics can pass. That''s why a serious system pairs RO with **carbon pre-filtration, post-DI polishing, and UV-C sterilization**.\n\n## Remineralization\n\nTrue purity tastes flat. A calcium-magnesium remineralization stage restores mouthfeel without re-introducing contaminants.', 'guides', 7, now() - interval '30 days'),

('us-water-utility-violations-2024',
 'Half of US community water systems reported a violation in 2024',
 'EPA enforcement data shows widespread non-compliance with the Safe Drinking Water Act. The gap between regulation and reality is widening.',
 E'## The compliance gap\n\nAccording to the EPA''s ECHO database, more than **50% of community water systems** had at least one Safe Drinking Water Act violation in the last reporting year. The most common: failure to monitor, followed by maximum contaminant level exceedances.\n\n## What this means for you\n\nUtility quality reports lag the actual water by months. Independent point-of-use treatment is the only way to know what comes out of your tap today.', 'regulation', 4, now() - interval '45 days')
ON CONFLICT (slug) DO NOTHING;