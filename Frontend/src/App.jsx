// src/App.jsx
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/customer/HomePage.jsx";
import AllMenu from "./pages/customer/AllMenu.jsx";
import SignIn from "./pages/customer/Login/SignIn.jsx";
import SignUp from "./pages/customer/Signup/SignUp.jsx";
import Cart from "./pages/customer/Cart.jsx";
import Checkout from "./pages/customer/Checkout.jsx";
import Account from "./pages/customer/Account/Account.jsx";
//import cho employee
import EmployeeDashboard from "./pages/employee/EmployeeDashboard";
import ManagementLayout from "./pages/employee/ManagementLayout.jsx"
import OrderManagement from "./pages/employee/OrderManagement.jsx";
import StockManagement from "./pages/employee/StockManagement.jsx";

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/menu", element: <AllMenu /> },              // All
  { path: "/menu/:slug", element: <AllMenu /> },        // By category
  { path: "/signin", element: <SignIn /> },            // Sign In
  { path: "/signup", element: <SignUp /> },            // Sign Up
  { path: "/cart", element: <Cart /> },                // Cart
  { path: "/checkout", element: <Checkout /> },
  { path: "/account", element: <Account /> },           // Account
  { path: "/employee", element: <EmployeeDashboard />}, // Bố cục chung có Sidebar
  { path: "/employee/management",
    element: <ManagementLayout />, // Bố cục chung có Sidebar
    children: [
      {
        path: "orders", // Đường dẫn: /employee/orders
        element: <OrderManagement />,
      },
      /*{
        path: "orders/:orderId", // Đường dẫn động, ví dụ: /employee/orders/12345
        element: <OrderDetail />,
      },*/
      {
        path: "stock", // Đường dẫn: /employee/stock
        element: <StockManagement />,
      },
    ],
  },
]);

export default function App() { return <RouterProvider router={router} />; }
