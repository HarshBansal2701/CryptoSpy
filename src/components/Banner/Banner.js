import React from 'react';
import "./Banner.css";
import { Container, Typography } from '@mui/material';
import Carousel from './Carousel';

const Banner = () => {
  return (
    <div className='banner'>
        <Container className='Bannercontent'>
            <div className="tagline">
              <Typography
                variant='h2'
                style={{
                  fontWeight:"bold",
                  marginBottom: 15,
                  fontFamily: "Montserrat",
                }}>
                  Crypto Spy
              </Typography>

              <Typography
              variant='subtitle2'
              style={{
                color: "darkgray",
                textTransform: "capitalize",
                fontFamily: "montserrat",
              }}>
                Get All The Info Regarding Your Favorite Crypto Currency
              </Typography>
            </div>

            <Carousel/>
        </Container>
    </div>
  )
}

export default Banner