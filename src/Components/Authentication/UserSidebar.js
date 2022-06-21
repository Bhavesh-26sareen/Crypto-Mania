import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import { CurrencyContext } from '../../CryptoState';
import { Avatar } from '@material-ui/core';
import { signOut } from 'firebase/auth';
import { auth, db } from '../../firebase';
import { numberWithCommas } from '../Banner/Carousel'
import { AiFillDelete } from 'react-icons/ai';
import { doc, setDoc } from 'firebase/firestore';

const useStyles = makeStyles({
    container: {
        width: 450,
        padding: 25,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        fontFamily: "monospace",
    },
    picture: {
        width: 200,
        height: 200,
        cursor: "pointer",
        backgroundColor: "#EEBC1D",
        // objectFit: "contain",
    },
    logout: {
        height: "8%",
        width: "100%",
        backgroundColor: "#EEBC1D",
        marginTop: 20,
    },
    profile: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
        height: "92%",
        // backgroundColor: "green",
    },
    watchlist: {
        flex: 1,
        width: "100%",
        backgroundColor: "grey",
        borderRadius: 10,
        padding: 15,
        paddingTop: 10,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 12,
        overflowY: "scroll",
    },
    coin: {
        padding: 10,
        borderRadius: 5,
        color: "black",
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#EEBC1D",
        boxShadow: "0 0 3px black",
    },
});


function UserSidebar() {

    const classes = useStyles();
    const [state, setState] = React.useState({
        right: false,
    });
    const { setAlert, user, watchlist, coins, symbol } = useContext(CurrencyContext);
    // console.log("hello: ", user);

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const logOut = () => {
        signOut(auth);
        setAlert({
            open: true,
            type: "success",
            message: "Logout Successfull !",
        });

        toggleDrawer();
    };


    async function removefromwatchlist(coin) {
        const coinRef = doc(db, "watchlist", user.uid);
        try {
            await setDoc(
                coinRef,
                { coins: watchlist.filter((wish) => wish !== coin?.id) },
                { merge: "true" }
            );

            setAlert({
                open: true,
                message: `${coin.name} Removed from the Watchlist !`,
                type: "info",
            });
        } catch (error) {
            setAlert({
                open: true,
                message: error.message,
                type: "error",
            });
        }
    }

    return (
        <div>
            {['right'].map((anchor) => (
                <React.Fragment key={anchor}>
                    <Avatar onClick={toggleDrawer(anchor, true)}
                        style={{
                            height: 38,
                            width: 38,
                            cursor: "pointer",
                            backgroundColor: "#EEBC1D",
                        }}
                        src={user.photoURL}
                        alt={user.displayName || user.email}></Avatar>

                    <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
                        <div className={classes.container}>
                            <div className={classes.profile}>
                                <Avatar
                                    className={classes.picture}
                                    src={user.photoURL}
                                    alt={user.displayName || user.email}
                                />
                                <span
                                    style={{
                                        width: "100%",
                                        fontSize: 25,
                                        textAlign: "center",
                                        fontWeight: "bolder",
                                        wordWrap: "break-word",
                                        fontFamily: 'Montserrat'
                                    }}
                                >
                                    {user.displayName || user.email}
                                </span>
                                <div className={classes.watchlist}>
                                    <span style={{
                                        fontSize: 25, textShadow: "0 0 5px gold",
                                        fontWeight: 'bold',
                                        fontFamily: "Montserrat",
                                    }}>
                                        Watchlist
                                    </span>
                                    {coins.map((coin) => {
                                        if (watchlist.includes(coin.id))
                                            return (
                                                <div className={classes.coin}>
                                                    <span style={{
                                                        fontWeight: 'bold',
                                                        fontFamily: "Montserrat",
                                                    }}>{coin.name}</span>
                                                    <span style={{
                                                        display: "flex", gap: 8, fontWeight: 'bold',
                                                        fontFamily: "Montserrat",
                                                    }}>
                                                        {symbol}{" "}

                                                        {numberWithCommas(coin.current_price.toFixed(2))}
                                                        <AiFillDelete
                                                            style={{ cursor: "pointer" }}
                                                            fontSize="16"
                                                            onClick={() => removefromwatchlist(coin)}
                                                        />
                                                    </span>
                                                </div>
                                            );
                                        else return <></>;
                                    })}
                                </div>
                            </div>
                            <Button
                                variant="contained"
                                className={classes.logout}
                                style={{
                                    fontWeight: 'bold',
                                    fontFamily: "Montserrat",
                                }}
                                onClick={logOut}
                            >
                                Log Out
                            </Button>
                        </div>
                    </Drawer>
                </React.Fragment>
            ))}
        </div>
    );
}

export default UserSidebar

