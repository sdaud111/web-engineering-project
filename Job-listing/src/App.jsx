import React from 'react'
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Navigate,
} from 'react-router-dom'

import Mainlayout from './Layout/Mainlayout'
import HomePage from './Pages/HomePage'
import JobsPage from './Pages/JobsPage'
import NotFoundPage from './Pages/NotFoundPage'
import JobPage, { jobLoader } from './Pages/JobPage'
import AddJobPage from './Pages/AddJobPage'
import LoginPage from './Pages/LoginPage'
import PrivateRoute from './Components/PrivateRoute'
import SignupPage from './Pages/SignUpPage'
const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        {/* Default: redirect / to /login */}
        <Route index element={<Navigate to="/signup" />} />

        {/* Public Route */}
        <Route path="/signup" element={<SignupPage />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Mainlayout />
            </PrivateRoute>
          }
        >
           <Route path="/login" element={<LoginPage />} />
          <Route path="home" element={<HomePage />} />
          <Route path="jobs" element={<JobsPage />} />
          <Route path="add-job" element={<AddJobPage />} />
          <Route path="jobs/:id" element={<JobPage />} loader={jobLoader} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </>
    )
  )

  return <RouterProvider router={router} />
}

export default App
