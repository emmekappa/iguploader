import * as React from "react";
import {FunctionComponent, useContext, useEffect, useState} from "react";
import {
    Container,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import {ipcRenderer} from "electron";
import {IgLocation} from "./IgLocation";
import {InstagramIpcInvokerContext} from "./main";

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

export const SearchByLocation: FunctionComponent = (props) => {
    const instagramIpcInvoker = useContext(InstagramIpcInvokerContext)
    const [locations, setLocations] = useState<IgLocation[]>([]);
    const [query, setQuery] = useState("");
    useEffect(() => {
        console.log('mount it!');
    }, []); // passing an empty array as second argument triggers the callback in useEffect only after the initial render thus replicating `componentDidMount` lifecycle behaviour

    const classes = useStyles();

    return (
        <Container component="main">
            <form noValidate autoComplete="off">
                <TextField id="location" label="Location" onChange={event => setQuery(event.target.value)}
                           value={query}/>
            </form>

            <Button variant="contained" color="primary" onClick={async () => {
                setLocations(await instagramIpcInvoker.searchByLocation(query))
            }}>
                Search
            </Button>

            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Lat</TableCell>
                            <TableCell align="right">Lon</TableCell>
                            <TableCell align="right">Address</TableCell>
                            <TableCell align="right">City</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {locations.map((row) => (
                            <TableRow key={row.facebook_places_id}>
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="right">{row.lat}</TableCell>
                                <TableCell align="right">{row.lng}</TableCell>
                                <TableCell align="right">{row.address}</TableCell>
                                <TableCell align="right">{row.city}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}
