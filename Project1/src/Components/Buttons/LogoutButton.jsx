import './LogoutButton.css'
import Button from "@mui/material/Button"
import { useAuth0 } from '@auth0/auth0-react'

export const LogoutButton = () => {
    const { logout } = useAuth0();
  
    const handleLogout = () => {
      logout({
        logoutParams: {
          returnTo: window.location.origin,
        },
      });
    };
  
    return (
      <Button className="button__logout" onClick={handleLogout} variant="contained" color='success'>
        Log Out
      </Button>
    );
  };

  export default LogoutButton