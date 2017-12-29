module.exports = function generate(context) {
    // const config = context.htmlWebpackPlugin.options.custom.config;
    const nonce = "OFFLINE_PAGE_NONCE_PLACEHOLDER";
    const serializedClientConfig = context.htmlWebpackPlugin.options.custom.serializedClientConfig;

    return `
        <!DOCTYPE html>
        <html lang="en">
            <head></head>
            <body>
                <div id="app"></div>
                <script type="text/javascript" nonce=${nonce}>window.__CLIENT_CONFIG__=${serializedClientConfig}</script>
            </body>
        </html>
    `;
};
