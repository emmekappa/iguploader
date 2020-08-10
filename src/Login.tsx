import * as React from "react";
import {FunctionComponent, useState} from "react";
import {Button, FormControl, Input, InputLabel, TextField, Typography} from "@material-ui/core";
const Store = require('electron-store');

export const Login: FunctionComponent = (props) => {
    const store = new Store()
    const [username, setUsername] = useState<string>(store.get('ig.username'))
    const [password, setPassword] = useState<string>(store.get('ig.password'))

    let saveLogin = () => {
        console.log("saving login informations...")
        store.set('ig.username', username);
        store.set('ig.password', password)
    }

    return (
        <Typography variant="h2">
            <form noValidate autoComplete="off">
                <FormControl fullWidth>
                    <InputLabel htmlFor="username">Username</InputLabel>
                    <Input id="username" value={username} onChange={event => setUsername(event.target.value)}/>
                </FormControl>
                <FormControl fullWidth>
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <Input id="password" value={password} type="password" onChange={event => setPassword(event.target.value)}/>
                </FormControl>
                <FormControl>
                    <Button variant="contained" onClick={saveLogin}>Login</Button>
                </FormControl>
            </form>
        </Typography>
    )
}
