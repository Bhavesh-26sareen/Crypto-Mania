import { Box, Button, TextField } from '@material-ui/core';
import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useContext, useState } from 'react'
import { CurrencyContext } from '../../CryptoState';
import { auth } from '../../firebase';


function Signup({ handleClose }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { setAlert } = useContext(CurrencyContext);
    async function handleSubmit() {
        if (!password || !email) {
            setAlert({
                open: true,
                message: "Fill all the details",
                type: 'error'
            });
            return;

        }
        try {
            const result = await signInWithEmailAndPassword(auth, email, password);
            setAlert({
                open: true,
                message: `Login Successful. Welcome ${result.user.email.split('@')[0]}`,
                type: 'success',
            });
            handleClose();

        }
        catch (err) {
            // console.log(error)
            setAlert({
                open: true,
                message: err.message + "Go to Login",
                type: "error",
            });
            // handleClose();
            return;
        }
    }
    return (
        <Box p={6} style={
            {
                display: 'flex',
                flexDirection: 'column',
                // padding: 10,
                margin: 20,
                gap: "20px",

            }
        }>
            <TextField
                variant='outlined'
                type="email"
                label="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
            />
            <TextField
                variant="outlined"
                label="Enter Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
            />

            <Button
                variant="contained"
                size="large"
                style={{ backgroundColor: "#EEBC1D" }}
                onClick={handleSubmit}
            >
                Login
            </Button>
        </Box>
    )
}

export default Signup