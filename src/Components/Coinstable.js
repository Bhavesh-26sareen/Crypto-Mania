import { Container, LinearProgress, makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, ThemeProvider, Typography } from '@material-ui/core';
import React, { useContext, useState, useEffect } from 'react'
import { Pagination } from '@material-ui/lab'
import { useNavigate } from 'react-router-dom';
import { CurrencyContext } from '../CryptoState';
import { numberWithCommas } from './Banner/Carousel';
import { darkTheme } from './Header';


const useStyle = makeStyles({
    row: {
        backgroundColor: "#16171a",
        cursor: "pointer",
        "&:hover": {
            backgroundColor: "#131211",
        },
        fontFamily: "Montserrat",
    },
    pagination: {
        "&.MuiPaginationItem-root": {
            color: "gold",
        },
    },


});
function Coinstable() {
    const classes = useStyle();

    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1)
    const { currency, coins, loading, fetchTrendingCoins } = useContext(CurrencyContext);

    // console.log(coins)

    useEffect(() => {
        fetchTrendingCoins();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currency]);

    const handleSearch = () => {
        return coins.filter(
            (coin) =>
                coin.name.toLowerCase().includes(search) || coin.name.toUpperCase().includes(search) ||
                coin.symbol.toLowerCase().includes(search) || coin.symbol.toUpperCase().includes(search)
        );
    };
    const navigate = useNavigate();
    const { symbol } = useContext(CurrencyContext)

    return (
        <ThemeProvider theme={darkTheme} >
            <Container style={
                {
                    textAlign: 'center'
                }
            }>
                <Typography variant='h4' style={
                    {
                        margin: 18,
                        fontFamily: "Montserrat",
                    }
                }>Current Market values of Cryptocurrency
                </Typography>
                <TextField label="Search for a Crypto Currency...." variant='outlined'
                    style={
                        {
                            marginBottom: 20,
                            width: "100%"
                        }

                    } onChange={(e) => setSearch(e.target.value)}></TextField>

                <TableContainer>
                    {
                        loading ? (<LinearProgress style={{ backgroundColor: "gold" }}></LinearProgress>)
                            : (
                                <Table>
                                    <TableHead style={{
                                        backgroundColor: "gold",
                                    }}>
                                        <TableRow>
                                            <TableCell style={{
                                                color: "black",
                                                fontWeight: "700",
                                                fontFamily: "Montserrat",
                                            }}
                                            >Coin</TableCell>
                                            <TableCell style={{
                                                color: "black",
                                                fontWeight: "700",
                                                fontFamily: "Montserrat",
                                            }} align="right">Price</TableCell>
                                            <TableCell style={{
                                                color: "black",
                                                fontWeight: "700",
                                                fontFamily: "Montserrat",
                                            }} align="right">24th Change</TableCell>
                                            <TableCell style={{
                                                color: "black",
                                                fontWeight: "700",
                                                fontFamily: "Montserrat",
                                            }} align="right">Market Cap</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            handleSearch()
                                                .slice((page - 1) * 10, (page - 1) * 10 + 10)
                                                .map(row => {
                                                    const profit = row.price_change_percentage_24h > 0;
                                                    return (
                                                        <TableRow onClick={() => navigate(`/coins/${row.id}`)}
                                                            className={classes.row}
                                                            key={row.name}
                                                        >
                                                            <TableCell
                                                                // component="th"
                                                                // scope="row"
                                                                style={{
                                                                    display: "flex",
                                                                    gap: 15,
                                                                }}
                                                            >
                                                                < img
                                                                    src={row?.image}
                                                                    alt={row.name}
                                                                    height="50"
                                                                    style={{ marginBottom: 10 }}
                                                                />
                                                                <div
                                                                    style={{ display: "flex", flexDirection: "column" }}
                                                                >
                                                                    <span
                                                                        style={
                                                                            {
                                                                                textTransform: "uppercase",
                                                                                fontSize: 22,
                                                                            }}
                                                                    >
                                                                        {row.symbol}
                                                                    </span>
                                                                    <span style={{ color: "darkgrey" }}>
                                                                        {row.name}
                                                                    </span>
                                                                </div>
                                                            </TableCell>
                                                            <TableCell align="right">
                                                                {symbol}{" "}
                                                                {numberWithCommas(row.current_price.toFixed(2))}
                                                            </TableCell>
                                                            <TableCell
                                                                align="right"
                                                                style={{
                                                                    color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                                                                    fontWeight: 500,
                                                                }}
                                                            >
                                                                {profit && "+"}
                                                                {row.price_change_percentage_24h.toFixed(2)}%
                                                            </TableCell>
                                                            <TableCell align="right">
                                                                {symbol}{" "}
                                                                {numberWithCommas(
                                                                    row.market_cap.toString().slice(0, -6)
                                                                )}
                                                                M
                                                            </TableCell>
                                                        </TableRow>
                                                    )
                                                })
                                        }
                                    </TableBody>
                                </Table>
                            )
                    }
                </TableContainer>
                <Pagination count={(handleSearch()?.length / 10).toFixed(0)}
                    style={{
                        padding: 20,
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                    }}
                    classes={{ ul: classes.pagination }}
                    onChange={(_, value) => {
                        setPage(value);
                        window.scroll(0, 400);
                    }}
                ></Pagination>
            </Container>
        </ThemeProvider >

    )
}

export default Coinstable