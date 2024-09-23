import { useAuth0 } from "@auth0/auth0-react";
import Button from '@mui/material/Button';

import "./LoginButton.css"


export default function LoginButton() {
    const { loginWithRedirect } = useAuth0();

    const handleLogin = async () => {
        await loginWithRedirect({
            appState: {
                returnTo: "/profile",
            },
        });
    };

    return (
        <Button className="button__login" onClick={handleLogin} variant="outlined">
            Login
        </Button>
    )
}