// src/pages/OrderManagement.jsx
import { useEffect, useState } from "react";
import { Table, Tag, Calendar, theme, message, Select } from "antd";
import axios from "axios";
import api from "../../../lib/axios";
import dayjs from "dayjs";
import OrderDetail from "../../../components/employee/OrderDetail/OrderDetail";
import "./OrderManagement.css";
const API_URL = import.meta.env.VITE_BACKEND_URL;

const STATUS_OPTIONS = [
  { value: 'pending', label: 'PENDING', color: 'orange' },
  { value: 'confirmed', label: 'CONFIRMED', color: 'blue' },
  { value: 'delivering', label: 'DELIVERING', color: 'cyan' },
  { value: 'completed', label: 'COMPLETED', color: 'green' },
  { value: 'cancelled', label: 'CANCELLED', color: 'red' },
];

const OrderManagement = () => {
  const { token } = theme.useToken();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [selectedOrderDetail, setSelectedOrderDetail] = useState(null);

  // --- DỮ LIỆU GIẢ (MOCK DATA) ---
  const MOCK_ORDERS = [
    {
      id: 12345, // ID giống trong hình mẫu
      fullname: "Nguyen Van A",
      phone: "0912345678",
      receive_phone: "0912345678",
      ordertime: "14:30:00",
      total_amount: 1000000,
      status: "confirmed",
      receive_date: "2025-10-12",
      receive_time: "5pm - 5h30pm",
      receive_address: "In-store / Home Address",
      receiver: "Nguyen Van A",
      note: "Keep the cake fresh, no need candles"
    },
    {
      id: 12346,
      fullname: "Tran Thi B",
      phone: "0987654321",
      receive_phone: "0987654321",
      ordertime: "09:15:00",
      total_amount: 450000,
      status: "pending",
      receive_date: "2025-10-12",
      receive_time: "10am - 11am",
      receive_address: "123 Le Thanh Nghi",
      receiver: "Tran Thi B",
      note: ""
    },
    {
      id: 12347,
      fullname: "Le Van C",
      phone: "0909090909",
      receive_phone: "0909090909",
      ordertime: "16:45:00",
      total_amount: 250000,
      status: "completed",
      receive_date: "2025-10-12",
      receive_time: "4pm - 5pm",
      receive_address: "In-store",
      receiver: "Le Van C",
      note: "Happy Birthday text"
    }
  ];

  // Dữ liệu chi tiết sản phẩm giả (Giống hệt hình ảnh bạn gửi)
  const MOCK_ORDER_DETAIL_PRODUCTS = [
    { product_id: 'E634KT', count: 1, price: 299000 },
    { product_id: '80F520', count: 2, price: 360000 },
    { product_id: 'SW788M', count: 1, price: 120000 },
    { product_id: 'PP9L05C', count: 1, price: 59000 },
    { product_id: 'NZ60D72', count: 3, price: 599000 },
  ];
  // ------------------------------

  const handleStatusChange = (orderId, newStatus) => {
    // 1. Cập nhật danh sách đơn hàng chính (Table)
    const updatedOrders = orders.map((ord) =>
      ord.id === orderId ? { ...ord, status: newStatus } : ord
    );
    setOrders(updatedOrders);

    // 2. Nếu Modal đang mở đúng đơn hàng đó, cập nhật luôn state của Modal
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }

    message.success(`Order #${orderId} status changed to ${newStatus.toUpperCase()}`);
  }; 

  const columns = [
    { title: "Order ID", dataIndex: "id", key: "id" },
    { title: "Customer", dataIndex: "customer", key: "customer" },
    { title: "Phone", dataIndex: "phone", key: "phone" },
    { title: "Order Time", dataIndex: "time", key: "time" },
    { title: "Total", dataIndex: "total", key: "total" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status, record) => (
        // Bọc div và stopPropagation để khi bấm dropdown không bị mở Modal chi tiết
        <div onClick={(e) => e.stopPropagation()}>
          <Select
            defaultValue={status}
            value={status} // Buộc Select hiển thị giá trị mới nhất từ state
            style={{ width: 140 }}
            onChange={(newVal) => handleStatusChange(record.id, newVal)}
            bordered={false} // Bỏ viền cho giống thiết kế "Tag" hơn
          >
            {STATUS_OPTIONS.map((opt) => (
              <Select.Option key={opt.value} value={opt.value}>
                <Tag color={opt.color} style={{ marginRight: 0 }}>
                  {opt.label}
                </Tag>
              </Select.Option>
            ))}
          </Select>
        </div>
      ),
    },
  ];

  // Fetch orders from backend
  useEffect(() => {
    const fetchOrders = async (date) => {
      try {
        setLoading(true);
        /*const res = await api.post(`/employee/order`, {
          date: date.format("YYYY-MM-DD"),
        });*/

        const rawData = MOCK_ORDERS;
        const formattedOrders = rawData.map((order) => ({
          id: order.id,
          customer: order.fullname,
          phone: order.phone,
          receive_phone: order.receive_phone,
          time: order.ordertime.split(".")[0],
          total: `${order.total_amount.toLocaleString()} đ`,
          status: order.status ?? "confirmed",
          receive_date: new Date(order.receive_date).toLocaleDateString(),
          receive_time: order.receive_time,
          address: order.receive_address,
          receiver: order.receiver,
          note: order.note //thêm note ở đoạn này
        }));

        setOrders(formattedOrders);
      } catch (err) {
        message.error("Failed to load orders");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders(selectedDate);
  }, [selectedDate]);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const handleRowClick = async (record) => {
    try {
      setLoading(true);

      /*const res = await api.post(
        `/employee/order/detail`,
        { orderId: record.id },
      );*/

      setSelectedOrderDetail(MOCK_ORDER_DETAIL_PRODUCTS);
      setSelectedOrder(record);
      setIsModalOpen(true);
    } catch (err) {
      message.error("Failed to load order detail");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };


  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  return (
    <div className="order-management">
      <div className="page-title-container">
        <div className="page-title">ORDER MANAGEMENT</div>
      </div>

      <div className="order-header">
        <h3 className="order-header-title">DAY'S ORDERS</h3>
        <Tag className="order-date-tag" color="#f50">
          {selectedDate.format("MM/DD/YYYY")}
        </Tag>
      </div>

      <div className="order-content">
        <div className="order-table">
          <Table
            columns={columns}
            dataSource={orders}
            loading={loading}
            rowKey="id"
            pagination={false}
            bordered
            size="middle"
            onRow={(record) => ({
              onClick: () => handleRowClick(record),
              style: { cursor: "pointer" },
            })}
          />
        </div>

        <div
          className="order-calendar"
          style={{
            border: `1px solid ${token.colorBorderSecondary}`,
            borderRadius: token.borderRadiusLG,
          }}
        >
          <div className="calendar-title">Calendar</div>
          <Calendar
            fullscreen={false}
            value={selectedDate}
            onSelect={handleDateSelect}/>
        </div>
      </div>

      <OrderDetail
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        order={selectedOrder}
        detail={selectedOrderDetail}
        onStatusChange={handleStatusChange}
      />
    </div>
  );
};

export default OrderManagement;
