import { Container, createTheme, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, ThemeProvider, Typography, makeStyles } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { CoinList } from '../config/api';
import { CryptoState } from '../CryptoContext';
import { useNavigate} from 'react-router-dom';
import { Pagination } from '@material-ui/lab';


const useStyles = makeStyles(() => ({
  row: {
    backgroundColor: "#16171a",
    cursor: "pointer",
    "&:hover":{
      backgroundColor: "#131111",
    },
    fontFamily: "Montserrat"
  },
  pagination: {
    "& .MuiPaginationItem-root": {
      color: "gold"
    }
  }
}));

export function numberWithCommas(x){
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",");
}

const CoinsTable = () => {

  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState([true]);
  const { currency, symbol } = CryptoState();
  const [search, setSearch] = useState([]);
  const navigate = useNavigate();
  const classes = useStyles();
  const [ page, setPage ] = useState([1]);

  useEffect(() => {
    const fetchCoins = async () => {
      const { data } = await axios.get(CoinList(currency));
      setCoins(data);
      setLoading(false);
  };
    fetchCoins();
  }, [currency])

  console.log(coins);

  const darkTheme = createTheme({
      palette: {
        primary: {
          main: "#fff",
        },
        type: "dark"
      }
  });

  const handleSearch = ()=>{
    return coins.filter((coin)=>
      coin.name.toLowerCase().includes(search) ||
      coin.symbol.toLowerCase().includes(search)
    );
  };

  return (
    <ThemeProvider theme={darkTheme}>
        <Container style={{ textAlign: "center"}}>
          <Typography 
            variant='h4'
            style={{ margin: 18, fontFamily: "Montserrat"}}
          >
            Cryptocurrency Prices by Market Cap
          </Typography>

          <TextField
            label="Search for a Crypto.."
            variant='outlined'
            style={{ marginBottom: 20, width: "100%"}} 
            onChange={(e)=> setSearch(e.target.value)}         
          />
          <TableContainer>
            {loading ? (
              <CircularProgress color="secondary" />
            ) : (
              <Table>
              <TableHead style={{ backgroundColor: "#EEBC1D"}}>
                <TableRow>
                  {["Coin", "Price", "Last 24h Change", "Market Cap"].map((head)=>(
                    <TableCell 
                      style={{
                        color: "black",
                        fontWeight: "700",
                        fontFamily: "Montserrat"
                      }}
                      key={head}
                      align={head==="Coin" ? "inherit":"right"}
                    >
                      {head}
                    </TableCell>
                  ))} 
                </TableRow>
              </TableHead>
              <TableBody>
                {handleSearch().slice((page -1 )*10, (page-1)*10+10).map((coin) => {
                  const profit = coin.price_change_percentage_24h >0;
                  return(
                    <TableRow
                      onClick={()=> navigate('/coins/${coin.id')}
                      className={classes.row}
                      key={coin.name}
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        style={{
                          display: "flex",
                          gap: 15
                        }}
                      >
                        <img 
                          src={coin.image}
                          alt={coin.name}
                          height = "50"
                          style={{ marginBottom: 10 }}
                        />
                        <div
                          style={{ display: "flex", flexDirection: "column"}}
                        >
                          <span
                            style={{
                              textTransform: "uppercase",
                              fontSize: 18
                            }}
                          >
                            {coin.symbol}
                          </span>
                          <span
                            style={{ color: "darkgray"}}
                          >{coin.name}</span>
                        </div>
                      </TableCell>
                      <TableCell
                        align='right'
                      >
                        {symbol} {" "}
                        {numberWithCommas(coin.current_price.toFixed(2))}
                      </TableCell>
                      <TableCell
                        align='right'
                        style={{
                          color: profit>0 ? "rgb(14,203,129)": "red",
                          fontWeight: 500
                        }}
                      >
                        {profit && "+"}
                        {coin.price_change_percentage_24h.toFixed(2)}%
                      </TableCell>
                      <TableCell
                        align='right'
                      >
                        {symbol} {" "}
                        {numberWithCommas(
                          coin.market_cap.toString().slice(0,-6)
                        )}M
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
            )}
          </TableContainer>
          <Pagination 
            classes={{ ul: classes.pagination}}
            count={(handleSearch().length/10).toFixed(0)}
            onChange={(_, value) => {
              setPage(value);
              window.scroll(0,450);
            }}
          />
        </Container>
    </ThemeProvider>
  )
}

export default CoinsTable
