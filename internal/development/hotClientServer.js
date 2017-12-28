import express from "express";
import createWebpackMiddleware from "webpack-dev-middleware";
import createWebpackHotMiddleware from "webpack-hot-middleware";
import ListenerManager from "./listenerManager";
import config from "../../config";
import { log } from "../utils";

class HotClientServer {
    constructor(compiler) {
        const app = express();

        const httpPathRegex = /^https?:\/\/(.*):([\d]{1,5})/i;
        const httpPath = compiler.options.output.publicPath;
        if (!httpPath.startsWith("http") && !httpPathRegex.test(httpPath)) {
            throw new Error("You must supply an absolute public path to a development build of a web target bundle as it will be hosted on a seperate development server to any node target bundles.");
        }

        // eslint-disable-next-line no-unused-vars
        const [_, host, port] = httpPathRegex.exec(httpPath);

        this.webpackDevMiddleware = createWebpackMiddleware(compiler, {
            quiet: true,
            noInfo: true,
            headers: {
                "Access-Control-Allow-Origin": `http://${config("host")}:${config("port")}`
            },
            publicPath: compiler.options.output.publicPath,
            stats: "errors-only"
        });

        app.use(this.webpackDevMiddleware);
        app.use(createWebpackHotMiddleware(compiler));

        const listener = app.listen(port);

        this.listenerManager = new ListenerManager(listener, "client");

        compiler.plugin("done", stats => {
            if (stats.hasErrors()) {
                log({
                    title: "client",
                    level: "error",
                    message: "Build failed, please check the console for more information.",
                    notify: true
                });
                console.error(stats.toString());
            }
        });
    }

    dispose() {
        this.webpackDevMiddleware.close();

        return this.listenerManager ? this.listenerManager.dispose() : Promise.resolve();
    }
}

export default HotClientServer;
