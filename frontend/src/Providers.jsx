import {Provider} from "react-redux"
import {store} from "./store"
import {ColorModeContext, useMode} from "./theme";
import ThemeProvider from "@mui/material/styles/ThemeProvider";

const Providers = ({children}) => {
    const [theme, colorMode] = useMode();
    return (
        <Provider store={store}>
            <ColorModeContext.Provider value={colorMode}>
                <ThemeProvider theme={theme}>
                    {children}
                </ThemeProvider>
            </ColorModeContext.Provider>
        </Provider>
    )
}
export default Providers
