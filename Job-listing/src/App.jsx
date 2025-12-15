import React from 'react';
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Navigate,
} from 'react-router-dom';

import Mainlayout from './Layout/Mainlayout';
import HomePage from './Pages/HomePage';
import JobsPage from './Pages/JobsPage';
import NotFoundPage from './Pages/NotFoundPage';
import { jobLoader } from "./loaders/jobLoader.jsx";
import JobPage from './Pages/JobPage';
import AddJobPage from './Pages/AddJobPage';
import PrivateRoute from './Components/PrivateRoute';
import AISearchPage from './Pages/AISearchPage';
import ProfilePage from './Pages/ProfilePage';
import MyApplicationsPage from './Pages/MyApplicationsPage';
import AICandidateSearchPage from './Pages/AICandidateSearchPage';
import EmployerDashboard from './Pages/EmployerDashboard';
import LandingPage from "./Pages/LandingPage.jsx";
import Signup from "./Pages/Signup.jsx";
import Login2 from "./Pages/Login.jsx";
import AddJob from "./Pages/AddJob.jsx";
import SubmitJob from './Pages/SubmitJob.jsx';
import ProtectedPages from './Layout/ProtectedPages.jsx';
import MessagesPage from './Pages/MessagesPage.jsx';
import ApplicantProfile from './Pages/ApplicantProfile.jsx';
import JobApplicationsPage from './Pages/JobApplicationsPage.jsx';
import ResponsesPage from './Pages/ResponsesPage.jsx';
import FeedPage from './Pages/FeedPage.jsx';



const App = () => {
  const isAuth = localStorage.getItem("isAuth");

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        {/* ---------------- PUBLIC ROUTES ---------------- */}
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/signup2" element={<Signup />} />
        <Route path="/login2" element={<Login2 />} />
        <Route path="/add-job2" element={<AddJob />} />
        <Route path="/submit-job" element={<SubmitJob />} />
       

        {/* ---------------- PROTECTED ROUTES ---------------- */}
        <Route
          path="/"
          element={
            isAuth ? (
              <PrivateRoute>
                <ProtectedPages />
              </PrivateRoute>
            ) : (
              <Navigate to="/landing" replace />
            )
          }
        >
          <Route index element={<HomePage />} />
          <Route path="jobs" element={<JobsPage />} />

          {/* Loader Route */}
          <Route
            path="jobs/:id"
            element={<JobPage />}
            loader={jobLoader}
          />

          <Route path="add-job" element={<AddJobPage />} />
          <Route path="ai-search" element={<AISearchPage />} />
          <Route path="applicant-profile" element={<ApplicantProfile />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="messages" element={<MessagesPage />} />
          <Route path="feed" element={<FeedPage />} />
          <Route path="my-applications" element={<MyApplicationsPage />} />
          <Route path="employer/find-talent" element={<AICandidateSearchPage />} />
          <Route path="employer/dashboard" element={<EmployerDashboard />} />
          <Route path="jobs/:jobId/applications" element={<JobApplicationsPage />} />
          <Route path="responses" element={<ResponsesPage />} />

          {/* 404 for protected pages */}
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
