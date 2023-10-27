const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();
const target = "https://staging.expensify.com";

// Proxy middleware options.
const options = {
  target: target, // target host
  changeOrigin: true, // needed for virtual hosted sites
  ws: true, // proxy websockets
  router: {
    // when request.headers.host == 'new.expensify.com.dev', proxy to:
    localhost: target,
  },
};

// Create the proxy middleware
const apiProxy = createProxyMiddleware(options);

// Mount the proxy
app.use(apiProxy);

// Serve static files or other routes here if needed

// Start the server
app.listen(4000, () => {
  console.log("Proxy server is running on new.expensify.com.dev");
});
