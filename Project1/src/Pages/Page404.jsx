import "./Page404.css"
import Navbar from "../Components/navbar"

export default function Page404() {
    return (
        <>
          <div>
            <Navbar />
          </div>
          <div className="outlet-container">
            <p>Sadly, the page you were looking for is a bit lost.</p>
          </div>
        </>
    )
}