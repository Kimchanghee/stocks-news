import type { Locale } from './i18n';
export type Category = { slug: string; name: Partial<Record<Locale, string>>; };
export type RSSSource = { url: string; category: string; weight?: number; };
export const channel = {
  id: 'STOCKS',
  name: '글로벌스톡펄스',
  tagline: '코스피·S&P·나스닥 종목과 시장을 한눈에',
  description: '한국·미국·일본·중국 주식시장 동향과 종목 분석을 초등생도 이해할 수 있게 풀어드립니다.',
  domain: 'stockwave.live',
  accent: 'orange',
  keywords: ['주식', '코스피', '나스닥', 'S&P500', '종목분석', '실적'],
  geo: { country: 'KR', region: 'Asia', primaryCity: 'Seoul' },
  rssSources: [
    { url: 'https://www.mk.co.kr/rss/50200011/', category: 'market' },
    { url: 'https://www.hankyung.com/feed/finance', category: 'breaking' },
    { url: 'https://rss.mt.co.kr/mt_securities.xml', category: 'analysis' },
    { url: 'https://rss.donga.com/economy.xml', category: 'policy' },
    { url: 'https://www.yna.co.kr/rss/economy.xml', category: 'analysis' }
  ] as RSSSource[],
  categories: [
    { slug: 'breaking', name: { ko: '속보', en: 'Breaking', ja: '速報', zh: '快讯', es: 'Última hora', pt: 'Última hora', de: 'Eilmeldung', fr: 'Dernières', ar: 'عاجل', hi: 'ब्रेकिंग', id: 'Terbaru' } },
    { slug: 'market',   name: { ko: '시장', en: 'Market', ja: '市場', zh: '市场', es: 'Mercado', pt: 'Mercado', de: 'Markt', fr: 'Marché', ar: 'السوق', hi: 'बाज़ार', id: 'Pasar' } },
    { slug: 'earnings', name: { ko: '실적', en: 'Earnings', ja: '決算', zh: '业绩', es: 'Resultados', pt: 'Resultados', de: 'Quartalszahlen', fr: 'Résultats', ar: 'الأرباح', hi: 'आय', id: 'Kinerja' } },
    { slug: 'analysis', name: { ko: '분석', en: 'Analysis', ja: '分析', zh: '分析', es: 'Análisis', pt: 'Análise', de: 'Analyse', fr: 'Analyse', ar: 'تحليل', hi: 'विश्लेषण', id: 'Analisis' } }
  ] as Category[]
};
export type ChannelConfig = typeof channel;
