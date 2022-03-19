import React from 'react'
import { AppBar, Container, createTheme, MenuItem, Select, ThemeProvider, Toolbar, Typography } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';
import { useNavigate } from "react-router-dom";
import { CryptoState } from '../CryptoContext';

const useStyles = makeStyles(() => ({
  title: {
    flex: 1,
    color: "gold",
    fontFamily: "Montserrat",
    fontWeight: "bolder",
    cursor: "pointer",
  }
}));

const Header = () => {

  const classes = useStyles();
  const navigate = useNavigate();
  const darkTheme = createTheme({
    palette:{
      primary: {
        main: "#fff"
      },
      type: "dark"
    }
  });

  const {currency, setCurrency} = CryptoState("inr");

  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <AppBar color='transparent' position='static'>
          <Container>
            <Toolbar>
              <Typography onClick={()=> navigate("/")} className={classes.title}>
                  Crypto Hunter
              </Typography>
              <Select  
                variant='outlined'
                style={
                  {
                    width: 100,
                    height: 40,
                    marginRight: 15
                  }
                }
                value={currency}
                onClick={(e) => setCurrency(e.target.value)}
              >
                <MenuItem value={"inr"}>INR</MenuItem>
                <MenuItem value={"cad"}>CAD</MenuItem>
                <MenuItem value={"gbp"}>GBP</MenuItem>
                <MenuItem value={"usd"}>USD</MenuItem>
              </Select>
            </Toolbar>
          </Container>
        </AppBar>
      </ThemeProvider>
    </div>
  )
}

export default Header
