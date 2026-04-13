import { NextRequest, NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

function detectSite(url: string): 'garhwalii' | 'garhwalisonglyrics' | 'unknown' {
  if (url.includes('garhwalii.com')) return 'garhwalii';
  if (url.includes('garhwalisonglyrics.com')) return 'garhwalisonglyrics';
  return 'unknown';
}

function cleanText(text: string): string {
  return text
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

async function scrapeGarhwalii(url: string) {
  const res = await fetch(url, {
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' },
  });
  if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
  const html = await res.text();
  const $ = cheerio.load(html);

  const title = $('h1.post-title, h1.entry-title').first().text().trim();

  // Extract full post body text
  const bodyEl = $('.post-body, .entry-content').first();

  // Try to find singer from text like "Singer: X" or "Singer : X"
  const bodyText = bodyEl.text();
  const singerMatch = bodyText.match(/Singer\s*[:\-]\s*([^\n]+)/i);
  const artist = singerMatch ? singerMatch[1].trim() : '';

  // Get image — first img inside post body, or OG image
  let image = '';
  const bodyImg = bodyEl.find('img').first().attr('src') || '';
  const ogImg = $('meta[property="og:image"]').attr('content') || '';
  image = bodyImg || ogImg;

  // Extract lyrics — get text content, strip non-lyric lines
  // Remove lines that look like metadata (Singer:, Label:, etc.)
  const rawLines = bodyText.split('\n').map(l => l.trim()).filter(Boolean);
  const lyricsLines: string[] = [];
  let inLyrics = false;
  for (const line of rawLines) {
    if (/^(Singer|Label|Music|Lyrics by|Album|Released|Category|Posted|Share|Tags)/i.test(line)) continue;
    if (line.length > 2) {
      inLyrics = true;
    }
    if (inLyrics && line.length > 0) {
      lyricsLines.push(line);
    }
  }
  const lyrics_original = cleanText(lyricsLines.join('\n'));

  // Get labels/tags for occasion hint
  const labels: string[] = [];
  $('a[href*="/search/label/"]').each((_, el) => {
    labels.push($(el).text().trim());
  });

  return { title, artist, lyrics_original, image, tags: labels };
}

async function scrapeGarhwaliSongLyrics(url: string) {
  const res = await fetch(url, {
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' },
  });
  if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
  const html = await res.text();
  const $ = cheerio.load(html);

  const title = $('article h1, main h1').first().text().trim();

  // Image — first img in article
  let image = $('article img, main img').first().attr('src') || '';
  // Fix relative URLs
  if (image.startsWith('/')) image = 'https://garhwalisonglyrics.com' + image;
  // Next.js image proxy — extract actual src
  const srcMatch = image.match(/[?&]url=([^&]+)/);
  if (srcMatch) image = decodeURIComponent(srcMatch[1]);

  // Artist — look in metadata list items or headers near title
  const metaText = $('article ul').first().text();
  const artist = metaText.replace(/[^\w\s]/g, '').trim().split(/\s{2,}/)[0] || '';

  // Lyrics — collect all <p> tags inside the content div
  const contentEl = $('article .content, article [class*="content"]').first();
  const lyricsLines: string[] = [];
  contentEl.find('p').each((_, el) => {
    const t = $(el).text().trim();
    if (t) lyricsLines.push(t);
  });
  // Fallback: all <p> in article
  if (lyricsLines.length === 0) {
    $('article p').each((_, el) => {
      const t = $(el).text().trim();
      if (t) lyricsLines.push(t);
    });
  }
  const lyrics_original = cleanText(lyricsLines.join('\n'));

  return { title, artist, lyrics_original, image, tags: [] };
}

export async function POST(req: NextRequest) {
  const { url } = await req.json();
  if (!url) return NextResponse.json({ error: 'URL is required' }, { status: 400 });

  const site = detectSite(url);
  if (site === 'unknown') {
    return NextResponse.json({ error: 'Unsupported site. Use garhwalii.com or garhwalisonglyrics.com' }, { status: 400 });
  }

  try {
    const data = site === 'garhwalii'
      ? await scrapeGarhwalii(url)
      : await scrapeGarhwaliSongLyrics(url);

    return NextResponse.json({ ...data, source_url: url, site });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to scrape page';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
