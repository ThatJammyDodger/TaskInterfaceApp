import "./HomePage.css";
import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";

export default function HomePage() {
  const { isAuthenticated } = useAuth0();
  const [authenticated, setAuthenticated] = useState(isAuthenticated);
  let title = "Homepage"
  useEffect(() => {
    document.title = title
  }, [title])

  // Update state whenever isAuthenticated changes
  useEffect(() => {
    setAuthenticated(isAuthenticated);
  }, [ isAuthenticated ]);

  return (
    <>
      <h3>Homepage</h3>
      <p>Authenticated: {authenticated ? "Yes" : "No"}</p>
      <p>By the way, to view your tasks, you must be signed in.</p>
    </>
  );
}
