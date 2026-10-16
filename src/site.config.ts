// Central, config-driven site settings. Public IDs only; never put secrets here.
const env = import.meta.env ?? {};

export const site = {
  domain: 'stockmarketnews.online',
  url: 'https://stockmarketnews.online',
  name: 'The Filings Docket',
  legalName: 'stockmarketnews.online',
  tagline: 'Corporate filings, explained',
  description:
    'The Filings Docket at stockmarketnews.online tracks SEC EDGAR filings from 100 large U.S. public companies and explains each 8-K, 10-Q, 10-K, proxy and ownership filing in plain English, with links to the original documents.',
  locale: 'en-US',
  lang: 'en',
  contactEmail: 'contact@stockmarketnews.online',
  ga4Id: (env.PUBLIC_GA4_ID as string | undefined) ?? '',
  gscVerification: (env.PUBLIC_GSC_VERIFICATION as string | undefined) ?? '',
  naverVerification: '',
  adsenseClient: 'ca-pub-4490818204529253',
  /** Ad loading is OFF unless the build sets PUBLIC_ADS_ENABLED=true (AdSense account / certified CMP not yet verified). */
  adsEnabled: env.PUBLIC_ADS_ENABLED === 'true',
  /** IndexNow key; the matching key file is public/<key>.txt */
  indexNowKey: '6f1c3a9e2b7d4e58a0c94f17d2b8e3a1',
  /** Affiliate URLs (none configured; CTAs render only when set). */
  affiliates: {} as Record<string, string>,
  secUserAgent: 'stockmarketnews.online filings desk contact@stockmarketnews.online',
  /** Content launch date, used as datePublished for site-level pages. */
  launched: '2026-10-15',
} as const;

export type SiteConfig = typeof site;
