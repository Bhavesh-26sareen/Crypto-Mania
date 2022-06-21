import { Box, Button, TextField } from '@material-ui/core';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useContext, useState } from 'react'
import { CurrencyContext } from '../../CryptoState';
import { auth } from '../../firebase'

function Signup({ handleClose }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");
    const { setAlert } = useContext(CurrencyContext);

    async function handleSubmit() {
        if (password !== confirmpassword) {
            setAlert({
                open: true,
                message: "Passwords do not match",
                type: 'error'
            });
            return;
        }
        try {

            const result = await createUserWithEmailAndPassword(auth, email, password);
            // console.log(result);
            setAlert({
                open: true,
                message: `Sign Up Successful. Welcome ${result.user.email.split('@')[0]}`,
                type: 'success',
            });
            handleClose();
        } catch (error) {
            // console.log(error)
            setAlert({
                open: true,
                message: error.message + "Go to Login",
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
            ></TextField>
            <TextField
                variant="outlined"
                label="Enter Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
            />
            <TextField
                variant="outlined"
                label="Confirm Password"
                type="password"
                value={confirmpassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                fullWidth
            />
            <Button
                variant="contained"
                size="large"
                style={{ backgroundColor: "#EEBC1D" }}
                onClick={handleSubmit}
            >
                Sign Up
            </Button>
        </Box>
    )
}

export default Signup