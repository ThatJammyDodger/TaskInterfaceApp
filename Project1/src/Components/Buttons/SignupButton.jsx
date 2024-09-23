import { useAuth0 } from "@auth0/auth0-react";
import Button from '@mui/material/Button';

import "./SignupButton.css"


export default function SignupButton() {
    const { loginWithRedirect } = useAuth0();

    const handleLogin = async () => {
        await loginWithRedirect({
            appState: {
                returnTo: "/profile",
            },
            authorizationParams: {
                screen_hint: "signup",
              },        
        });
    };

    return (
        <Button className="button__login" onClick={handleLogin} variant="contained">
            Sign up
        </Button>
    )
}