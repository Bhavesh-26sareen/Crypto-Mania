import React, { useContext, useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core'
import axios from 'axios'
import { TrendingCoins } from '../../config/api';
import { CurrencyContext } from '../../CryptoState';
import { Link } from 'react-router-dom';
import AliceCarousel from 'react-alice-carousel';

const useStyle = makeStyles({
  carousel: {
    display: "flex",
    height: "50%",
    alignItems: 'center'
  },
  carouselItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    cursor: "pointer",
    textTransform: "uppercase",
    color: "white",
  },

});
export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function Carousel() {
  const classes = useStyle();
  const { currency, symbol } = useContext(CurrencyContext)
  const [trending, setTrending] = useState([]);

  function fetchTrendingCoins() {
    axios.get(TrendingCoins(currency))
      .then(res => {
        // console.log(res)
        setTrending(res.data);
      }).catch(err => {
        console.log(err)
      }
      )

  }

  // console.log(trending);


  useEffect(() => {
    fetchTrendingCoins();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency])

  const items = trending.map((coin) => {
    let profit = coin.price_change_percentage_24h >= 0;

    return (
      <Link className={classes.carouselItem} to={`/coins/${coin.id}`}>
        <img
          src={coin.image}
          alt={coin.name}
          height="80"
          style={{ marginBottom: 10 }}
        />
        <span>
          {coin.symbol}
          &nbsp;
          <span
            style={{
              color: profit > 0 ? "rgb(14, 203, 129)" : "red",
              fontWeight: 500,
            }}
          >
            {profit && "+"}
            {coin?.price_change_percentage_24h?.toFixed(2)}%
          </span>
        </span>
        <br></br>
        <span style={{ fontSize: 22, fontWeight: 500 }}>
          {symbol} {numberWithCommas(coin.current_price.toFixed(2))}
        </span>
      </Link>
    );
  });

  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };

  return (
    <div className={classes.carousel}>
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        items={items}
        autoPlay
      />
    </div>
  )
}

export default Carousel   