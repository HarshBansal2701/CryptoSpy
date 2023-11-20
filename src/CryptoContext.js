import React, { createContext, useContext, useEffect, useState } from 'react'
import  axios  from 'axios';
import { CoinList } from './config/api';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from './Firebase';
import { doc, onSnapshot } from 'firebase/firestore';

const Crypto = createContext()

const CryptoContext = ({children}) => {

    const [currency, setcurrency] = useState("INR");
    const [symbol, setsymbol] = useState("₹");
    const [coins, setcoins] = useState([]);
    const [loading, setloading] = useState(false);
    const [user, setuser] = useState(null);
    const [alert, setalert] = useState({
        open: false,
        message: "",
        type: "Success",
    });

    const [watchlist, setwatchlist] = useState([])

    useEffect(() => {
      if( user ){
        const coinRef = doc(db, "watchlist", user.uid);

        var unsubscribe = onSnapshot(coinRef , (coin) =>{
          if(coin.exists()){
            console.log(coin.data().coins);
            setwatchlist(coin.data().coins);
          }else{
            console.log("No Items in Watchlist");
          }
        });
        return ()=>{
          unsubscribe();
        };
      }
  
    }, [user])
    

    useEffect(()=>{
      onAuthStateChanged(auth, user =>{
        if(user) setuser(user);
        else setuser(null);

        console.log(" khkdhdv " , user);
      })


    } , [])


    const fetchCoins = async () => {
        setloading(true);
        const { data } = await axios.get(CoinList(currency));
        setcoins(data);
        setloading(false);
      };


    useEffect(()=>{
        if(currency==="INR") setsymbol("₹");
        else if (currency==="USD") setsymbol("$")
    }, [currency]);




  return <Crypto.Provider value={{currency, symbol, setcurrency , coins , loading , fetchCoins , alert, setalert , user, watchlist}}>{children}</Crypto.Provider>
};

export default CryptoContext;

export const CryptoState = ()=>{
    return useContext(Crypto);
}