import "./Account.css";
import { useAuth } from "../../../context/AuthContext";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  BiUserCircle,
  BiLockAlt,
  BiSave,
} from "react-icons/bi";

import Header from "../../../components/employee/Header";
import Footer from "../../../components/employee/Footer";
import api from "../../../lib/axiosEmployee";
import { message } from "antd";

export default function Account() {
  const { user, setUser } = useAuth();
  const nav = useNavigate();

  const [form, setForm] = useState({
    fullname: user?.fullname || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "",
    dob: user?.dob ? user.dob : "",
    hire_date: user?.hire_date ? user.hire_date.split("T")[0] : "",
    avatar: user?.avatar || "",
    department: user?.department || "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchProfile() {
      try {
        // const token = localStorage.getItem("token");
        const res = await api.get(`/employee/auth/profile/${user.id}`);

        // cập nhật form bằng dữ liệu từ DB
        setForm({
          fullname: res.data.fullname,
          email: res.data.email,
          phone: res.data.phone || "",
          address: res.data.address || "",
          dob: res.data.dob || "",
          hire_date: res.data.hire_date || "",
          avatar: res.data.avatar || "",
          department: res.data.department || "",
        });

      } catch (error) {
        console.error("Failed to load user:", error);
      }
    }

    if (user) {
      fetchProfile();
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const payload = {
        fullname: form.fullname,
        email: form.email,
        phone: form.phone,
        address: form.address,
        dob: form.dob,
      };
      const res = await api.put(`/employee/auth/profile/${user.id}`, payload);
      // update auth context
      setForm(res.data);
      setUser({
        fullname: form.fullname,
        name: form.fullname.split(" ")[0],
        email: form.email,
      })
      message.success("Profile updated successfully");
    } catch (err) {
      message.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const fileInputRef = useRef(null);

    const handleAvatarChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("avatar", file);

        try {
            const res = await api.put(
            `/employee/profile/avatar/${user.id}`,
            formData,
            {
                headers: { "Content-Type": "multipart/form-data" },
            }
            );

            message.success("Avatar updated");
            setUser(res.data);
        } catch (err) {
            message.error("Upload failed");
        }
    };

  return (
    <>
      <Header />

      <main className="emp-profile">
        <h1 className="emp-profile__title">Employee Profile</h1>

        <div className="emp-profile__card">
            <div className="emp-profile__header">
                {/* AVATAR */}
                <div className="emp-profile__avatar">
                    {user.avatar ? (
                    <img
                        src={`${import.meta.env.VITE_BACKEND_URL}/uploads/${user.avatar}`}
                        alt="avatar"
                    />
                    ) : (
                    <BiUserCircle />
                    )}

                    <button
                    type="button"
                    className="emp-profile__avatarBtn"
                    onClick={() => fileInputRef.current.click()}
                    >
                    Change avatar
                    </button>

                    <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    hidden
                    onChange={handleAvatarChange}
                    />
                </div>

                {/* USER INFO */}
                <div className="emp-profile__basic">
                    <h2>{form.fullname}</h2>
                    <p className="emp-profile__role">Employee</p>
                    <p className="emp-profile__status active">Status: Active</p>
                </div>
            </div>


          {/* EDITABLE INFO */}
          <div className="emp-profile__form">
            <label>
              <span>Full name</span>
              <input name="fullname" value={form.fullname} onChange={handleChange} />
            </label>

            <label>
              <span>Email</span>
              <input name="email" value={form.email} onChange={handleChange} />
            </label>

            <label>
              <span>Phone</span>
              <input name="phone" value={form.phone} onChange={handleChange} />
            </label>

            <label>
              <span>Address</span>
              <input name="address" value={form.address} onChange={handleChange} />
            </label>

            <label>
              <span>Date of birth</span>
              <input type="date" name="dob" value={new Date(form.dob).toLocaleDateString("en-CA")} onChange={handleChange} />
            </label>

            <label>
              <span>Department</span>
              <input
                value={form.department}
                disabled
                className="emp-profile__input--readonly"
              />
            </label>

            <label>
              <span>Hire date</span>
              <input
                type="date"
                value={new Date(form.hire_date).toLocaleDateString("en-CA")}
                disabled
                className="emp-profile__input--readonly"
              />
            </label>
          </div>

          {/* ACTIONS */}
          <div className="emp-profile__actions">
            <button className="emp-profile__btn" onClick={handleSave} disabled={loading}>
              <BiSave />
              {loading ? "Saving..." : "Save changes"}
            </button>

            <button
              className="emp-profile__btn emp-profile__btn--secondary"
              onClick={() => nav("/employee/change-password")}
            >
              <BiLockAlt />
              Change Password
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
