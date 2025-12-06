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
import PrivateRoute from './Components/PrivateRoute'
import AISearchPage from './Pages/AISearchPage'
import ProfilePage from './Pages/ProfilePage'
import MyApplicationsPage from './Pages/MyApplicationsPage'
import AICandidateSearchPage from './Pages/AICandidateSearchPage'
import EmployerDashboard from './Pages/EmployerDashboard'
import LandingPage from "./Pages/LandingPage.jsx";
import Signup from "./Pages/Signup.jsx";
import Login2 from "./Pages/Login.jsx";
import AddJob from "./Pages/AddJob.jsx";
import SubmitJob from './Pages/SubmitJob.jsx'

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        {/* Removed default redirect that was conflicting with the login flow */}
        
        {/* Public Routes */}
        <Route path={"/landing"} element={<LandingPage/>}/>
          <Route path={"/signup2"} element={<Signup/>}/>
          <Route path={"/login2"} element={<Login2/>}/>
          <Route path="add-job2" element={<AddJob />} />
          <Route path="submit-job" element={<SubmitJob/>}/>

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
