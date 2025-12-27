import { useState } from "react";
import { Link } from "react-router-dom";
import { Drawer } from "antd";
import { MenuOutlined, UserOutlined } from "@ant-design/icons";
import { BiCake, BiClipboard, BiGridAlt, BiUser } from "react-icons/bi";
import "../../pages/employee/ManagementLayout.css";

const Header = () => {
  const [visible, setVisible] = useState(false);
  const user = JSON.parse(localStorage.getItem("auth:user:v1")) || {};

  return (
    <>
      {/* HEADER BAR */}
      <div className="header">
        <MenuOutlined className="menu-icon" onClick={() => setVisible(true)} />
        <div style={{ fontWeight: "bold", fontSize: "18px" }}>
          Sweet Bakery
        </div>
      </div>

      {/* SIDEBAR */}
      <Drawer
        title={null}
        closable={false}
        placement="left"
        open={visible}
        onClose={() => setVisible(false)}
        rootClassName="custom-drawer"
        width={300}
        maskStyle={{ backgroundColor: "rgba(0,0,0,0.1)" }}
      >
        <div className="sidebar-menu">
          <Link to="/employee" className="sidebar-item" onClick={() => setVisible(false)}>
            <BiGridAlt className="sidebar-icon" />
            Dashboard
          </Link>

          <Link to="/employee/management/orders" className="sidebar-item" onClick={() => setVisible(false)}>
            <BiCake className="sidebar-icon" />
            Order Management
          </Link>

          <Link to="/employee/management/stock" className="sidebar-item" onClick={() => setVisible(false)}>
            <BiClipboard className="sidebar-icon" />
            Stock Management
          </Link>

          <Link to="/employee/profile" className="sidebar-item" onClick={() => setVisible(false)}>
            <BiUser className="sidebar-icon" />
            Profile
          </Link>
        </div>
      </Drawer>

      <div style={{ flex: 1, padding: '0 40px' }}>
        <div className="user-info-card">
          <div className="user-avatar"><UserOutlined /></div>
          <div>
            <div style={{ fontWeight: 'bold', fontSize: '14px' }}>{user.name} - Employee</div>
            <div style={{ fontSize: '12px', color: '#888' }}>Mail: {user.email}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
