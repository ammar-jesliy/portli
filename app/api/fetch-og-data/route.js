import axios from 'axios';
import { load } from 'cheerio';

export async function POST(request) {
  const { url } = await request.json();

  try {
    const { data } = await axios.get(url);
    const $ = load(data);

    const metaTags = {};
    $('meta').each((i, el) => {
      const property = $(el).attr('property') || $(el).attr('name');
      const content = $(el).attr('content');
      if (property && content) {
        metaTags[property] = content;
      }
    });

    // Extract the favicon
    let favicon = $('link[rel="icon"]').attr('href') || $('link[rel="shortcut icon"]').attr('href');
    if (!favicon) {
      // Try to find the favicon using other common rel values
      favicon = $('link[rel="apple-touch-icon"]').attr('href') || $('link[rel="icon"]').attr('href');
    }

    // If the favicon URL is relative, convert it to an absolute URL
    if (favicon && !favicon.startsWith('http')) {
      const urlObj = new URL(url);
      favicon = `${urlObj.origin}${favicon.startsWith('/') ? '' : '/'}${favicon}`;
    }

    return new Response(JSON.stringify({ metaTags, favicon }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch OG data' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}