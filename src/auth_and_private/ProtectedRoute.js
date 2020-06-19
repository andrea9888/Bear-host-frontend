import React from "react";
import { Route, Redirect } from "react-router-dom";

export const PrivateRoute = (props) => {
  let Component = props.component;
  let isAuthenticated = false;
  return (
    <Route
      render={(props) => {
        return isAuthenticated ? (
          <Component></Component>
        ) : (
          <Redirect to="/login"></Redirect>
        );
      }}
    ></Route>
  );
};