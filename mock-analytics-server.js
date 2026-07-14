const http = require('http');

const PORT = 3001;

const siteProfiles = {
  'google.com': { visits: 9000000000, pagesPerSession: 8, bounceRate: 25, perf: 98 },
  'facebook.com': { visits: 2500000000, pagesPerSession: 6, bounceRate: 35, perf: 88 },
  'youtube.com': { visits: 25000000000, pagesPerSession: 7, bounceRate: 30, perf: 92 },
  'amazon.com': { visits: 5000000000, pagesPerSession: 5, bounceRate: 40, perf: 86 },
  'wikipedia.org': { visits: 2000000000, pagesPerSession: 4, bounceRate: 45, perf: 90 },
  'twitter.com': { visits: 1500000000, pagesPerSession: 5, bounceRate: 50, perf: 84 },
  'instagram.com': { visits: 1400000000, pagesPerSession: 6, bounceRate: 40, perf: 87 },
};

function makeAnalyticsForUrl(targetUrl) {
  let hostname = 'example.com';
  try {
    hostname = new URL(targetUrl).hostname.replace(/^www\./, '');
  } catch (e) {
    // leave hostname as example.com
  }

  const profile = siteProfiles[hostname] || null;

  const estimated_visits = profile ? profile.visits : Math.floor(Math.random() * 500000) + 1000;
  const pages_per_session = profile ? profile.pagesPerSession : +(Math.random() * 3 + 1).toFixed(1);
  const bounce_rate = profile ? profile.bounceRate : Math.floor(Math.random() * 60) + 20;
  const perfScore = profile ? profile.perf : Math.floor(Math.random() * 30) + 65;

  return {
    performance: {
      performance_score: perfScore,
      first_contentful_paint: Math.max(400, Math.floor(2000 - perfScore * 10)),
      largest_contentful_paint: Math.max(800, Math.floor(3000 - perfScore * 12)),
      speed_index: Math.max(700, Math.floor(2000 - perfScore * 9)),
      time_to_interactive: Math.max(800, Math.floor(3500 - perfScore * 11)),
      total_blocking_time: Math.max(50, Math.floor((100 - perfScore) * 4)),
      cumulative_layout_shift: +(Math.max(0.01, (100 - perfScore) / 1000).toFixed(3)),
    },
    seo: {
      title: hostname,
      description: `Analytics summary for ${hostname}`,
      keywords: [],
      h1_tags: [hostname],
      images_without_alt: Math.floor(Math.random() * 3),
      internal_links: Math.floor(Math.random() * 50) + 1,
      external_links: Math.floor(Math.random() * 20),
    },
    traffic: {
      estimated_visits,
      bounce_rate,
      pages_per_session,
      avg_session_duration: Math.floor(pages_per_session * 60),
      top_countries: ['US', 'IN', 'BR'],
      traffic_sources: {
        direct: Math.round(estimated_visits * 0.35),
        organic_search: Math.round(estimated_visits * 0.45),
        social: Math.round(estimated_visits * 0.12),
        referral: Math.round(estimated_visits * 0.05),
        paid_search: Math.round(estimated_visits * 0.03),
      },
    },
    security: {
      https_enabled: true,
      security_headers: {
        content_security_policy: true,
        x_frame_options: true,
        x_content_type_options: true,
        strict_transport_security: true,
      },
      ssl_certificate: true,
      security_score: Math.min(100, perfScore + 5),
    },
  };
}

const server = http.createServer((req, res) => {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-api-key, x-client-id');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.method === 'POST' && req.url === '/analytics/analyze') {
    let body = '';
    req.on('data', (chunk) => (body += chunk));
    req.on('end', () => {
      try {
        const parsed = JSON.parse(body || '{}');
        const analytics = makeAnalyticsForUrl(parsed.url || 'https://example.com');
        const response = {
          url: parsed.url || 'https://example.com',
          timestamp: new Date().toISOString(),
          analytics,
          summary: {
            overall_score: analytics.performance.performance_score,
            recommendations: ['Consider image optimization', 'Audit third-party scripts'],
          },
        };
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(response));
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('Invalid JSON');
      }
    });
    return;
  }

  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('Not found');
});

server.listen(PORT, () => {
  console.log(`Mock analytics server listening on http://localhost:${PORT}`);
});

process.on('uncaughtException', (err) => {
  console.error('Server error:', err);
});
