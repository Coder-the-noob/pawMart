import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "../Layouts/HomeLayout";

import Home from "../Pages/Home";
import Services from "../Pages/Services";
import Profile from "../Pages/Profile";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import PrivateRoute from "../Provider/PrivateRoute";
import ForgotPassword from "../Pages/ForgotPassword";
import AddService from "../Pages/AddService";
import CategoryFilteredPage from "../Pages/CategoryFilteredPage";
import ProductDetailsPage from "../Pages/ProductDetailsPage";
import MyListings from "../Pages/MyListings";
import MyOrders from "../Components/MyOrders";
import Browse from "../Pages/Browse";
import FAQ from "../Pages/FAQ";
import Blog from "../Pages/Blog";
import Categories from "../Pages/Categories";
import Contact from "../Pages/Contact";
import Wishlist from "../Pages/WishList";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "services", element: <Services /> },
      { path: "profile", element: <PrivateRoute><Profile /></PrivateRoute> },

      { path: "auth/login", element: <Login /> },
      { path: "auth/register", element: <Register /> },
      { path: "auth/forgot-password", element: <ForgotPassword /> },
      { path: "/add-service", element: <PrivateRoute><AddService /></PrivateRoute> },
      {
        path: "my-listings",
        element: <PrivateRoute><MyListings /></PrivateRoute>
      },
      {
        path: "my-orders",
        element: <PrivateRoute><MyOrders /></PrivateRoute>
      },
      {
        path: "category-filtered-product/:categoryName",
        element: <PrivateRoute><CategoryFilteredPage></CategoryFilteredPage></PrivateRoute>
      },
      {
        path: "products-details/:id",
        element: <PrivateRoute><ProductDetailsPage></ProductDetailsPage></PrivateRoute>
      },
      {
        path: "browse",
        element: <Browse></Browse>
      },
      {
        path: "categories",
        element: <Categories></Categories>
      },
      {
        path: "blog",
        element: <PrivateRoute><Blog /></PrivateRoute>
      },
      {
        path: "faq",
        element: <FAQ />
      },
      {
        path: "contact",
        element: <Contact></Contact>
      },
      {
        path: "wishlist",
        element: <PrivateRoute><Wishlist /></PrivateRoute>
      }
    ],
  },

  {
    path: "/*",
    element: <h2>Error404</h2>,
  },
]);

export default router;
