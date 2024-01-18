import React from "react";
import ReactDOM from "react-dom";
// import './index.css';
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { RoomProvider } from "./context/roomContext";
import { UserProvider } from "./context/userContext";
import { APIErrorProvider } from "./context/errorContext"
// import { NavigationProvider } from "./context/navigationContext";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
<BrowserRouter>
  {/* <NavigationProvider> */}
<APIErrorProvider>
  <UserProvider>
    <RoomProvider>
        <App />
    </RoomProvider>
  </UserProvider>
</APIErrorProvider>  
  {/* </NavigationProvider> */}
</BrowserRouter>
  ,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
