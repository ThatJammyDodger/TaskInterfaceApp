import { React, useEffect } from "react";
import Navbar from "../Components/navbar";

export const CallbackPage = () => {
  let title = "Callback"
  useEffect(() => {
    document.title = title
  }, [title])

  return (
    <div className="page-layout">
        <Navbar/>
      <div className="page-layout__content" />
    </div>
  );
};
