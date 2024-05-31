import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import About from "../components/About";
import Blog from "../components/Blog";
import Dashboard from "../components/Dashboard/Dashboard";
import Register from "../components/Register/Register";
import Login from "../components/login/Login";
import Home from "../home/Home";
import Shop from "../shop/Shop";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/shop",
        element: <Shop />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/blog",
        element: <Blog />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
    ],
  },
]);
export default router;
