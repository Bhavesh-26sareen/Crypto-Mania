import axios from 'axios';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { CoinList } from './config/api';
import { auth, db } from './firebase';

export const CurrencyContext = React.createContext();
function CryptoState({ children }) {
    const [currency, setCurrency] = useState("INR");
    const [symbol, setSymbol] = useState("₹");
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);
    const [watchlist, setWatchlist] = useState([]);
    const [alert, setAlert] = useState({
        open: false,
        message: "",
        type: "success",
    });

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) setUser(user);
            else setUser(null);
        });
    }, []);

    function fetchTrendingCoins() {
        setLoading(true)
        axios.get(CoinList(currency))

            .then(res => {
                // console.log('Hello') 
                // console.log(res)
                setCoins(res.data);
                setLoading(false)
            }).catch(err => {
                console.log(err)
            }
            )

    }


    useEffect(() => {
        if (currency === "INR") setSymbol("₹");
        else if (currency === "USD") setSymbol("$");
        else if (currency === "CAD") setSymbol("C$");
        else if (currency === "AUD") setSymbol("A$");

    }, [currency])
    useEffect(() => {
        if (user) {
            const coinRef = doc(db, "watchlist", user?.uid);
            var unsubscribe = onSnapshot(coinRef, (coin) => {
                console.log("asbhjas ", coin)
                if (coin.exists()) {
                    // console.log(coin.data().coins);
                    setWatchlist(coin.data().coins);
                } else {
                    console.log("No Items in Watchlist");
                }
            });

            return () => {
                unsubscribe();
            };
        }
    }, [user]);
    return (
        <CurrencyContext.Provider value={{ currency, symbol, setCurrency, coins, loading, fetchTrendingCoins, alert, setAlert, user, watchlist, setWatchlist }}>
            {children}
        </CurrencyContext.Provider>

    )
}

export default CryptoState