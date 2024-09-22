import { Outlet } from "react-router-dom";
import "./Container.css"
import Navbar from "./Components/navbar";

export default function Container() {
    return (
        <>
          <div>
            <Navbar />
          </div>
          <div className="outlet-container">
            <Outlet />
          </div>
        </>
    )
}