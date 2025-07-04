// src/App.jsx
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./components/pages/HomePage";
import Login from "./components/Auth/Login";
import { Signup } from "./components/Auth/Signup";
import AllMembers from "./components/admin/AllMembers";
import AllEquipment from "./components/admin/AllEquipment";
import AddEquipment from "./components/admin/AddEquipment";
import ProfilePage from "./components/pages/ProfilePage";
import UpdateProfile from "./components/pages/UpdateProfile";
import AssignEquipment from "./components/AssignmentEquipment/AssignEquipment";
import DetailsOfEquipment from "./components/admin/DetailsOfEquipment";
import DetailsOfMember from "./components/admin/DetailsOfMember";
import UpdateMember from "./components/admin/UpdateMember";
import UpdateEquipment from "./components/admin/UpdateEquipment";
import EquipmentHistory from "./components/AssignmentEquipment/EquipmentHistory";
import UserHistory from "./components/AssignmentEquipment/UserHistory";
import Success from "./components/pages/Success";
import Cancel from "./components/pages/Cancel";

const appRouter = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },

  // admin routes
  { path: "/admin/add-employee", element: <Signup /> },
  { path: "/admin/all-employee", element: <AllMembers /> },
  { path: "/admin/add-equipment", element: <AddEquipment /> },
  { path: "/admin/all-equipment", element: <AllEquipment /> },
  { path: "/admin/equipment-details/:id", element: <DetailsOfEquipment /> },
  { path: "/admin/member-details/:id", element: <DetailsOfMember /> },
  { path: "/admin/member-update/:id", element: <UpdateMember /> },
  { path: "/admin/equipment-update/:id", element: <UpdateEquipment /> },

  // user routes
  { path: "/user/profile", element: <ProfilePage /> },
  { path: "/user/update-profile", element: <UpdateProfile /> },

  // assignment routes
  { path: "/assign-equipment/:equipmentId", element: <AssignEquipment /> },
  { path: "/history-user/:userId", element: <UserHistory /> },
  { path: "/history-equipment/:equipmentId", element: <EquipmentHistory /> },

  // payment routes
  {
    path : "/payment/success",
    element: <Success/>
  },{
    path : "/payment/cancel",
    element : <Cancel/>
  }

]);

function App() {
  return <RouterProvider router={appRouter} />;
}

export default App;
