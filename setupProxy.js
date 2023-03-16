// In your Next.js app, create a file called `setupProxy.js` in the root directory
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://en.wikipedia.org',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '/w/api.php', // Rewrite the URL path
      },
    })
  );
};
