/* eslint-disable @typescript-eslint/no-require-imports */
/**
 * HTTP Proxy to intercept requests from browser to Next.js application
 * 
 * Usage:
 * 1. Start your Next.js app normally (npm run dev)
 * 2. Run this proxy script: node src/scripts/proxy.js
 * 3. Access your app via the proxy at http://localhost:8000
 * 
 * To add custom headers to forwarded requests, use the PROXY_HEADERS environment variable:
 * PROXY_HEADERS="X-Custom-Header:Value,Another-Header:AnotherValue" node scripts/proxy.js
 */

const http = require('http');
const httpProxy = require('http-proxy');

// Target URL of your Next.js application
const NEXTJS_URL = 'https://cyber-security-jet.vercel.app';

// Port on which the proxy will listen
const PROXY_PORT = 8000;

// Parse custom headers from environment variable
const customHeaders = { 'X-Middleware-Subrequest': 'src/middleware:src/middleware:src/middleware:src/middleware:src/middleware' };
if (process.env.PROXY_HEADERS) {
  process.env.PROXY_HEADERS.split(',').forEach(header => {
    const [key, value] = header.split(':');
    if (key && value) {
      customHeaders[key.trim()] = value.trim();
    }
  });
}

// Create a proxy server instance
const proxy = httpProxy.createProxyServer({});

// Error handling for the proxy
proxy.on('error', (err, req, res) => {
  console.error('Proxy error:', err);
  res.writeHead(500, { 'Content-Type': 'text/plain' });
  res.end('Proxy error: ' + err.message);
});

// Create HTTP server to handle requests
const server = http.createServer((req, res) => {
  // Log request details
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.url}`);
  
  // Log request headers
  console.log('Request headers:', JSON.stringify(req.headers, null, 2));
  
  // Add custom headers to the request
  const proxyOptions = { 
    target: NEXTJS_URL,
    headers: customHeaders
  };
  
  // Capture request body for POST, PUT, PATCH requests
  if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    
    req.on('end', () => {
      if (body) {
        try {
          // Try to parse as JSON for nicer logging
          const jsonBody = JSON.parse(body);
          console.log('Request body:', JSON.stringify(jsonBody, null, 2));
        } catch (e) {
          // If not valid JSON, log as is
          console.log('Request body:', e, body);
        }
      }
      
      // Forward the request to the target server with custom headers
      proxy.web(req, res, proxyOptions);
    });
  } else {
    // For GET, DELETE, etc., just forward the request with custom headers
    proxy.web(req, res, proxyOptions);
  }
});

// Start the proxy server
server.listen(PROXY_PORT, () => {
  console.log(`Proxy server listening on port ${PROXY_PORT}`);
  console.log(`Proxying requests to ${NEXTJS_URL}`);
  console.log(`Access your app at http://localhost:${PROXY_PORT}`);
  
  if (Object.keys(customHeaders).length > 0) {
    console.log('Adding custom headers to requests:', JSON.stringify(customHeaders, null, 2));
  }
}); 