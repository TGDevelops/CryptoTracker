import { Container, createTheme, CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, ThemeProvider, Typography, makeStyles } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { CoinList } from '../config/api';
import { CryptoState } from '../CryptoContext';
import { useNavigate} from 'react-router-dom';


const useStyles = makeStyles(() => ({
  row: {
    flex: 1,
    color: "gold",
    fontFamily: "Montserrat",
    fontWeight: "bolder",
    cursor: "pointer",
  }
}));

const CoinsTable = () => {

  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState([true]);
  const { currency } = CryptoState();
  const [search, setSearch] = useState([]);
  const navigate = useNavigate();
  const classes = useStyles();

  const fetchCoins = async () => {
      const { data } = await axios.get(CoinList(currency));
      setCoins(data);
      setLoading(false);
  }

  useEffect(() => {
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
              <CircularProgress color="gold" />
            ) : (
              <Table>
              <TableHead style={{ backgroundColor: "#EEBC1D"}}>
                <TableRow>
                  {["Coin", "Price", "Last 24h Change", "Market Cap"]. map((head)=>(
                    <TableCell 
                      style={{
                        color: "black",
                        fontWeight: "700",
                        fontFamily: "Montserrat"
                      }}
                      key={head}
                      align={head==="Coin" ? "":"right"}
                    >
                      {head}
                    </TableCell>
                  ))} 
                </TableRow>
              </TableHead>
              <TableBody>
                {handleSearch().map((coin) => {
                  const profit = coin.price_change_percentage_24h >0;
                  return(
                    <TableRow
                      onClick={()=> navigate('/coins/${coin.id')}
                      className={classes.row}
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        styles={{
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
                              fontSize: 22
                            }}
                          >
                            {coin.symbol}
                          </span>
                          <span
                            style={{ color: "darkgray"}}
                          >{coin.name}</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
            )}
          </TableContainer>
        </Container>
    </ThemeProvider>
  )
}

export default CoinsTable
