// src/components/MainLayout.jsx
import React, { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Drawer } from 'antd';
import { MenuOutlined, UserOutlined } from '@ant-design/icons';
// Import icon từ react-icons (Giống hình mẫu nhất)
import { BiCake, BiClipboard, BiGridAlt, BiUser } from "react-icons/bi"; 
import Header from '../../components/employee/Header';
import Footer from '../../components/employee/Footer';

import './ManagementLayout.css';

const MainLayout = () => {
  const [visible, setVisible] = useState(false);
  const user = JSON.parse(localStorage.getItem('auth:user:v1')) || {};

  const showDrawer = () => setVisible(true);
  const onClose = () => setVisible(false);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header/>

      {/* --- MAIN CONTENT --- */}
      <div style={{ flex: 1, padding: '0 40px' }}>
        <Outlet />
      </div>

      <Footer />
    </div>
  );
};

export default MainLayout;