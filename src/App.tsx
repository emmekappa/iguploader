import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
import {FunctionComponent, useEffect, Fragment} from "react";
import {
    TextField,
    ThemeProvider,
    Table,
    TableContainer,
    TableHead,
    TableRow,
    TableCell,
    TableBody, Paper, Container, CssBaseline, Typography, Tabs, Tab
} from '@material-ui/core';
import {makeStyles} from "@material-ui/core/styles";
import theme from "./theme";
import {
    HashRouter,
    Route,
    Switch,
    Link,
    MemoryRouter
} from "react-router-dom";

function createData(name: string, calories: number, fat: number, carbs: number, protein: number) {
    return {name, calories, fat, carbs, protein};
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

const FirstPage: FunctionComponent = (props) => {
    return (
        <Typography variant="h2">
            First page
        </Typography>
    )
}

const SecondPage: FunctionComponent = (props) => {
    return (
        <Typography variant="h2">
            Second page
        </Typography>
    )
}

const App: FunctionComponent = (props) => {
    useEffect(() => {
        console.log('mount it!');
    }, []); // passing an empty array as second argument triggers the callback in useEffect only after the initial render thus replicating `componentDidMount` lifecycle behaviour

    const classes = useStyles();

    return (
        <Container component="main">
            <form noValidate autoComplete="off">
                <TextField id="location" label="Location"/>
            </form>

            <Button variant="contained" color="primary" onClick={() => window.alert("hello")}>
                Search
            </Button>

            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Dessert (100g serving)</TableCell>
                            <TableCell align="right">Calories</TableCell>
                            <TableCell align="right">Fat&nbsp;(g)</TableCell>
                            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                            <TableCell align="right">Protein&nbsp;(g)</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.name}>
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="right">{row.calories}</TableCell>
                                <TableCell align="right">{row.fat}</TableCell>
                                <TableCell align="right">{row.carbs}</TableCell>
                                <TableCell align="right">{row.protein}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}

function a11yProps(index: any) {
    return {
        id: `scrollable-force-tab-${index}`,
        'aria-controls': `scrollable-force-tabpanel-${index}`,
    };
}

ReactDOM.render(
    <ThemeProvider theme={theme}>
        <CssBaseline/>
        <MemoryRouter initialEntries={['/main_window']} initialIndex={0}>
            <Switch>
                <Route path="/main_window" exact component={App}/>
                <Route path="/firstPage" component={FirstPage}/>
                <Route path="/secondPage" component={SecondPage}/>
            </Switch>

            <Fragment>
                <Tabs value={location.pathname}>
                    <Tab label="Item One" value="/main_window" component={Link} to="/main_window" {...a11yProps(0)} />
                    <Tab label="First page" value="/firstPage" component={Link} to="/firstPage" {...a11yProps(1)}/>
                    <Tab label="Second page" value="/secondPage" component={Link} to="/secondPage" {...a11yProps(2)}/>
                </Tabs>
            </Fragment>
        </MemoryRouter>
    </ThemeProvider>,
    document.querySelector('#root'),
);
