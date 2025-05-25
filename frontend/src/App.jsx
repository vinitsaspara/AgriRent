import { Button } from "@/components/ui/button";
import Login from "./components/Auth/Login";
import { Signup } from "./components/Auth/Signup";
import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router";
import HomePage from "./components/pages/HomePage";
import AllMembers from "./components/admin/AllMembers";
import AllEquipment from "./components/admin/AllEquipment";
import AddEquipment from "./components/admin/AddEquipment";
import DetailsOfEquipment from "./components/admin/DetailsOfEquipment";

const appRouter = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },

  // admin routers
  { path: "/admin/add-employee", element: <Signup /> },
  { path: "/admin/all-employee", element: <AllMembers /> },
  { path: "/admin/add-equipment", element: <AddEquipment /> },
  { path: "/admin/all-equipment", element: <AllEquipment /> },
  { path: "/admin/equipment-details/:id", element: <DetailsOfEquipment /> },
]);

function App() {
  return <RouterProvider router={appRouter} />;
}

export default App;
