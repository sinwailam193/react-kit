import { createMuiTheme } from "material-ui/styles";
import { teal, blue, red } from "material-ui/colors";

const isProd = process.env.NODE_ENV === "production";

export const theme = createMuiTheme({
    palette: {
        primary: teal,
        secondary: {
            ...blue,
            A200: "#00B8D4"
        },
        error: red,
    }
});

export const API_URL = "http://localhost:3000";
