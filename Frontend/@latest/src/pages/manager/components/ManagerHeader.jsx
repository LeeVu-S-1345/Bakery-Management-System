import React from 'react';
import { Menu, User } from "lucide-react";

const ManagerHeader = ({
  onMenuClick,
  userName = "Ngo Minh Ngoc",
  userEmail = "ngoc.nm235984@sis.hust.edu.vn",
  userRole = "Owner",
}) => {
  return (
    // Header trải dài full chiều rộng
    <header className="bg-[#d32f2f] h-16 flex items-center justify-between px-4 lg:px-8 shadow-md sticky top-0 z-40">
      
      {/* Khu vực bên trái: Nút Menu + Logo nhỏ */}
      <div className="flex items-center gap-4">
        {/* Nút 3 gạch - Luôn hiện */}
        <button
          onClick={onMenuClick}
          className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors active:scale-95"
        >
          <Menu className="w-7 h-7" />
        </button>

        {/* Logo nhỏ */}
        <div className="bg-white rounded-lg w-10 h-10 flex items-center justify-center shadow-sm">
          <span className="text-[#d32f2f] text-sm font-bold" style={{ fontFamily: 'cursive' }}>SB</span>
        </div>
      </div>

      {/* Khu vực bên phải: Thông tin User */}
      <div className="bg-white rounded-full pl-1.5 pr-4 py-1.5 flex items-center gap-3 shadow-sm border border-red-100 max-w-[250px]">
        <div className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center bg-gray-50 text-gray-500 shrink-0">
          <User className="w-4 h-4" />
        </div>
        <div className="hidden sm:block text-sm overflow-hidden">
          <div className="font-bold text-gray-800 leading-none mb-0.5 truncate">
            {userName}
          </div>
          <div className="text-[10px] text-gray-500 leading-none truncate">
            {userEmail}
          </div>
        </div>
      </div>
    </header>
  );
};

export default ManagerHeader;