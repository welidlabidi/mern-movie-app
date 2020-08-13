import React, { useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Landingpage from "../homepage/landingpage";
import register from "../register/register";
import Login from "../login/login";
import App from "../../cardifo/appmovie/App";
import createContext from "../context/context";

const Routers = () => {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  return (
    <>
      <BrowserRouter>
        <createContext.Provider value={{ userData, setUserData }}>
          <Switch>
            <Route exact path="/" component={Landingpage} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={register} />
            <Route path="/app" component={App} />
          </Switch>
        </createContext.Provider>
      </BrowserRouter>
    </>
  );
};

export default Routers;
