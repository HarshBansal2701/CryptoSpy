import React, { useEffect , useState} from 'react';
import { useParams } from 'react-router-dom';
import { SingleCoin } from '../config/api';
import { CryptoState } from "./../CryptoContext"; 
import axios from 'axios';
import CoinInfo from "./../components/CoinInfo";
import { Button, LinearProgress, Typography } from '@mui/material';
import {numberWithCommas} from "./../components/Banner/Carousel"
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../Firebase';

const CoinPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();
  const { currency , symbol , user  , watchlist , setalert} = CryptoState();

  const fetchCoin = async() =>{
    const { data } = await axios.get(SingleCoin(id));
    setCoin(data);
  };


  useEffect(()=>{
    fetchCoin();
  }, []);

  const inWatchlist = watchlist?.includes(coin?.id);

  const addtoWatchlist = async () =>{
    const coinRef  = doc(db , "watchlist" , user.uid);

    try {
      await setDoc(coinRef,
        {coins:watchlist?[...watchlist, coin?.id]:[coin?.id]});

        setalert({
          open: true,
          message:`${coin.name} Add to the Watchlist !`,
          type: "success",
        });
    } catch (error) {
      setalert({
        open: true,
        message: error.message,
        type: "error",
      });
    }
  };

  const removeFromWatchlist = async () => {
    const coinRef  = doc(db , "watchlist" , user.uid);

    try {
      await setDoc(coinRef,
        {coins: watchlist.filter((watch)=> watch !== coin?.id)},
        {merge: "true"}
        );

        setalert({
          open: true,
          message:`${coin.name} Remove from the Watchlist !`,
          type: "success",
        });
    } catch (error) {
      setalert({
        open: true,
        message: error.message,
        type: "error",
      });
    }
  };

  if(!coin) return <LinearProgress style={{backgroundColor: "gold"}}/>


  return (
    <div style={{display:"flex"}}>
      <div style={{
        width: "30%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: 25,
        borderRight: "2px solid grey", 
      }}>
          <img src={coin?.image.large} alt={coin?.name} height="200" style={{marginBottom: 20 , alignSelf: "center"}} />
          <Typography variant='h3' style={{fontWeight:"bold" , marginBottom: 20 , fontFamily: "Montserrat"}}>{coin?.name}</Typography>
          <Typography variant='subtitle1' style={{
            width: "100%",
            fontFamily: "Montserrat",
            padding: 25,
            paddingBottom: 15,
            paddingTop: 0,
            textAlign: "justify",
          }}>{coin?.description.en.split(". ")[0]}.</Typography>
          
          <div style={{
            alignSelf: "start",
            padding: 25,
            paddingTop: 10,
            width: "100%",
          }}>
              <span style={{display: 'flex'}}>
                <Typography variant='h5' style={{fontWeight:"bold" , marginBottom: 20 , fontFamily: "Montserrat"}}>
                  Rank:
                </Typography>
                &nbsp;&nbsp;
                <Typography variant='h5' style={{fontFamily: "Montserrat"}}>{coin?.market_cap_rank}</Typography>
                </span>

                <span style={{display: 'flex'}}>
                <Typography variant='h5' style={{fontWeight:"bold" , marginBottom: 20 , fontFamily: "Montserrat"}}>
                  Current Price:
                </Typography>
                &nbsp;&nbsp;
                <Typography variant='h5' style={{fontFamily: "Montserrat"}}>{symbol}{" "}{numberWithCommas(coin?.market_data.current_price[currency.toLowerCase()])}</Typography>
                </span>

                <span style={{display: 'flex'}}>
                <Typography variant='h5' style={{fontWeight:"bold" , marginBottom: 20 , fontFamily: "Montserrat"}}>
                  Market Cap:{" "}
                </Typography>
                &nbsp;&nbsp;
                <Typography variant='h5' style={{fontFamily: "Montserrat"}}>{symbol}{" "}{numberWithCommas(coin?.market_data.market_cap[currency.toLowerCase()].toString().slice(0,-6))}M</Typography>
                </span>

                {user && (
                  <Button variant="outline" style={{
                    width: "100%",
                    height: 40,
                    backgroundColor: inWatchlist? "#f00": "#EEBC1D",
                  }} onClick={inWatchlist? removeFromWatchlist : addtoWatchlist}>
                    {inWatchlist? "Remove from Watchlist" :"Add to Watchlist"}
                  </Button>
                )}

          </div>

      </div>
        <CoinInfo coin={coin} />
    </div>
  )
}

export default CoinPage