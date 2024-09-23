import { withAuthenticationRequired } from "@auth0/auth0-react";
import React from "react";
import Loading from "./Loading.jsx";

export const AuthenticationGuard = ({ component }) => {
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => (
      <div className="page-layout">
        <Loading />
        <p>Redirecting you to the login page.</p>
      </div>
    ),
  });

  return <Component />;
};