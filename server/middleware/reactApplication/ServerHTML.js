/* eslint-disable react/no-danger */
/* eslint-disable react/no-array-index-key */
import serialize from "serialize-javascript";

import config from "../../../config";
import ifElse from "../../../src/utils/logic/ifElse";
import getClientBundleEntryAssets from "./getClientBundleEntryAssets";

import serializedClientConfig from "../../../config/components/serializedClientConfig";

// Resolve the assets (js/css) for the client bundle's entry chunk.
const clientEntryAssets = getClientBundleEntryAssets();

function stylesheetTag(stylesheetFilePath) {
    return `<link href="${stylesheetFilePath}" media="screen, projection" rel="stylesheet" type="text/css" />`;
}

function scriptTag(jsFilePath) {
    return `<script type="text/javascript" src="${jsFilePath}"></script>`;
}

// COMPONENT

function ServerHTML({
    asyncComponentsState, helmet, jobsState, nonce, reactAppString, routerState, storeState, css
}) {
    // Creates an inline script definition that is protected by the nonce.
    const inlineScript = body => `<script nonce=${nonce} type="text/javascript">${body}</script>`;
    const headerElements = `${ifElse(helmet)(() => helmet.title.toString(), "")}${ifElse(helmet)(() => helmet.base.toString(), "")}${ifElse(helmet)(() => helmet.meta.toString(), "")}${ifElse(helmet)(
        () => helmet.link.toString(),
        ""
    )}${ifElse(clientEntryAssets && clientEntryAssets.css)(() => stylesheetTag(clientEntryAssets.css), "")}${ifElse(helmet)(() => helmet.style.toString(), "")}${ifElse(Boolean(css))(
        () => `<style id="jss-server-side">${css}</style>`,
        ""
    )}`;

    const bodyElements = `${ifElse(storeState)(() =>
        inlineScript(`window.__APP_STATE__=${serialize(storeState)};`))}${`<script type="text/javascript" nonce=${nonce}>window.__CLIENT_CONFIG__=${serializedClientConfig}</script>`}${ifElse(asyncComponentsState)(() =>
        inlineScript(`window.__ASYNC_COMPONENTS_REHYDRATE_STATE__=${serialize(asyncComponentsState)}`))}${ifElse(jobsState)(() => inlineScript(`window.__JOBS_STATE__=${serialize(jobsState)}`))}${ifElse(routerState)(() => inlineScript(`window.__ROUTER_STATE__=${serialize(routerState)}`))}${ifElse(config("polyfillIO.enabled"))(() => scriptTag(`${config("polyfillIO.url")}?features=${config("polyfillIO.features").join(",")}`))}${ifElse(process.env.BUILD_FLAG_IS_DEV === "true" && config("bundles.client.devVendorDLL.enabled"))(() => scriptTag(`${config("bundles.client.webPath")}${config("bundles.client.devVendorDLL.name")}.js?t=${Date.now()}`), "")}${ifElse(clientEntryAssets && clientEntryAssets.js)(() =>
        scriptTag(clientEntryAssets.js))}${ifElse(helmet)(() => helmet.script.toString(), "")}`;

    return `${"<!DOCTYPE html>" + `<html ${helmet.htmlAttributes.toString()}>` + `<head>${headerElements}</head>` + `<body><div id="app">${reactAppString}</div>`}${bodyElements}</body></html>`;
}

export default ServerHTML;
