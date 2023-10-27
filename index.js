const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();
const target = "https://expensify.com.dev";

// Proxy middleware options.
const options = {
  target: target, // target host
  changeOrigin: true, // needed for virtual hosted sites
  ws: true, // proxy websockets
  router: {
    // when request.headers.host == 'new.expensify.com.dev', proxy to:
    "new.expensify.com.dev": target,
  },
};

// Create the proxy middleware
const apiProxy = createProxyMiddleware(options);

// Mount the proxy
app.use(apiProxy);

// Serve static files or other routes here if needed

// Start the server
app.listen(3000, () => {
  console.log("Proxy server is running on http://localhost:3000");
});
