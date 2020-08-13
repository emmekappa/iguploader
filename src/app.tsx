import * as React from 'react';
import {CssBaseline, ThemeProvider} from '@material-ui/core';
import theme from "./theme";
import Main from "./main";

export function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Main/>
        </ThemeProvider>
    )
}


