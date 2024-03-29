import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { CurrencyContext } from '../CryptoState';
import axios from 'axios'
import { Button, LinearProgress, makeStyles, Typography } from '@material-ui/core';
import SingleCoinInfo from '../Components/SingleCoinInfo';
import { SingleCoin } from '../config/api';
import ReactHtmlParser from 'react-html-parser'
import { numberWithCommas } from '../Components/Banner/Carousel';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';


const useStyle = makeStyles((theme) => ({
  container: {
    display: "flex",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      alignItems: "center",
    },
  },
  sidebar: {
    width: "30%",
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 25,
    borderRight: "2px solid grey",
  },
  heading: {
    fontWeight: "bold",
    marginBottom: 20,
    fontFamily: "Montserrat",
  },
  description: {
    width: "100%",
    fontFamily: "Montserrat",
    padding: 25,
    paddingBottom: 15,
    paddingTop: 0,
    textAlign: "justify",
  },
  marketData: {
    alignSelf: "start",
    padding: 25,
    paddingTop: 10,
    width: "100%",
    [theme.breakpoints.down("md")]: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    [theme.breakpoints.down("xs")]: {
      alignItems: "start",
    },

  },
}));
function CoinPage() {
  const { coinId } = useParams();
  console.log(coinId)
  const { currency, symbol, user, setAlert, watchlist } = useContext(CurrencyContext);
  const [coin, setCoin] = useState();
  function fetchsinglecoin() {
    axios.get(SingleCoin(coinId))
      .then(res => {
        setCoin(res.data);
      }).catch(err => {
        console.log(err)
      }
      )
  }
  useEffect(() => {
    fetchsinglecoin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const classes = useStyle();
  // console.log(coin)
  // console.log(coin?.market_data.current_price[currency.toLowerCase()]);
  const inWatchlist = watchlist.includes(coin?.id);
  if (!coin) return <LinearProgress style={{ backgroundColor: "gold" }} />;

  async function addtoWatchList() {
    const coinRef = doc(db, "watchlist", user.uid);
    try {
      await setDoc(
        coinRef,
        { coins: watchlist ? [...watchlist, coin.id] : [coin.id] }
      );

      setAlert({
        open: true,
        message: `${coin.name} Added to the Watchlist !`,
        type: "success",
      });
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
    }
  }

  async function removefromwatchlist() {
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
    <div className={classes.container}>
      <div className={classes.sidebar}>
        <img
          src={coin?.image.large}
          alt={coin?.name}
          height="200"
          style={{ marginBottom: 20 }}
        />
        <Typography variant='h3' className={classes.heading}>{coin?.name}</Typography>
        <Typography variant='subtitle1' className={classes.description}> {ReactHtmlParser(coin?.description.en.split(". ")[0])}</Typography>
        <div className={classes.marketData} >
          <span style={{ display: "flex" }}>
            <Typography variant='h5' className={classes.heading}>
              Rank:
            </Typography>
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              &nbsp;
              {(coin?.market_cap_rank)}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Typography variant='h5' className={classes.heading}>
              Current Price:
            </Typography>
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              &nbsp;

              {symbol}{" "}

              {numberWithCommas(coin?.market_data.current_price[currency.toLowerCase()])}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              Market Cap:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, -6)
              )}
              M
            </Typography>
          </span>
          {user && <Button
            variant='outlined'
            style={{
              width: "100%",
              height: 40,
              backgroundColor: inWatchlist ? "red" : "gold",
              fontWeight: 'bold',
              fontFamily: "Montserrat",
            }}
            onClick={inWatchlist ? removefromwatchlist : addtoWatchList}>{inWatchlist ? "Remove from WatchList" : "Add to watchlist"}</Button>}
        </div>
      </div>

      <SingleCoinInfo coin={coin} />
    </div>
  )
}

export default CoinPage;