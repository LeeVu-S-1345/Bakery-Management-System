// src/pages/EmployeeDashboard.jsx
import React from 'react';
import { PiUserCircleLight } from "react-icons/pi"; // Icon nét mảnh
import styles from './EmployeeDashboard.module.css';
import Sidebar from '../../components/employee/Sidebar/Sidebar';
import cakeImage from '../../assets/images/employee/dashboard/fruit-cream-bread.png'; 

const EmployeeDashboard = () => {
  return (
    <div className={styles.container}>
      {/* 1. Sidebar nằm cố định bên trái */}
      <Sidebar />

      {/* 2. Main Content nằm bên phải */}
      <div className={styles.mainContent}>
      
        {/* Phần trên: Text và Icon */}
        <div className={styles.topSection}>
          <div className={styles.greetingBox}>
            <h1 className={styles.greetingTitle}>
              Hello, <br />
              Employee!
            </h1>
            <p className={styles.subTitle}>
              Sweet Bakery is glad to see you back!
            </p>
          </div>

          <div className={styles.userIconWrapper}>
            <PiUserCircleLight />
          </div>
        </div>

        {/* Phần dưới: Ảnh minh họa */}
        <div className={styles.bottomSection}>
          {/* Bọc ảnh vào một div để áp dụng hiệu ứng mask */}
          <div className={styles.foodImageWrapper}>
            <img 
              src={cakeImage} 
              alt="Delicious Toast" 
              className={styles.foodImage} 
            />
          </div>
        </div>
      </div>
    </div>
    
  );
};

export default EmployeeDashboard;