// src/pages/employee/Profile/Profile.jsx
import React, { useState } from 'react';
import { Input, Button, message, Upload } from 'antd';
// 1. Thêm import icon CloudUploadOutlined
import { PlusOutlined, CloudUploadOutlined, LoadingOutlined } from '@ant-design/icons';
import Header from '../../../components/employee/EmployeeHeader/EmployeeHeader.jsx';
import styles from './Profile.module.css';

const Profile = () => {
  // --- STATE ---
  const [profile, setProfile] = useState({
    // Read-only fields
    id: "EMP001",
    fullName: "Ngo Minh Ngoc",
    startDate: "12/10/2025",
    role: "Seller",
    status: "Working",
    avatar: null, 

    // Editable fields
    phone: "0912345678",
    email: "ngoc.mn@gmail.com",
    loginEmail: "staff1@bakery.com",
    password: "password123",
  });

  // State cho việc upload ảnh
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);

  // --- HÀM XỬ LÝ NHẬP LIỆU FORM ---
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // --- CÁC HÀM XỬ LÝ UPLOAD ẢNH (MỚI THÊM) ---

  // 1. Hàm getBase64: Chuyển file ảnh sang dạng chuỗi để hiển thị preview
  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  // 2. Hàm beforeUpload: Kiểm tra định dạng và kích thước ảnh
  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  };

  // 3. Hàm customRequest: Giả lập upload (Vì chưa có API thật)
  const customRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 1000); // Giả vờ đợi 1 giây
  };

  // 4. Hàm handleChange: Xử lý khi trạng thái upload thay đổi
  const handleUploadChange = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setImageUrl(url); // Lưu URL ảnh vào state để hiển thị
        
        // Cập nhật cả vào profile state nếu cần gửi xuống backend
        setProfile(prev => ({ ...prev, avatar: url })); 
      });
    }
  };

  // --- HÀM LƯU DỮ LIỆU ---
  const handleSave = () => {
    if (!profile.phone || !profile.email) {
      message.error("Please fill in all required fields!");
      return;
    }
    console.log("Saving data:", profile);
    message.success("Profile updated successfully!");
  };

  const handleCancel = () => {
    message.info("Cancelled changes");
  };

  return (
    <div>
      <Header />
      <div className={styles.container}>
        <div className={styles.pageTitle}>MY PROFILE</div>
        <div className={styles.divider}></div>

        <div className={styles.profileContent}>
          {/* --- CỘT TRÁI: AVATAR --- */}
          <div className={styles.avatarSection}>
            <Upload
              name="avatar"
              listType="picture-card"
              className={styles.avatarUploader}
              showUploadList={false}
              beforeUpload={beforeUpload}      // Đã có hàm này
              onChange={handleUploadChange}    // Đã có hàm này
              customRequest={customRequest}    // Đã có hàm này
            >
              {imageUrl ? (
                <img src={imageUrl} alt="avatar" className={styles.avatarImage} />
              ) : (
                <div className={styles.uploadPlaceholder}>
                  {loading ? <LoadingOutlined /> : <CloudUploadOutlined className={styles.uploadIcon} />}
                  <div className={styles.uploadHint}>Click to Upload</div>
                </div>
              )}
            </Upload>
          </div>

          {/* --- CỘT PHẢI: FORM THÔNG TIN --- */}
          <div className={styles.formSection}>
            
            {/* 1. PERSONAL INFORMATION */}
            <div>
              <div className={styles.headerRed}>Personal Information</div>
              <table className={styles.infoTable}>
                <tbody>
                  <tr className={styles.row}>
                    <td className={styles.labelCell}>Full name</td>
                    <td className={styles.valueCell}>
                      <Input value={profile.fullName} disabled style={{ color: '#333', cursor: 'default' }} bordered={false} />
                    </td>
                  </tr>
                  <tr className={styles.row}>
                    <td className={styles.labelCell}>Phone number</td>
                    <td className={styles.valueCell}>
                      <Input name="phone" value={profile.phone} onChange={handleInputChange} />
                    </td>
                  </tr>
                  <tr className={styles.row}>
                    <td className={styles.labelCell}>Email</td>
                    <td className={styles.valueCell}>
                      <Input name="email" value={profile.email} onChange={handleInputChange} />
                    </td>
                  </tr>
                  <tr className={styles.row}>
                    <td className={styles.labelCell}>Start date</td>
                    <td className={styles.valueCell}>
                      <Input value={profile.startDate} disabled style={{ color: '#333' }} bordered={false} />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* 2. LOG IN INFORMATION */}
            <div>
              <div className={styles.headerGreen}>Log in Information</div>
              <table className={styles.infoTable}>
                <tbody>
                  <tr className={styles.row}>
                    <td className={styles.labelCell}>Log in email</td>
                    <td className={styles.valueCell}>
                       <Input name="loginEmail" value={profile.loginEmail} onChange={handleInputChange} />
                    </td>
                  </tr>
                  <tr className={styles.row}>
                    <td className={styles.labelCell}>Password</td>
                    <td className={styles.valueCell}>
                       <Input.Password name="password" value={profile.password} onChange={handleInputChange} />
                    </td>
                  </tr>
                  <tr className={styles.row}>
                    <td className={styles.labelCell}>ID</td>
                    <td className={styles.valueCell}>
                      <Input value={profile.id} disabled style={{ color: '#333' }} bordered={false} />
                    </td>
                  </tr>
                  <tr className={styles.row}>
                    <td className={styles.labelCell}>Role</td>
                    <td className={styles.valueCell}>
                      <Input value={profile.role} disabled style={{ color: '#333' }} bordered={false} />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* 3. ADDITIONAL INFORMATION */}
            <div>
              <div className={styles.headerGray}>Additional Information</div>
              <table className={styles.infoTable}>
                <tbody>
                  <tr className={styles.row}>
                    <td className={styles.labelCell}>Status</td>
                    <td className={styles.valueCell}>
                      <Input value={profile.status} disabled style={{ color: '#333' }} bordered={false} />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

          </div>
        </div>

        <div className={styles.buttonGroup}>
          <Button className={styles.btnSave} onClick={handleSave}>Save</Button>
          <Button className={styles.btnCancel} onClick={handleCancel}>Cancel</Button>
        </div>

      </div>
    </div>
  );
};

export default Profile;