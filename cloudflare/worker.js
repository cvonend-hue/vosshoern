const contentTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
  '.svg': 'image/svg+xml',
  '.jpg': 'image/jpeg'
};

function equal(a, b) {
  const left = new TextEncoder().encode(a);
  const right = new TextEncoder().encode(b);
  let difference = left.length ^ right.length;
  for (let i = 0; i < Math.max(left.length, right.length); i++) {
    difference |= (left[i] || 0) ^ (right[i] || 0);
  }
  return difference === 0;
}

function authorized(request, password) {
  const header = request.headers.get('Authorization') || '';
  if (!header.startsWith('Basic ')) return false;
  try {
    const credentials = atob(header.slice(6));
    const separator = credentials.indexOf(':');
    return separator > -1 && equal(credentials.slice(0, separator), 'gast') && equal(credentials.slice(separator + 1), password);
  } catch {
    return false;
  }
}

export default {
  async fetch(request, env) {
    if (!env.DEMO_PASSWORD || !authorized(request, env.DEMO_PASSWORD)) {
      return new Response('Die Vosshörn-Demo ist passwortgeschützt.', {
        status: 401,
        headers: {
          'WWW-Authenticate': 'Basic realm="Das Vosshörn Demo", charset="UTF-8"',
          'Cache-Control': 'no-store',
          'Content-Type': 'text/plain; charset=utf-8'
        }
      });
    }

    const pathname = new URL(request.url).pathname;
    const staticFile = pathname === '/styles.css' || pathname === '/app.js' || pathname === '/i18n.js' || /^\/assets\/(?:gallery\/)?[a-z0-9-]+\.(webp|woff2|svg|jpg)$/.test(pathname);
    const file = staticFile ? pathname : '/index.html';
    const revision = env.SOURCE_REVISION || 'main';
    const source = `https://raw.githubusercontent.com/cvonend-hue/vosshoern/${revision}/site${file}`;
    // The revision is immutable, so Cloudflare can reuse the source file at its edge.
    // Authentication still runs first; browsers receive no-store below.
    const upstream = await fetch(source, {cf: {cacheEverything: true, cacheTtl: 86400}});
    if (!upstream.ok) return new Response('Datei konnte nicht geladen werden.', {status: 502});

    const extension = file.slice(file.lastIndexOf('.'));
    const headers = {
      'Content-Type': contentTypes[extension] || 'application/octet-stream',
      'Cache-Control': 'no-store, max-age=0',
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'X-Frame-Options': 'DENY',
      'Content-Security-Policy': "default-src 'none'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self'; font-src 'self'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'"
    };
    if (extension === '.html') headers['Clear-Site-Data'] = '"cache"';

    return new Response(upstream.body, {
      status: 200,
      headers
    });
  }
};
