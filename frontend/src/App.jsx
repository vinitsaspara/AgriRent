// src/App.jsx
import React from "react";
import { createBrowserRouter, RouterProvider, useParams } from "react-router-dom";

import HomePage from "./components/pages/HomePage";
import Login from "./components/Auth/Login";
import { Signup } from "./components/Auth/Signup";
import AllMembers from "./components/admin/AllMembers";
import AllEquipment from "./components/admin/AllEquipment";
import AddEquipment from "./components/admin/AddEquipment";
import DetailsOfEquipmentBase from "./components/admin/DetailsOfEquipment";
import DetailsOfMemberBase from "./components/admin/DetailsOfMember";
import UpdateMemberBase from "./components/admin/UpdateMember";
import ProfilePage from "./components/pages/ProfilePage";
import UpdateProfile from "./components/pages/UpdateProfile";
import UpdateEquipmentBase from "./components/admin/UpdateEquipment";
import AssignEquipmentBase from "./components/AssignmentEquipment/AssignEquipment";
import ReturnEquipmentBase from "./components/AssignmentEquipment/ReturnEquipment";
import UserHistoryBase from "./components/AssignmentEquipment/UserHistory";
import EquipmentHistoryBase from "./components/AssignmentEquipment/EquipmentHistory";
import { useSelector } from "react-redux";
import ReturnEquipment from "./components/AssignmentEquipment/ReturnEquipment";
import AssignEquipment from "./components/AssignmentEquipment/AssignEquipment";
import DetailsOfEquipment from "./components/admin/DetailsOfEquipment";
import DetailsOfMember from "./components/admin/DetailsOfMember";
import UpdateMember from "./components/admin/UpdateMember";
import UpdateEquipment from "./components/admin/UpdateEquipment";
// Wrapper components to get params and pass as props










const UserHistory = () => {
  const { userId } = useParams();
  return <UserHistoryBase userId={userId} />;
};

const EquipmentHistory = () => {
  const { equipmentId } = useParams();
  return <EquipmentHistoryBase equipmentId={equipmentId} />;
};

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
  { path: "/return-equipment/:equipmentId", element: <ReturnEquipment /> },
  { path: "/history-user/:userId", element: <UserHistory /> },
  { path: "/history-equipment/:equipmentId", element: <EquipmentHistory /> },
]);

function App() {
  return <RouterProvider router={appRouter} />;
}

export default App;
