import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Admin from "../layouts/Admin";

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/admin" render={(props) => <Admin {...props} />} />
        <Redirect to="/admin/dashboard" />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
