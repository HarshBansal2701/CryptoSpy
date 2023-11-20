import axios from "axios";
import React, { useState } from "react";
import { CoinList } from "../config/api";
import { useNavigate } from "react-router";
import { CryptoState } from "../CryptoContext";
import { useEffect } from "react";
import {
  Container,
  LinearProgress,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import { numberWithCommas } from "./Banner/Carousel";

const CoinsTable = () => {

  const [search, setsearch] = useState("");
  const [page, setPage] = useState(1);

  const navigate = useNavigate();
  const { currency , symbol , coins , loading , fetchCoins} = CryptoState();



  console.log(coins);

  useEffect(() => {
    fetchCoins();
  }, [currency]);

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

  const handleSearch = () =>{
    return coins.filter((coin)=>(
      coin.name.toLowerCase().includes(search) || coin.symbol.toLowerCase().includes(search)
    ))
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <Container style={{ textAlign: "center" }}>
        <Typography
          variant="h4"
          style={{ margin: 18, fontFamily: "Montserrat" }}
        >
          Cryptocurrency Prices by Market Cap
        </Typography>

        <TextField
          label="Search For a Crypto Currency.."
          variant="outlined"
          style={{ marginBottom: 20, width: "100%"}}
          onChange={(e) => setsearch(e.target.value)}
        />

        <TableContainer>
          {loading ? (
            <LinearProgress style={{ backgroundColor: "gold" }} />
          ) : (
            <Table>
              <TableHead style={{ backgroundColor: "#EEBC1D" }}>
                <TableRow>
                  {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                    <TableCell
                      style={{
                        color: "black",
                        fontWeight: "700",
                        fontFamily: "Montserrrat",
                      }}
                      key={head}
                      align={head === "Coin" ? "" : "right"}
                    >
                      {head}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>


              <TableBody>{handleSearch().slice((page-1)*10, (page-1)*10 + 10).map(row=>{
                const profit = row.price_change_percentage_24h > 0;
                return (
                  <TableRow onClick = {()=> navigate(`/coins/${row.id}`)}
                  style={{
                    backgroundColor:"#16171a",
                    cursor:"pointer",
                    "&:hover":{
                      backgroundColor:"#131111"
                    },
                    fontFamily: "Montserrat",
                  }}
                   key={row.name}
                  >

                    <TableCell component="th" scope="row"
                    style={{ display:"flex",
                          gap: 15,
                        }}    
                    >
                      <img src={row?.image} alt={row.name} height="50" style={{marginBottom: 10 }}/>

                      <div style={{ display:"flex" , flexDirection: "column" }}>
                      <span style={{
                        textTransform: "uppercase",
                        fontSize: 22,
                        color: "white"
                      }}>
                        {row.symbol}
                      </span>
                      <span style={{color:"darkgray"}}>{row.name}</span>
                      </div>
                    </TableCell>

                    <TableCell align="right" style={{color:"white"}}>
                      {symbol}{" "}{numberWithCommas(row.current_price.toFixed(2))}

                    </TableCell>

                    <TableCell align="right" style={{
                      color: profit>0 ? "rgb(14,203,129)" : "red",
                      fontWeight: 500,
                    }}>
                      {profit && "+"}
                      {row.price_change_percentage_24h.toFixed(2)}%

                    </TableCell>

                    <TableCell align="right" style={{color:"white"}}>
                      {symbol}{" "}{numberWithCommas(row.market_cap.toString().slice(0,-6))}M
                    </TableCell>

                  </TableRow>
                )
              })}
              </TableBody>
            </Table>
          )}
        </TableContainer>

        <Pagination  style={{
          padding: 20,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          color: "white",
        }}
        count={(handleSearch()?.length / 10).toFixed(0)} variant="outlined" color="primary" 
        onChange={(_, value)=>{
          setPage(value);
          window.scroll(0,450);
        }}
        />

      </Container>
    </ThemeProvider>
  );
};

export default CoinsTable;
