import EmployeeDashboard from "../../pages/employee/EmployeeDashboard/EmployeeDashboard.jsx";
import ManagementLayout from "../../pages/employee/ManagementLayout.jsx";
import OrderManagement from "../../pages/employee/OrderManagement/OrderManagement.jsx";
import StockManagement from "../../pages/employee/StockManagement/StockManagement.jsx";
import Profile from "../../pages/employee/Profile/Profile.jsx";
import SigninPages from "../../pages/employee/Login/SignIn.jsx";
import EmployeeRoute from "./EmployeeRoute.jsx";
import PublicLayout from "../../layouts/PublicLayout.jsx";

export const employeeRoutes = [
    {
        path: "/employee",
        element: (
        <PublicLayout>
            <EmployeeRoute>
                <EmployeeDashboard />
            </EmployeeRoute>
        </PublicLayout>
        ),
    },
    {
        path: "/employee/signin",
        element: (
        <PublicLayout>
            <SigninPages/>
        </PublicLayout>
        ),
    },
    {
        path: "/employee/management",
        element: (
        <PublicLayout>
            <EmployeeRoute>
                <ManagementLayout />
            </EmployeeRoute>
        </PublicLayout>
        ),
        children: [
        { path: "orders", element: <OrderManagement /> },
        { path: "stock", element: <StockManagement /> },
        ],
    },
    {
        path: "/employee/profile",
        element: (
        <PublicLayout>
            <Profile/>
        </PublicLayout>
        ),
    },
];