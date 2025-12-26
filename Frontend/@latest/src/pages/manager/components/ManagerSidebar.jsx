import React from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { FileText, Users, Cake, X, LogOut } from "lucide-react";

const ManagerSidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Theme màu đỏ chuẩn
  const theme = {
    bg: "bg-[#d32f2f]", 
    text: "text-white",
    hover: "hover:bg-white/10",
    active: "bg-white/20 font-bold shadow-inner",
    logoutBtn: "bg-white text-[#d32f2f] hover:bg-gray-100 shadow-md",
    closeBtn: "text-white hover:bg-white/20 rounded-full p-1",
  };

  const menuItems = [
    { id: 'revenue', icon: FileText, label: "Revenue Report", path: "/manager/revenue" },
    { id: 'employee', icon: Users, label: "Human Resource\nManagement", path: "/manager/employees" },
    { id: 'product-list', icon: Cake, label: "Products Details", path: "/manager/products" },
  ];

  const handleNavigation = (path) => {
    navigate(path);
    if (onClose) onClose(); // Luôn đóng sidebar sau khi chọn menu
  };

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <>
      {/* 1. OVERLAY (Lớp phủ đen mờ) */}
      {/* Luôn hoạt động trên mọi màn hình khi isOpen = true */}
      <div
        className={`fixed inset-0 bg-black/50 z-[60] transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={onClose}
      />

      {/* 2. SIDEBAR (Ngăn kéo trượt) */}
      <aside
        className={`
          fixed top-0 left-0 z-[70] h-screen w-72 flex flex-col 
          transition-transform duration-300 ease-in-out shadow-2xl
          ${theme.bg}
          /* Logic trượt: Dựa hoàn toàn vào isOpen, không phân biệt mobile/desktop */
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Nút đóng Sidebar (X) */}
        <div className="absolute top-4 right-4">
          <button onClick={onClose} className={theme.closeBtn}>
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Logo Area */}
        <div className="p-6 pt-12 flex justify-center">
          <div className="bg-white rounded-xl shadow-lg w-28 h-28 flex items-center justify-center p-2">
            <div className="text-center flex flex-col items-center justify-center h-full w-full">
              <span className="text-[#d32f2f] text-3xl font-bold" style={{ fontFamily: 'cursive' }}>
                Sweet
              </span>
              <span className="text-gray-600 text-xs font-extrabold tracking-widest mt-1">
                BAKERY
              </span>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.path)}
                className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-200 text-left group ${
                  theme.text
                } ${isActive ? theme.active : theme.hover}`}
              >
                <item.icon className={`w-5 h-5 transition-transform group-hover:scale-110 ${isActive ? 'stroke-[3px]' : ''}`} />
                <span className={`text-base font-medium whitespace-pre-line leading-tight ${isActive ? 'font-bold' : ''}`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </nav>

        {/* Logout Button */}
        <div className="p-4 pb-8 mt-auto">
          <button
            onClick={handleLogout}
            className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-full font-bold transition-transform active:scale-95 ${theme.logoutBtn}`}
          >
            <LogOut className="w-5 h-5" />
            Log out
          </button>
        </div>
      </aside>
    </>
  );
};

export default ManagerSidebar;