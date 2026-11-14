import React from "react";
import { BrowserRouter,Routes,Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";
import Jobs from "./pages/Jobs";
import Register from "./pages/Register";
import JobDetails from "./pages/JobDetails";
import MyApplications from "./pages/MyApplications";
import AdminApplicants from "./pages/AdminApplicants";
import AdminAddJob from "./pages/AdminAddJob";
import AdminManageJobs from "./pages/AdminManageJobs";
import AdminEditJob from "./pages/AdminEditJob";
import MyBookmarks from "./pages/MyBookmarks";
function App(){

  return(

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Home/>}
        />

        <Route
          path="/login"
          element={<Login/>}
        />
        <Route
  path="/admin/add-job"
  element={<AdminAddJob/>}
/>

        <Route
          path="/admin"
          element={<AdminDashboard/>}
        />
        <Route
  path="/register"
  element={<Register/>}
/>
        <Route
 path="/admin/applicants"
 element={<AdminApplicants/>}
/>
        <Route
 path="/applications"
 element={<MyApplications/>}
/>
        <Route
  path="/job/:id"
  element={<JobDetails/>}
/>
<Route
  path="/admin/manage-jobs"
  element={<AdminManageJobs/>}
/>
<Route
  path="/admin/edit-job/:id"
  element={<AdminEditJob/>}
/>
        <Route
          path="/user"
          element={<UserDashboard/>}
        />
        <Route
  path="/jobs"
  element={<Jobs/>}
/>
<Route
  path="/bookmarks"
  element={<MyBookmarks/>}
/>

      </Routes>

    </BrowserRouter>

  );

}

export default App;