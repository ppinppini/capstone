const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (app) => {
    app.use(
        createProxyMiddleware("/survey", {
            target: "http://43.200.172.87:8080",
            changeOrigin: true,
        })
    );
};
