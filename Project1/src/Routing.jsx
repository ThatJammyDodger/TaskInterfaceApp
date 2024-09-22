import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import './App.css'
import HomePage from './Pages/HomePage'
import Page404 from './Pages/Page404'
import About from './Pages/About'
import Navbar from './Components/navbar'

function Routing() {
  const router = createBrowserRouter(
    [
      {
        path: '/',
        element: <HomePage />,
        errorElement: <Page404 />
      },
      {
        path: '/about',
        element: <About />,
        errorElement: <Page404 />
      }
    ]
  )

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default Routing
