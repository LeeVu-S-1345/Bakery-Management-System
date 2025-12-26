import { Toaster } from "@/components/ui/toaster.jsx";
import { Toaster as Sonner } from "@/components/ui/sonner.jsx";
import { TooltipProvider } from "@/components/ui/tooltip.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom"; // 1. Bỏ import BrowserRouter
import Index from "./pages/Index.jsx";
import NotFound from "./pages/NotFound.jsx";
import ManagerDashboard from "./pages/manager/ManagerDashboard.jsx";
import EmployeeManagement from "./pages/manager/EmployeeManagement.jsx";
import ProductManagement from "./pages/manager/ProductManagement.jsx";
import RevenueReport from "./pages/manager/RevenueReport.jsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      {/* 2. Đã xóa thẻ <BrowserRouter> bao quanh, chỉ giữ lại Routes */}
      <Routes>
        <Route path="/" element={<Index />} />
        {/* Manager Routes */}
        <Route path="/manager/dashboard" element={<ManagerDashboard />} />
        <Route path="/manager/employees" element={<EmployeeManagement />} />
        <Route path="/manager/products" element={<ProductManagement />} />
        <Route path="/manager/revenue" element={<RevenueReport />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;