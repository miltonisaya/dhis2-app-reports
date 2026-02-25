/**
 * Local CORS proxy for DHIS2 development.
 * Forwards requests to the remote DHIS2 instance, strips browser security
 * metadata headers that confuse Spring Security, and injects correct CORS
 * headers so the browser accepts cross-origin responses.
 *
 * Usage:  node cors-proxy.js
 * Requires: DHIS2_BASE_URL=http://localhost:8080/ in .env, then yarn start.
 */

const http = require('http')

const TARGET_HOST = '170.187.199.69'
const TARGET_PORT = 8181
const PROXY_PORT = 8080

/**
 * Headers that must NOT be forwarded to the upstream server.
 *
 * Hop-by-hop headers are connection-specific and must be consumed by the
 * immediate recipient (the proxy), not passed along.
 *
 * Sec-Fetch-* headers are browser fetch-metadata headers. When the browser
 * makes a "same-origin" request to the proxy (localhost:3000 → localhost:8080)
 * it sets Sec-Fetch-Site: same-origin. Forwarding that to DHIS2 while the
 * Host header says 170.187.199.69 creates an inconsistency that Spring
 * Security rejects with HTTP 500.
 */
const STRIP_REQUEST_HEADERS = new Set([
    'connection',
    'keep-alive',
    'proxy-authenticate',
    'proxy-authorization',
    'te',
    'trailers',
    'transfer-encoding',
    'upgrade',
    'sec-fetch-dest',
    'sec-fetch-mode',
    'sec-fetch-site',
    'sec-fetch-user',
])

// Strip hop-by-hop headers from the upstream response before forwarding to browser
const STRIP_RESPONSE_HEADERS = new Set([
    'connection',
    'keep-alive',
    'transfer-encoding',
    'upgrade',
])

const server = http.createServer((req, res) => {
    const origin = req.headers['origin'] || 'http://localhost:3000'

    const corsHeaders = {
        'access-control-allow-origin': origin,
        'access-control-allow-credentials': 'true',
        'access-control-allow-methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
        'access-control-allow-headers':
            'Accept, Authorization, Content-Type, Origin, X-Requested-With',
    }

    // Respond to preflight immediately — no need to hit DHIS2
    if (req.method === 'OPTIONS') {
        res.writeHead(204, { ...corsHeaders, 'access-control-max-age': '86400' })
        res.end()
        return
    }

    // Build a clean header set for the upstream request
    const upstreamHeaders = {}
    for (const [key, val] of Object.entries(req.headers)) {
        if (!STRIP_REQUEST_HEADERS.has(key.toLowerCase())) {
            upstreamHeaders[key] = val
        }
    }
    // Also remove any headers explicitly listed in the Connection header value
    if (req.headers['connection']) {
        for (const h of req.headers['connection'].split(',')) {
            delete upstreamHeaders[h.trim().toLowerCase()]
        }
    }
    upstreamHeaders['host'] = `${TARGET_HOST}:${TARGET_PORT}`

    // Normalize double slashes that appear when DHIS2_BASE_URL ends with /
    // and the app prepends another / (e.g. //dhis-web-commons-security/...)
    const upstreamPath = req.url.replace(/\/\/+/g, '/')

    const options = {
        hostname: TARGET_HOST,
        port: TARGET_PORT,
        path: upstreamPath,
        method: req.method,
        headers: upstreamHeaders,
    }

    const proxyReq = http.request(options, (proxyRes) => {
        // Build clean response headers
        const responseHeaders = {}
        for (const [key, val] of Object.entries(proxyRes.headers)) {
            if (!STRIP_RESPONSE_HEADERS.has(key.toLowerCase())) {
                responseHeaders[key] = val
            }
        }

        // Always inject CORS headers (overrides whatever DHIS2 sent)
        Object.assign(responseHeaders, corsHeaders)

        // Strip Secure / SameSite=None from cookies so they work over HTTP localhost
        if (proxyRes.headers['set-cookie']) {
            responseHeaders['set-cookie'] = proxyRes.headers['set-cookie'].map((c) =>
                c
                    .replace(/;\s*Secure/gi, '')
                    .replace(/;\s*SameSite=None/gi, '')
            )
        }

        res.writeHead(proxyRes.statusCode, responseHeaders)
        proxyRes.pipe(res)
    })

    proxyReq.on('error', (err) => {
        console.error('Proxy error:', err.message)
        if (!res.headersSent) {
            res.writeHead(502)
            res.end('Bad Gateway: ' + err.message)
        }
    })

    req.pipe(proxyReq)
})

server.listen(PROXY_PORT, () => {
    console.log(
        `CORS proxy running: http://localhost:${PROXY_PORT} → http://${TARGET_HOST}:${TARGET_PORT}`
    )
})
