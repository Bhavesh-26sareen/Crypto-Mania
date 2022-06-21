import { CircularProgress, makeStyles, ThemeProvider } from '@material-ui/core';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { HistoricalChart } from '../config/api';
import { CurrencyContext } from '../CryptoState';
import { darkTheme } from './Header';
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, registerables } from 'chart.js';
import { chartDays } from '../config/data';

ChartJS.register(...registerables);

const useStyle = makeStyles((theme) => ({
    container: {
        width: "75%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 25,
        padding: 40,
        [theme.breakpoints.down("md")]: {
            width: "100%",
            marginTop: 0,
            padding: 20,
            paddingTop: 0,
        },
    },
    selectbutton: {
        border: "1px solid gold",
        borderRadius: 5,
        padding: 10,
        paddingLeft: 20,
        paddingRight: 20,
        fontFamily: "Montserrat",
        cursor: "pointer",
        backgroundColor: "gold",
        borderColor: "white",
        color: "black",
        fontWeight: 700,
        "&:hover": {
            backgroundColor: "gold",
            color: "black",
        },
        width: "22%",
        //   margin: 5,
    },

}));
function SingleCoinInfo({ coin }) {
    const [historicData, sethistoricData] = useState();
    const [days, setDays] = useState(1);
    // const [clr, setclr] = useState("")
    const { currency } = useContext(CurrencyContext);


    const classes = useStyle();
    function fetchHistoricData() {
        axios.get(HistoricalChart(coin.id, days, currency))
            .then(res => {
                sethistoricData(res.data.prices)
            })
            .catch(err => {
                console.log(err);
            })
    }
    useEffect(() => {
        fetchHistoricData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currency, days]);
    return (
        <ThemeProvider theme={darkTheme}>
            <div className={classes.container}>
                {
                    !historicData ? (
                        <CircularProgress style={{ color: "gold" }} size={350} thickness={2}></CircularProgress>
                    ) : (
                        <>
                            <Line
                                data={{
                                    labels: historicData.map((coin) => {
                                        let date = new Date(coin[0]);// date is in epoch 
                                        let time = date.getHours() > 12
                                            ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                                            : `${date.getHours()}:${date.getMinutes()} AM`;
                                        return days === 1 ? time : date.toLocaleDateString();
                                    }),
                                    datasets: [
                                        {
                                            data: historicData.map((coin) => coin[1]),
                                            label: `Price ( Past ${days} Day ) in ${currency}`,
                                            backgroundColor: '#FFFEC8',
                                            borderColor: "#EEBC1D",
                                            tension: 0.4,
                                            fill: true,
                                            pointBorderColor: '#F7931A',
                                        },
                                    ],
                                }}
                                options={{
                                    elements: {
                                        point: {
                                            radius: 1,
                                        },
                                    },
                                }}
                            />
                            <div style={{
                                display: "flex",
                                marginTop: 20,
                                justifyContent: "space-around",
                                width: "100%",
                            }}>
                                {chartDays.map((day) => (
                                    <button className={classes.selectbutton} key={day.value} onClick={() => {
                                        setDays(day.value);
                                        // setclr("Gold");
                                    }}>{day.label}</button>
                                ))}
                            </div>



                        </>
                    )
                }
            </div>
        </ThemeProvider>
    )
}

export default SingleCoinInfo