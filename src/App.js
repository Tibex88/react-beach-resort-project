import React from "react";
import "./App.css";

import Home from "./pages/Home";
import Rooms from "./pages/Rooms";
import SingleRoom from "./pages/SingleRoom";
import Error from "./pages/Error";
import SignUp from "./pages/SignUp.js";
import SignIn from "./pages/SignIn.js";
import RoomsTable from "./components/RoomsTable.js"; 
import UsersTable from "./components/UsersTable.js";
import DashBoard from "./pages/DashBoard.js";
import Navbar from "./components/Navbar";

import { Switch, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/rooms/" component={Rooms} />
        <Route exact path="/rooms/:slug" component={SingleRoom} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/signin" component={SignIn} />
        <Route path='/profile' component={RoomsTable} /> 


        <Route exact path="/dashboard" component={DashBoard}>
        {/* <Route path='/users' component={Topic} /> */}
        </Route>
        <Route path='/dashboard/rooms' component={RoomsTable} /> 
        <Route path='/dashboard/users' component={UsersTable} /> 
        <Route component={Error} />
      </Switch>
    </>
  );
}

export default App;
