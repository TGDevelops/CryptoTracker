import { Container, makeStyles, Typography } from '@material-ui/core';
import React from 'react'
import Carousel from './Carousel';

const useStyles = makeStyles(() => ({
    banner: {
        backgroundImage: "url(./banner.jpg)"
    },
    bannerContent: {
        height: 400,
        display: "flex",
        flexDirection: "column",
        paddingTop: 50,
        justifyContent: "space-around",
    },
    tagLine: {
        display: "flex",
        height: "40%",
        flexDirection: "column",
        justifyContent: "center",
        textAlign: "center"
    }
}));

const Banner = () => {

  const classes = useStyles();

  return (
    <div className={classes.banner}>  
      <Container className={classes.bannerContent}>
        <div className={classes.tagLine}>
            <Typography
                variant='h2'
                style = {{
                    fontWeight: "bolder",
                    marginBottom: 15,
                    fontFamily: "Montserrat"
                }}
            >
                Crypto Hunter
            </Typography>
            <Typography
                variant='subtitle2'
                style={{
                    color: "darkgray",
                    textTransform: "capitalize",
                    fontFamily: "Montserrat"
                }}
            >
                Track all your favorite Crypto currencies at one place
            </Typography>
        </div>
        <Carousel/>
      </Container>
    </div>
  )
}

export default Banner;
