import React from "react";
import "./App.css";

import Home from "./pages/Home";
import Rooms from "./pages/Rooms";
import SingleRoom from "./pages/SingleRoom";
import Error from "./pages/Error";
import SignUp from "./pages/SignUp.js";
import SignIn from "./pages/SignIn.js";
import DashBoard from "./pages/DashBoard.js";

import Navbar from "./components/Navbar";
import RoomsTable from "./components/RoomsTable.js"; 
import UsersTable from "./components/UsersTable.js";
import ForgotPassword from "./pages/ForgotPassword.js";
import ResetPassword from "./pages/ResetPassword.js";
import Profile from "./pages/Profile.js";

import Alert from '@mui/material/Alert';

import { useContext } from "react";
import { APIErrorContext } from "./context/errorContext.js";


import { Switch, Route, Router } from "react-router-dom";

function App() {
  const {error, isError, removeError} = useContext(APIErrorContext);
  return (
    <>
    {/* <Router> */}
      <Navbar />
      {isError  &&
      <Alert variant="filled" severity={error.status} onClose={() => {removeError()}}>
        {error.message}
      </Alert>
      }
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/rooms/" component={Rooms} />
        <Route exact path="/rooms/:slug" component={SingleRoom} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/forgotpassword/" component={ForgotPassword} />
        <Route exact path="/resetpassword/:token" component={ResetPassword} />
        <Route path='/profile' component={Profile} /> 

        {/* <Route exact path="/dashboard" component={DashBoard}> */}
        {/* <Route path='/users' component={Topic} /> */}
        {/* </Route> */}
        <Route path='/dashboard/rooms' component={RoomsTable} /> 
        <Route path='/dashboard/users' component={UsersTable} /> 
        <Route component={Error} />
      </Switch>
      {/* </Router> */}
    </>
  );
}

export default App;
