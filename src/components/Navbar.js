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
import { NavLink } from "react-router-dom/cjs/react-router-dom";


function Navbar ({ context }) {
  var state = {
    isOpen: false
  };
  const handleToggle = () => {
    this.setState({ isOpen: !state.isOpen });
  };
  const {firstName, lastName, me,logout, isLoggedIn} = context

    return (
      
      <AppBar position="static" color="default" elevation={0} sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }} >

      <Toolbar display="flex" gap="5px" alignItems={"center"} justifyContent="center" margin="10px 0">
      
        <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
          Beach Resort
        </Typography>
        
        <nav className=" nav-links" style={{display:"flex", gap:"5"}}>
          <NavLink to="/" > Home </NavLink>
          <NavLink to="/rooms" > Search </NavLink>
          { (isLoggedIn && me.role !== "user") && me.role !== "user" ?
            <>
              <NavLink to="/dashboard/rooms"> Rooms </NavLink>
              <NavLink to="/dashboard/users"> Users </NavLink>
              <NavLink to="/profile"> Profile </NavLink>
            </> : <></> 
          }        
        </nav>

        { isLoggedIn ? 
          <Button onClick={()=>{ logout() }} variant="outlined" sx={{ my: 1, mx: 1.5 }}>
              Logout
          </Button>
            :
          <Button href="/signin" variant="outlined" sx={{ my: 1, mx: 1.5 }} > 
                Signin
          </Button> 
         }
        
      </Toolbar>
    </AppBar>
    );
  }

export default withUserConsumer(Navbar);