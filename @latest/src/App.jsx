// src/App.jsx
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import AllMenu from "./pages/AllMenu.jsx";
import SearchResults from "./pages/SearchResults.jsx";
import SignInPages from "./pages/SignInPages.jsx";
import SignUpPages from "./pages/SignUpPages.jsx";
import Cart from "./pages/Cart.jsx";
import Checkout from "./pages/Checkout.jsx";
import Account from "./pages/Account.jsx";
import HistoryPage from "./pages/History.jsx";
import OrderSuccess from "./pages/OrderSuccess.jsx";
import OrderTracking from "./pages/OrderTracking.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import FaqPage from "./pages/FaqPage.jsx";

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/menu", element: <AllMenu /> },              // All
  { path: "/menu/:slug", element: <AllMenu /> },        // By category
  { path: "/search", element: <SearchResults /> },
  { path: "/signin", element: <SignInPages /> },            // Sign In
  { path: "/signup", element: <SignUpPages /> },            // Sign Up
  { path: "/cart", element: <Cart /> },                // Cart
  { path: "/checkout", element: <Checkout /> },
  { path: "/account", element: <Account /> },           // Account
  { path: "/orders", element: <HistoryPage /> },
  { path: "/order-success/:orderId", element: <OrderSuccess /> },
  { path: "/track/:orderId", element: <OrderTracking /> },
  { path: "/about", element: <AboutPage /> },
  { path: "/contact", element: <ContactPage /> },
  { path: "/faq", element: <FaqPage /> }
]);

export default function App() { return <RouterProvider router={router} />; }
