// Mock data cho Frontend - có thể chạy độc lập không cần Backend

export const mockProducts = [
  {
    id: 1,
    name: "Tiramisu",
    category: "Mousse",
    price: 250000,
    stock: 50,
    description: "Classic Italian dessert with coffee and mascarpone",
    image: "/images/menu/mousse/mousse_1.png"
  },
  {
    id: 2,
    name: "Chocolate Mousse Cake",
    category: "Mousse",
    price: 280000,
    stock: 45,
    description: "Rich chocolate mousse layered cake",
    image: "/images/menu/mousse/mousse_2.png"
  },
  {
    id: 3,
    name: "Strawberry Mousse",
    category: "Mousse",
    price: 240000,
    stock: 40,
    description: "Fresh strawberry mousse cake",
    image: "/images/menu/mousse/mousse_3.png"
  },
  {
    id: 4,
    name: "Vanilla Mousse",
    category: "Mousse",
    price: 230000,
    stock: 35,
    description: "Smooth vanilla mousse cake",
    image: "/images/menu/mousse/mousse_4.png"
  },
  {
    id: 5,
    name: "Birthday Cake Classic",
    category: "Birthday Cake",
    price: 350000,
    stock: 30,
    description: "Traditional birthday cake with cream frosting",
    image: "/images/menu/birthday-cake/birthday-cake_1.png"
  },
  {
    id: 6,
    name: "Rainbow Birthday Cake",
    category: "Birthday Cake",
    price: 380000,
    stock: 25,
    description: "Colorful rainbow layered birthday cake",
    image: "/images/menu/birthday-cake/birthday-cake_2.png"
  },
  {
    id: 7,
    name: "Chocolate Birthday Cake",
    category: "Birthday Cake",
    price: 360000,
    stock: 28,
    description: "Rich chocolate birthday cake",
    image: "/images/menu/birthday-cake/birthday-cake_3.png"
  },
  {
    id: 8,
    name: "Princess Birthday Cake",
    category: "Birthday Cake",
    price: 400000,
    stock: 20,
    description: "Elegant princess-themed birthday cake",
    image: "/images/menu/birthday-cake/birthday-cake_4.png"
  },
  {
    id: 9,
    name: "Cream Choux",
    category: "Cream Choux",
    price: 120000,
    stock: 60,
    description: "Light and airy cream-filled choux pastry",
    image: "/images/menu/cream-choux/cream-choux_1.png"
  },
  {
    id: 10,
    name: "Chocolate Choux",
    category: "Cream Choux",
    price: 130000,
    stock: 55,
    description: "Chocolate cream-filled choux",
    image: "/images/menu/cream-choux/cream-choux_2.png"
  },
  {
    id: 11,
    name: "Strawberry Choux",
    category: "Cream Choux",
    price: 125000,
    stock: 50,
    description: "Fresh strawberry cream choux",
    image: "/images/menu/cream-choux/cream-choux_3.png"
  },
  {
    id: 12,
    name: "Vanilla Choux",
    category: "Cream Choux",
    price: 120000,
    stock: 58,
    description: "Classic vanilla cream choux",
    image: "/images/menu/cream-choux/cream-choux_4.png"
  },
  {
    id: 13,
    name: "Red Velvet Cupcake",
    category: "Cup Cake",
    price: 45000,
    stock: 100,
    description: "Classic red velvet cupcake with cream cheese frosting",
    image: "/images/menu/cup-cake/cup-cake_1.png"
  },
  {
    id: 14,
    name: "Chocolate Cupcake",
    category: "Cup Cake",
    price: 40000,
    stock: 95,
    description: "Rich chocolate cupcake",
    image: "/images/menu/cup-cake/cup-cake_2.png"
  },
  {
    id: 15,
    name: "Vanilla Cupcake",
    category: "Cup Cake",
    price: 38000,
    stock: 90,
    description: "Classic vanilla cupcake",
    image: "/images/menu/cup-cake/cup-cake_3.png"
  },
  {
    id: 16,
    name: "Strawberry Cupcake",
    category: "Cup Cake",
    price: 42000,
    stock: 88,
    description: "Fresh strawberry cupcake",
    image: "/images/menu/cup-cake/cup-cake_4.png"
  },
  {
    id: 17,
    name: "Classic Tin Box Cake",
    category: "Tin Box Cake",
    price: 200000,
    stock: 40,
    description: "Traditional tin box cake",
    image: "/images/menu/tin-box-cake/tin-box-cake_1.png"
  },
  {
    id: 18,
    name: "Chocolate Tin Box Cake",
    category: "Tin Box Cake",
    price: 220000,
    stock: 38,
    description: "Rich chocolate tin box cake",
    image: "/images/menu/tin-box-cake/tin-box-cake_2.png"
  },
  {
    id: 19,
    name: "Vanilla Tin Box Cake",
    category: "Tin Box Cake",
    price: 190000,
    stock: 42,
    description: "Smooth vanilla tin box cake",
    image: "/images/menu/tin-box-cake/tin-box-cake_3.png"
  },
  {
    id: 20,
    name: "Strawberry Tin Box Cake",
    category: "Tin Box Cake",
    price: 210000,
    stock: 35,
    description: "Fresh strawberry tin box cake",
    image: "/images/menu/tin-box-cake/tin-box-cake_4.png"
  }
];

