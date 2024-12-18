import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import About from "../components/About";
import Blog from "../components/Blog";
import BuyCart from "../components/BuyCart";
import BuyWishlist from "../components/BuyWishlist";
import CheckOutPage from "../components/CheckOutPage";
import CreateListing from "../components/CreateListing/CreateListing";
import CreateRentListing from "../components/CreateRentListing/CreateRentListing";
import Register from "../components/Register/Register";
import RentCart from "../components/RentCart";
import RentListing from "../components/RentListing";
import RentWishlist from "../components/RentWishlist";
import SearchResults from "../components/SearchResults";
import Login from "../components/login/Login";
import Home from "../home/Home";
import HomeAfterLogin from "../home/HomeAfterLogin";
import Shop from "../shop/Shop";
import SingleBook from "../shop/SingleBook";
import SingleRentBook from "../shop/SingleRentBook";
import ProtectedRoute from "./ProtectedRoute";
import CategoryPage from "../components/CategoryPage";
import EditBookListing from "../components/CreateListing/EditBookListing";
import EditRentListing from "../components/CreateRentListing/EditRentListing";

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
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/book-sell/:id",
        element: <ProtectedRoute />,
        children: [
          {
            path: "",
            element: <SingleBook />,
          },
        ],
      },
      {
        path: "/create-listing",
        element: <ProtectedRoute />,
        children: [
          {
            path: "",
            element: <CreateListing />,
          },
        ],
      },
      {
        path: "/HomeAfterLogin",
        element: <ProtectedRoute />,
        children: [
          {
            path: "",
            element: <HomeAfterLogin />,
          },
        ],
      },
      {
        path: "/checkout",
        element: <ProtectedRoute />,
        children: [
          {
            path: "",
            element: <CheckOutPage />,
          },
        ],
      },
      {
        path: "/search",
        element: <ProtectedRoute />,
        children: [
          {
            path: "",
            element: <SearchResults />,
          },
        ],
      },
      {
        path: "/view_buy_cart",
        element: <ProtectedRoute />,
        children: [
          {
            path: "",
            element: <BuyCart />,
          },
        ],
      },
      {
        path: "/view_buy_wishlist",
        element: <ProtectedRoute />,
        children: [
          {
            path: "",
            element: <BuyWishlist />,
          },
        ],
      },

      {
        path: "/view_buy_wishlist",
        element: <ProtectedRoute />,
        children: [
          {
            path: "",
            element: <BuyWishlist />,
          },
        ],
      },

      {
        path: "/create-rent-listing",
        element: <ProtectedRoute />,
        children: [
          {
            path: "",
            element: <CreateRentListing />,
          },
        ],
      },

      {
        path: "/view_rent_listing",
        element: <ProtectedRoute />,
        children: [
          {
            path: "",
            element: <RentListing />,
          },
        ],
      },
      {
        path: "/book-rent/:id",
        element: <ProtectedRoute />,
        children: [
          {
            path: "",
            element: <SingleRentBook />,
          },
        ],
      },

      {
        path: "/view_rent_cart",
        element: <ProtectedRoute />,
        children: [
          {
            path: "",
            element: <RentCart />,
          },
        ],
      },
      {
        path: "/view_rent_wishlist",
        element: <ProtectedRoute />,
        children: [
          {
            path: "",
            element: <RentWishlist />,
          },
        ],
      },
      {
        path: "/category/:categoryLabel",
        element: <ProtectedRoute />,
        children: [
          {
            path: "",
            element: <CategoryPage />,
          },
        ],
      },
      {
        path: "/edit-book-sell/:id",
        element: <ProtectedRoute />,
        children: [
          {
            path: "",
            element: <EditBookListing />,
          },
        ],
      },
      {
        path: "/edit-book-rent/:id",
        element: <ProtectedRoute />,
        children: [
          {
            path: "",
            element: <EditRentListing />,
          },
        ],
      },
    ],
  },
]);
export default router;
