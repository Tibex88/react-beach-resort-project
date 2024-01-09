import React, { Component, useContext } from "react";
import { Link } from "react-router-dom";
// import { FaAlignRight } from "react-icons/fa";
import logo from "../images/logo.svg";
// import Profile from "./Profile";
import { createTheme, ThemeProvider } from '@mui/material/styles';
// import GlobalStyles from '@mui/material/GlobalStyles';
// import CssBaseline from '@mui/material/CssBaseline';
import { AppBar, Button, Toolbar, Typography } from "@mui/material";

import { withUserConsumer } from "../context/userContext";
import SignIn from "../pages/SignIn";


function Navbar ({ context }) {
  var state = {
    isOpen: false
  };
  const handleToggle = () => {
    this.setState({ isOpen: !state.isOpen });
  };
  const {firstName, lastName, role,auth,logout} = context

    return (
      // <ThemeProvider theme={defaultTheme}>
      // <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
      // <CssBaseline />
      <AppBar
      position="static"
      color="default"
      elevation={0}
      sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
    >
      <Toolbar display="flex" gap="5px" alignItems={"center"} justifyContent="center" margin="10px 0">
      {/* <img src={logo} alt="Beach Resort" /> */}
        <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
          Beach Resort
        </Typography>
        <nav>
          <a
            // variant="button"
            // color="text.primary"
            href="/"
            // sx={{ my: 1, mx: 1.5 }}
          >
            Home
          </a>
          <a
            // variant="button"
            // color="text.primary"
            href="/rooms"
            // sx={{ my: 1, mx: 1.5 }}
          >
            Rooms
          </a>
          {
            role === "manager"?
            <>
            <a href="/dashboard/rooms">
            Dash-Rooms
          </a>
          <a href="/dashboard/users">
            Dash-users
          </a>
            </>
            :
            <></>
          }

          <a
            // variant="button"
            // color="text.primary"
            href="/profile"
            // sx={{ my: 1, mx: 1.5 }}
          >
            Profile
          </a>
        </nav>
        <Button 
        // href={auth ? "/signin":"#"} 
        onClick={()=>{
          !auth && logout()
         }}
        variant="outlined" sx={{ my: 1, mx: 1.5 }}>
                  {auth?"Logout":"Signin"}
        </Button>
      </Toolbar>
    </AppBar>
    // </ThemeProvider>
    );
  }

export default withUserConsumer(Navbar); 
  