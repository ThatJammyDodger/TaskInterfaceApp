import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";
import { React, useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Loading from "./Components/Loading";

export const Auth0ProviderWithNavigate = ({ children }) => {
  const navigate = useNavigate();

  const domain = import.meta.env.VITE_REACT_APP_AUTH0_DOMAIN;
  const clientId = import.meta.env.VITE_REACT_APP_AUTH0_CLIENT_ID;
  const redirectUri = import.meta.env.VITE_REACT_APP_AUTH0_CALLBACK_URL;
  const audience = import.meta.env.VITE_REACT_APP_AUTH0_AUDIENCE;

  const onRedirectCallback = (appState) => {
    navigate(appState?.returnTo || window.location.pathname);
  };

  if (!(domain && clientId && redirectUri)) {
    return null;
  }

  const { isLoading } = useAuth0();
  const [ loading, setLoading ] = useState(isLoading);
  useEffect => (() => {
    setLoading(isLoading);
  }, [ isLoading ]);

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      audience={audience}
      authorizationParams={{
        redirect_uri: redirectUri,
      }}
      onRedirectCallback={onRedirectCallback}
    > 
      {false ? <Loading/ > : <Outlet />}
    </Auth0Provider>
  );
};
