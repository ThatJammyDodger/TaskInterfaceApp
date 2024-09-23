import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import HomePage from './Pages/HomePage'
import Page404 from './Pages/Page404'
import About from './Pages/About'
import Container from './Container'
import { AuthenticationGuard } from './Components/AuthenticationGuard'
import { CallbackPage } from './Pages/CallbackPage'
import { Auth0ProviderWithNavigate } from './Auth0WithNavigate'
import Profile from './Pages/Profile'

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Auth0ProviderWithNavigate />,
      errorElement: <Page404 />,
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
            },
            {
              path: '/profile',
              element: <AuthenticationGuard component={Profile} />
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

function App() {
  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
