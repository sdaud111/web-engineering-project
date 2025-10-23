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
import AISearchPage from './Pages/AISearchPage'
import ProfilePage from './Pages/ProfilePage'
import MyApplicationsPage from './Pages/MyApplicationsPage'
import AICandidateSearchPage from './Pages/AICandidateSearchPage'
import EmployerDashboard from './Pages/EmployerDashboard'
import LandingPage from './Pages/LandingPage'

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        {/* Removed default redirect that was conflicting with the login flow */}
        
        {/* Public Routes */}
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/landing" element={<LandingPage />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Mainlayout />
            </PrivateRoute>
          }
        >
          <Route index element={<HomePage />} />
          <Route path="jobs" element={<JobsPage />} />
          <Route path="add-job" element={<AddJobPage />} />
          <Route path="ai-search" element={<AISearchPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="my-applications" element={<MyApplicationsPage />} />
          <Route path="employer/find-talent" element={<AICandidateSearchPage />} />
          <Route path="employer/dashboard" element={<EmployerDashboard />} />
          <Route path="jobs/:id" element={<JobPage />} loader={jobLoader} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </>
    )
  )

  return <RouterProvider router={router} />
}

export default App
