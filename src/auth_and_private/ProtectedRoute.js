import React from "react";
import { Route, Redirect } from "react-router-dom";
import { auth } from "./authService";
export const PrivateRoute = (props) => {
  let Component = props.component;
  let isAuthenticated = auth.getAuthStatus();
  const appTrigger = props.appTrigger;
  return (
    <Route
      render={(props) => {
        return isAuthenticated ? (
          <Component appTrigger={appTrigger}></Component>
        ) : (
          <Redirect to="/login"></Redirect>
        );
      }}
    ></Route>
  );
};