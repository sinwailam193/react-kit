import React from "react";
import { renderToString, renderToStaticMarkup } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { AsyncComponentProvider, createAsyncContext } from "react-async-component";
import { JobProvider, createJobContext } from "react-jobs";
import asyncBootstrapper from "react-async-bootstrapper";
import { Provider } from "react-redux";
import Helmet from "react-helmet";
import { SheetsRegistry } from "react-jss/lib/jss";
import JssProvider from "react-jss/lib/JssProvider";
import { create } from "jss";
import preset from "jss-preset-default";
import { MuiThemeProvider, createGenerateClassName } from "material-ui/styles";
import configureStore from "../../../src/redux/configureStore";
import config from "../../../config";
import theme from "../../../client/theme";
import Application from "../../../src/components/Application";
import ServerHTML from "./ServerHTML";

/**
 * React application middleware, supports server side rendering.
 */
export default function reactApplicationMiddleware(request, response) {
    // Ensure a nonce has been provided to us.
    // See the server/middleware/security.js for more info.
    if (typeof response.locals.nonce !== "string") {
        throw new Error('A "nonce" value has not been attached to the response');
    }
    const { nonce } = response.locals;

    // It's possible to disable SSR, which can be useful in development mode.
    // In this case traditional client side only rendering will occur.
    if (config("disableSSR")) {
        if (process.env.BUILD_FLAG_IS_DEV === "true") {
            // eslint-disable-next-line no-console
            console.log("==> Handling react route without SSR");
        }
        // SSR is disabled so we will return an "empty" html page and
        // rely on the client to initialize and render the react application.
        const html = renderToStaticMarkup(<ServerHTML nonce={nonce} />);
        response.status(200).send(`<!DOCTYPE html>${html}`);
        return;
    }

    // setting up material-ui
    const sheetsRegistry = new SheetsRegistry();
    const jss = create(preset());
    const generateClassName = createGenerateClassName();

    // Create a context for our AsyncComponentProvider.
    const asyncComponentsContext = createAsyncContext();

    // Create a context for <StaticRouter>, which will allow us to
    // query for the results of the render.
    const reactRouterContext = {};

    // Create the job context for our provider, this grants
    // us the ability to track the resolved jobs to send back to the client.
    const jobContext = createJobContext();

    // Create the redux store.
    const store = configureStore({ request });

    // Declare our React application.
    const app = (
        <AsyncComponentProvider asyncContext={asyncComponentsContext}>
            <JobProvider jobContext={jobContext}>
                <JssProvider registry={sheetsRegistry} jss={jss} generateClassName={generateClassName}>
                    <MuiThemeProvider theme={theme} sheetsManager={new Map()}>
                        <Provider store={store}>
                            <StaticRouter location={request.url} context={reactRouterContext}>
                                <Application />
                            </StaticRouter>
                        </Provider>
                    </MuiThemeProvider>
                </JssProvider>
            </JobProvider>
        </AsyncComponentProvider>
    );

    // Pass our app into the react-async-component helper so that any async
    // components are resolved for the render.
    asyncBootstrapper(app).then(() => {
        const appString = renderToString(app);

        const css = sheetsRegistry.toString();

        // Generate the html response.
        const html = renderToStaticMarkup(<ServerHTML
            reactAppString={appString}
            nonce={nonce}
            css={css}
            helmet={Helmet.rewind()}
            storeState={store.getState()}
            routerState={reactRouterContext}
            jobsState={jobContext.getState()}
            asyncComponentsState={asyncComponentsContext.getState()}
        />);

        if (reactRouterContext.url) {
            response.status(302).setHeader("Location", reactRouterContext.url);
            return response.end();
        }

        response.status(reactRouterContext.missed ? 404 : 200).send(`<!DOCTYPE html>${html.replace(/&quot;/g, '"')}`);
    });
}
