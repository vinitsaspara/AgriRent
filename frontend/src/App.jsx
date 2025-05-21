import { Button } from "@/components/ui/button";
import Login from "./components/Auth/Login";
import { Signup } from "./components/Auth/Signup";
import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router";
import HomePage from "./components/pages/HomePage";

const appRouter = createBrowserRouter([
  {path: "/", element: <HomePage />},
  {path: "/login", element: <Login />},
{path: "/signup",element: <Signup />},

  {path:"/add-employee",element:<Signup/>}
])


function App() {
  return (
   <RouterProvider router={appRouter} />
  );
}

export default App;
