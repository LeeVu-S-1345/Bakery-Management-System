import EmployeeDashboard from "../../pages/employee/EmployeeDashboard";
import ManagementLayout from "../../pages/employee/ManagementLayout.jsx";
import OrderManagement from "../../pages/employee/OrderManagement.jsx";
import StockManagement from "../../pages/employee/StockManagement.jsx";
import SigninPages from "../../pages/employee/Login/SignIn.jsx";
import EmployeeRoute from "./EmployeeRoute.jsx";

export const employeeRoutes = [
    {
        path: "/employee",
        element: (
        <EmployeeRoute>
            <EmployeeDashboard />
        </EmployeeRoute>
        ),
    },
    {
        path: "/employee/signin",
        element: (
        <SigninPages />
        ),
    },
    {
        path: "/employee/management",
        element: (
        <EmployeeRoute>
            <ManagementLayout />
        </EmployeeRoute>
        ),
        children: [
        { path: "orders", element: <OrderManagement /> },
        { path: "stock", element: <StockManagement /> },
        ],
    },
];