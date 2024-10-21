import { createBrowserRouter } from "react-router-dom";

import Login from "../pages/Login";
import Home from "../pages/Home";
import Register from './../pages/Register';
import Add from "../pages/Add";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "login", 
        element: <Login />
      },
      {
        path: "register",
        element: <Register />
      },
      {
        path: "add",
        element: <Add />
      }
    ]
  }
]);

export default router;