// Menu data grouped by category
export const mockMenuData = [
  {
    category: "Mousse",
    slug: "mousse",
    items: mockProducts.filter(p => p.category === "Mousse")
  },
  {
    category: "Birthday Cake",
    slug: "birthday-cake",
    items: mockProducts.filter(p => p.category === "Birthday Cake")
  },
  {
    category: "Cream Choux",
    slug: "cream-choux",
    items: mockProducts.filter(p => p.category === "Cream Choux")
  },
  {
    category: "Cup Cake",
    slug: "cup-cake",
    items: mockProducts.filter(p => p.category === "Cup Cake")
  },
  {
    category: "Tin Box Cake",
    slug: "tin-box-cake",
    items: mockProducts.filter(p => p.category === "Tin Box Cake")
  }
];

// Mock employees
export const mockEmployees = [
  {
    id: 1,
    fullname: "Nguyễn Văn An",
    email: "nguyenvanan@bakery.com",
    phone: "0912345678",
    status: "Active",
    hire_date: "2023-01-15"
  },
  {
    id: 2,
    fullname: "Trần Thị Bình",
    email: "tranthibinh@bakery.com",
    phone: "0923456789",
    status: "Active",
    hire_date: "2023-03-20"
  },
  {
    id: 3,
    fullname: "Lê Văn Cường",
    email: "levancuong@bakery.com",
    phone: "0934567890",
    status: "Active",
    hire_date: "2023-05-10"
  },
  {
    id: 4,
    fullname: "Phạm Thị Dung",
    email: "phamthidung@bakery.com",
    phone: "0945678901",
    status: "On Leave",
    hire_date: "2022-11-05"
  },
  {
    id: 5,
    fullname: "Hoàng Văn Em",
    email: "hoangvanem@bakery.com",
    phone: "0956789012",
    status: "Active",
    hire_date: "2024-01-08"
  }
];

// Mock orders
const generateMockOrder = (id, customerId, dateOffset = 0) => {
  const orderDate = new Date();
  orderDate.setDate(orderDate.getDate() - dateOffset);
  
  const items = [
    { id: 1, name: "Tiramisu", qty: 2, price: 250000 },
    { id: 9, name: "Cream Choux", qty: 3, price: 120000 }
  ];
  
  const total = items.reduce((sum, item) => sum + (item.price * item.qty), 0);
  
  return {
    id: `ORD${String(id).padStart(6, '0')}`,
    cus_id: customerId,
    orderdate: orderDate.toISOString(),
    ordertime: orderDate.toISOString(),
    status: dateOffset === 0 ? "Processing" : dateOffset < 3 ? "Delivered" : "Completed",
    total_amount: total,
    receive_date: new Date(orderDate.getTime() + 86400000).toISOString().split('T')[0],
    receive_time: "Morning (7AM-11AM)",
    receive_address: "123 Đường ABC, Phường XYZ, Quận 1, Ho Chi Minh City",
    receiver: "Nguyễn Văn A",
    receive_phone: "0912345678",
    fullname: "Nguyễn Văn A",
    phone: "0912345678",
    items: items.map(item => ({
      ...item,
      name: mockProducts.find(p => p.id === item.id)?.name || item.name
    })),
    timeline: [
      {
        label: "Order placed",
        time: orderDate.toISOString(),
        note: "Pending"
      },
      {
        label: "Preparing",
        time: dateOffset < 1 ? null : new Date(orderDate.getTime() + 3600000).toISOString(),
        note: "Preparing"
      },
      {
        label: "On delivery",
        time: dateOffset < 2 ? null : new Date(orderDate.getTime() + 7200000).toISOString(),
        note: "Deliveried by shipper"
      }
    ]
  };
};

export const mockOrders = [
  generateMockOrder(1, 1, 0),
  generateMockOrder(2, 1, 1),
  generateMockOrder(3, 1, 2),
  generateMockOrder(4, 1, 5),
  generateMockOrder(5, 1, 10)
];

// Mock users for login
export const mockUsers = {
  customer: {
    id: 1,
    email: "customer@test.com",
    password: "123456",
    fullname: "Nguyễn Văn A",
    name: "Nguyễn",
    phone: "0912345678",
    address: "123 Đường ABC, Quận 1, HCM",
    role: 1
  },
  employee: {
    id: 2,
    email: "employee@test.com",
    password: "123456",
    fullname: "Trần Thị Bình",
    name: "Bình",
    phone: "0923456789",
    role: 2
  },
  manager: {
    id: 3,
    email: "manager@test.com",
    password: "123456",
    fullname: "Lê Văn Cường",
    name: "Cường",
    phone: "0934567890",
    role: 3
  }
};

// Helper function to check if we should use mock data
export const useMockData = () => {
  const API_URL = import.meta.env.VITE_BACKEND_URL;
  return !API_URL || API_URL === "" || import.meta.env.VITE_USE_MOCK === "true";
};

