import {
  AppBar,
  Container,
  createTheme,
  Toolbar,
  Typography,
  ThemeProvider,
  Select,
  MenuItem,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router";
import { CryptoState } from "../CryptoContext";
import AuthModal from "./Authentication/AuthModal";
import UserSidebar from "./Authentication/UserSidebar";

const Header = () => {
  const navigate = useNavigate();

  const { currency , setcurrency , user} = CryptoState();

  console.log(currency);

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "light",
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color="transparent" position="startic">
        <Container>
          <Toolbar>
            <Typography onClick={() => navigate("/")} className="title" variant="h5" >
              Crypto Spy
            </Typography>

            <Select
              variant="outlined"
              style={{
                width: 100,
                height: 40,
                marginRight: 15,
                color: "white",
                borderBlockColor: "white",
                
              }}
              value={currency}
              onChange={(e)=> setcurrency(e.target.value)}
            >
              <MenuItem value={"USD"}>USD</MenuItem>
              <MenuItem value={"INR"}>INR</MenuItem>
            </Select>

            {user ? <UserSidebar/> : <AuthModal/>}
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;
