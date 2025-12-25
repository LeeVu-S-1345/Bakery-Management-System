// Mock API service - intercepts API calls and returns mock data
import { mockProducts, mockEmployees, mockOrders, mockUsers, useMockData } from "../data/mockData.js";

// Simulate network delay
const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

export const mockApi = {
  // Check if we should use mock data
  shouldUseMock() {
    return useMockData();
  },

  // Mock login
  async login(email, password, role = "customer") {
    await delay(300);
    const userKey = role === "employee" ? "employee" : role === "manager" ? "manager" : "customer";
    const user = mockUsers[userKey];
    
    if (user && user.email === email && user.password === password) {
      return {
        user: { ...user },
        token: "mock_token_" + Date.now()
      };
    }
    throw { response: { data: { error: "Invalid email or password" } } };
  },

  // Mock get products
  async getProducts() {
    await delay(300);
    return mockProducts.map(item => ({
      id: item.id,
      name: item.name,
      category: item.category,
      price: item.price,
      stock: item.stock,
      description: item.description
    }));
  },

  // Mock get employees
  async getEmployees() {
    await delay(300);
    return mockEmployees;
  },

  // Mock get orders by date
  async getOrdersByDate(date) {
    await delay(300);
    // Filter orders by date (simplified - return all mock orders)
    return mockOrders.map(order => ({
      id: order.id,
      fullname: order.fullname,
      phone: order.phone,
      receive_phone: order.receive_phone,
      ordertime: order.ordertime,
      total_amount: order.total_amount,
      status: order.status,
      receive_date: order.receive_date,
      receive_time: order.receive_time,
      receive_address: order.receive_address,
      receiver: order.receiver
    }));
  },

  // Mock get order detail
  async getOrderDetail(orderId) {
    await delay(300);
    const order = mockOrders.find(o => o.id === orderId);
    if (!order) {
      throw { response: { data: { error: "Order not found" } } };
    }
    // Return order items in format expected by employee order detail
    return order.items.map((item, index) => ({
      prod_id: item.id,
      quantity: item.qty,
      price: item.price
    }));
  },

  // Mock get order history
  async getOrderHistory(userId) {
    await delay(300);
    return mockOrders.filter(o => o.cus_id === userId);
  },

  // Mock get order tracking
  async getOrderTracking(orderId) {
    await delay(300);
    const order = mockOrders.find(o => o.id === orderId);
    if (!order) {
      throw { response: { status: 404, data: { error: "Order not found" } } };
    }
    return order;
  },

  // Mock get stock
  async getStock() {
    await delay(300);
    return mockProducts.map(item => ({
      id: item.id,
      name: item.name,
      category: item.category,
      price: item.price,
      stock: item.stock
    }));
  },

  // Mock get user profile
  async getUserProfile(userId) {
    await delay(300);
    const user = Object.values(mockUsers).find(u => u.id === userId);
    if (!user) {
      throw { response: { data: { error: "User not found" } } };
    }
    return {
      id: user.id,
      fullname: user.fullname,
      email: user.email,
      phone: user.phone || "",
      address: user.address || ""
    };
  },

  // Mock place order
  async placeOrder(orderData) {
    await delay(500);
    const newOrder = {
      ...orderData,
      id: `ORD${String(mockOrders.length + 1).padStart(6, '0')}`,
      status: "Processing"
    };
    mockOrders.unshift(newOrder);
    return newOrder;
  },

  // Mock signup
  async signup(userData) {
    await delay(400);
    // Check if email already exists
    const existingUser = Object.values(mockUsers).find(u => u.email === userData.email);
    if (existingUser) {
      throw { response: { data: { error: "Email already exists" } } };
    }
    return { message: "Signup successful" };
  }
};

