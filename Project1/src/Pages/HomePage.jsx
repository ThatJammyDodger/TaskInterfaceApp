import "./HomePage.css"
import { useAuth0 } from "@auth0/auth0-react"

export default function HomePage() {
  const { isAuthenticated } = useAuth0();
    return (
        <>
          <h3>Homepage</h3>
          <p>Authenticated: {isAuthenticated}</p>
        </>
    )
}