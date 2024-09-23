import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import SignupButton from "./SignupButton";
import Stack from "@mui/material/Stack"

export const NavBarButtons = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <div className="nav-bar__buttons">
      {!isAuthenticated && (
        <Stack spacing={1} direction="row">
          <SignupButton />
          <LoginButton />
        </Stack>
      )}
      {isAuthenticated && (
        <>
          <LogoutButton />
        </>
      )}
    </div>
  );
};
