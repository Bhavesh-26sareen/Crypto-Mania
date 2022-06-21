import { AppBar, Container, createTheme, makeStyles, MenuItem, Select, ThemeProvider, Toolbar, Typography } from '@material-ui/core'
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { CurrencyContext } from '../CryptoState';
import AuthModel from './Authentication/AuthModel';
import UserSidebar from './Authentication/UserSidebar';
const useStyle = makeStyles({
    title: {
        flex: 1,
        color: "gold",
        fontFamily: "Montserrat",
        fontWeight: 'bold',
        cursor: "pointer"
    },
    sbox: {
        color: "white"
    }
});
export const darkTheme = createTheme({
    palette: {
        primary: {
            main: "#fff",
        },
        type: 'dark',
    },
});
function Header() {
    const navigate = useNavigate();
    const classes = useStyle();
    const { currency, setCurrency, user } = useContext(CurrencyContext)

    console.log(currency)
    return (
        <ThemeProvider theme={darkTheme}>
            <AppBar color="transparent" position='static'>
                <Container>
                    <Toolbar>
                        <Typography onClick={() => navigate('/')} className={classes.title} variant='h5'>CryptoMania</Typography>
                        <Select value={currency} variant='outlined' style={
                            {
                                width: 100,
                                height: 40,
                                marginRight: 15,
                            }
                        }

                            onClick={(e) => setCurrency(e.target.value)} >
                            <MenuItem className={classes.sbox} value={"USD"} >USD</MenuItem>
                            <MenuItem className={classes.sbox} value={"INR"} >INR</MenuItem>
                            <MenuItem className={classes.sbox} value={"CAD"} >CAD</MenuItem>
                            <MenuItem className={classes.sbox} value={"AUD"} >AUD</MenuItem>
                        </Select>
                        {user ? <UserSidebar /> : <AuthModel></AuthModel>}
                    </Toolbar>
                </Container>
            </AppBar>
        </ThemeProvider >
    )
}

export default Header