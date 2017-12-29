import { createMuiTheme } from "material-ui/styles";
import { teal, blue, red } from "material-ui/colors";

// Material-UI color theme
const theme = createMuiTheme({
    palette: {
        primary: teal,
        secondary: blue,
        error: red
    }
});

export default theme;
