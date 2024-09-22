import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import HomePage from './Pages/HomePage'
import Page404 from './Pages/Page404'
import About from './Pages/About'
import Navbar from './Components/navbar'
import Container from './Container'

function App() {
  const router = createBrowserRouter(
    [
      {
        path: '/',
        element: <Container />,
        errorElement: <Page404 />,
        children: [
          {
            path: '/',
            element: <HomePage />
          },
          {
            path: '/about',
            element: <About />
          }
        ]
      },
    ]
  )

  return (
    <>
      <RouterProvider router={router}>
      </RouterProvider>
    </>
  )
}

export default App
