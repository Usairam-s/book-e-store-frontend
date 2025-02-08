import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import Cart from "../pages/cart/Cart";
import SingleBook from "../pages/books/SingleBook";
import Success from "../pages/success/Success";
import ErrorPayment from "../pages/error-payment/ErrorPayment";
import AdminDashboard from "../pages/admin-dashboard/AdminDashboard";
import AdminBooks from "../pages/admin-books/AdminBooks";
import AdminLayout from "../pages/admin-dashboard/AdminLayout";
import AddBook from "../pages/add-book/AddBook";

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
        path: "/about",
        element: <h1>About Page</h1>,
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
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/books/:id",
        element: <SingleBook />,
      },
      {
        path: "/success",
        element: <Success />,
      },
      {
        path: "/error-payment",
        element: <ErrorPayment />,
      },
      {
        path: "/admin",
        element: <AdminLayout />, // AdminLayout wraps all admin pages
        children: [
          { path: "dashboard", element: <AdminDashboard /> }, // /admin/dashboard

          { path: "books", element: <AdminBooks /> }, // /admin/books
          { path: "add-book", element: <AddBook /> }, // /admin/books
        ],
      },
    ],
  },
]);

export default router;
