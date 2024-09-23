import { useState } from 'react'
import { BrowserRouter, createBrowserRouter, RouterProvider } from "react-router-dom"
import HomePage from './Pages/HomePage'
import Page404 from './Pages/Page404'
import About from './Pages/About'
import Container from './Container'
import { CallbackPage } from './Pages/CallbackPage'
import { Auth0ProviderWithNavigate } from './Auth0WithNavigate'

function App() {
  const router = createBrowserRouter(
    [
      {
        path: '/',
        element: <Auth0ProviderWithNavigate />,
        children: [
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
          {
            path: '/callback',
            element: <CallbackPage />,
          }
        ]
      }
    ]
  )

  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
