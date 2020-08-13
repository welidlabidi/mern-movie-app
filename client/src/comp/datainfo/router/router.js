import React, { useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Landingpage from "../homepage/landingpage";
import register from "../register/register";
import Login from "../login/login";
import App from "../../cardifo/appmovie/App";
import usercontext from "../datainfo/context/context";

const Routers = () => {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  return (
    <>
      <BrowserRouter>
        <usercontext.Provider value={{ userData, setUserData }}>
          <Switch>
            <Route exact path="/" component={Landingpage} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={register} />
            <Route path="/app" component={App} />
          </Switch>
        </usercontext.Provider>
      </BrowserRouter>
    </>
  );
};

export default Routers;
