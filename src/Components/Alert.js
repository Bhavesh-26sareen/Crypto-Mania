import { Snackbar } from '@material-ui/core'
import React, { useContext } from 'react'
import { CurrencyContext } from '../CryptoState'
import MuiAlert from '@material-ui/lab/Alert'

function Alert() {
    const { alert, setAlert } = useContext(CurrencyContext);
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setAlert({ open: false });
    };
    return (
        <Snackbar
            open={alert.open}
            autoHideDuration={4000}
            onClose={handleClose}>
            <MuiAlert
                onClose={handleClose}
                elevation={20}
                variant="filled"
                severity={alert.type}
                autoHideDuration={8000}
            >
                {alert.message}
            </MuiAlert>
        </Snackbar>
    )
}

export default Alert