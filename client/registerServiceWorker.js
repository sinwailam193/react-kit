import config from "../config";

if (process.env.BUILD_FLAG_IS_DEV === "false" && location.protocol === "https:" && "serviceWorker" in navigator) {
    // We check the shared config, ensuring that the service worker has been
    // enabled.
    if (config("serviceWorker.enabled")) {
        // eslint-disable-next-line global-require
        const OfflinePluginRuntime = require("offline-plugin/runtime");

        // Install the offline plugin, which instantiates our service worker and app
        // cache to support precaching of assets and offline support.
        OfflinePluginRuntime.install({
            onUpdating: () => undefined,
            // When an update is ready we will tell the new SW to take control immediately.
            onUpdateReady: () => OfflinePluginRuntime.applyUpdate(),
            // After the new SW update has been applied we will reload the users page
            // to ensure they are using the latest assets.
            // This only gets run if there were updates available for our cached assets.
            onUpdated: () => window.location.reload(),
            onUpdateFailed: () => undefined,
        });
    }
}
