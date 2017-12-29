import serialize from "serialize-javascript";
import filterWithRules from "../../src/utils/objects/filterWithRules";
import values from "../values";

// Filter the config down to the properties that are allowed to be included
// in the HTML response.
const clientConfig = filterWithRules(
    // These are the rules used to filter the config.
    values.clientConfigFilter,
    // The config values to filter.
    values
);

const serializedClientConfig = serialize(clientConfig);

export default serializedClientConfig;
