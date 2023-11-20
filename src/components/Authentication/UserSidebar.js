import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import { CryptoState } from '../../CryptoContext';
import { Avatar } from '@mui/material';
import { signOut } from 'firebase/auth';
import { auth, db } from '../../Firebase';
import { numberWithCommas } from '../Banner/Carousel';
import { AiFillDelete } from 'react-icons/ai';
import { doc, setDoc } from 'firebase/firestore';

export default function UserSidebar() {
  const [state, setState] = React.useState({
    right: false,
  });

  const { user , setalert , watchlist , coins , symbol} = CryptoState();
  

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const logOut = ()=>{
    signOut(auth);

    setalert({
      open: true,
      type: "success",
      message : "Logout Successfull !",
    })
    toggleDrawer()
  };

  const removeFromWatchlist = async (coin) => {
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

  return (
    <div>
      {['right'].map((anchor) => (
        <React.Fragment key={anchor}>
          {/* <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button> */}
            <Avatar
                onClick = {toggleDrawer(anchor,true)}
                style={{
                    height: 38, width: 38 , marginLeft: 15 , cursor: "pointer" , backgroundColor: "#EEBC1D",
                }}
                src={user.photoURL}
                alt={user.displayName || user.email}
            />
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            <div style={{ width: 350,height: "100%" , padding: 25, display: "flex" , flexDirection: "column" , fontFamily: "monospace"}}>
                <div style={{
                    flex: 1, display: "flex" , flexDirection: "column" , alignItems: "center", gap: "20px" , height: "92%",
                }}> 
                <Avatar
                style={{
                    height: 200, width: 200 , cursor: "pointer" , backgroundColor: "#EEBC1D", objectFit: "contain"
                }}
                src={user.photoURL}
                alt={user.displayName || user.email}
            />
            <span style={{
                width: "100%", fontSize: 25 , textAlign: "center" , fontWeight: "bolder" , wordWrap: "break-word",
            }}>
                {user.displayName || user.email}
            </span>

                <div style={{
                    flex: 1,
                    width: "100%",
                    backgroundColor: "gray",
                    borderRadius: 7,
                    padding: 15,
                    paddingTop: 10,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    height: "50%",
                    gap: 12,
                    overflowY: "scroll",
}}>
                    <span style={{fontSize: 15 , textShadow: "0 0 5px black"}}>WatchList</span>
                    {coins.map((coin) =>{
                      if(watchlist.includes(coin.id)){
                        return (
                          <div style={{
                            padding: 10,
                            borderRadius: 5, color: "black" , width: "100%" , display: "flex" , justifyContent: "space-between",
                            alignItems: "center" , backgroundColor: "#EEBC1D", boxShadow: "0 0 3px black",
                          }}>
                            <span>{coin.name}</span>
                            <span style={{display:"flex" , gap:8}}>
                              {symbol}
                              {numberWithCommas(coin.current_price.toFixed(2))}
                              <AiFillDelete
                              style={{cursor: "pointer"}}
                              fontSize= "16" onClick={()=> removeFromWatchlist(coin)}/>
                            </span>
                          </div>
                        );
                      }
                    })}
                </div>
                </div>
                <Button variant='contained' onClick = { logOut }  style={{
                    height:"8%", width:"100%" , backgroundColor: "#EEBC1D", marginTop: 20,
                }}>
                    Log Out
                </Button>
            </div>
          </Drawer>

        </React.Fragment>
      ))}
    </div>
  );
}