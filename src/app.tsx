import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {CssBaseline, ThemeProvider} from '@material-ui/core';
import theme from "./theme";
import Main from "./main";

ReactDOM.render(
    <ThemeProvider theme={theme}>
        <CssBaseline/>
        <Main/>
    </ThemeProvider>,
    document.querySelector('#root'),
);

