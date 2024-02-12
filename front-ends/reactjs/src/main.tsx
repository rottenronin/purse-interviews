import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"

import './index.css'
import ErrorPage from './Error.tsx'
import LeaveRequestForm from './pages/LeaveRequestForm.tsx'
import LeaveRequestList from './pages/LeaveRequestList.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <LeaveRequestList />
      },
      {
        path: '/leave-request-form',
        element: <LeaveRequestForm />
      }
    ]
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
