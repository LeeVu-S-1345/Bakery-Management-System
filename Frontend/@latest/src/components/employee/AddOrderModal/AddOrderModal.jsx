// src/components/employee/AddOrderModal/AddOrderModal.jsx
import React, { useState, useEffect } from 'react';
import { Modal, Row, Col, Input, Button, DatePicker, TimePicker, InputNumber, Select, message, List, Avatar } from 'antd';
import dayjs from 'dayjs';
// Tận dụng lại file CSS cũ để giống giao diện 100%
import styles from '../OrderDetail/OrderDetail.module.css'; 

const { TextArea } = Input;

// Dữ liệu giả danh sách bánh để chọn
const MOCK_PRODUCT_LIST = [
  { id: 'E634KT', name: 'Tiramisu Cake', price: 299000 },
  { id: '80F520', name: 'Cheese Cake', price: 360000 },
  { id: 'SW788M', name: 'Red Velvet', price: 120000 },
  { id: 'PP9L05C', name: 'Matcha Mousse', price: 59000 },
  { id: 'NZ60D72', name: 'Black Forest', price: 599000 },
];

const AddOrderModal = ({ open, onCancel, onSave }) => {
  // --- STATE QUẢN LÝ FORM ---
  const [customerInfo, setCustomerInfo] = useState({
    receiver: '',
    phone: '',
    address: '',
    date: dayjs(),
    time: dayjs(),
    note: '',
  });

  const [shippingCost, setShippingCost] = useState(0);
  const [cart, setCart] = useState([]); // Danh sách bánh đã chọn
  const [isProductPickerOpen, setIsProductPickerOpen] = useState(false); // Trạng thái mở modal chọn bánh

  // Reset form khi mở modal
  useEffect(() => {
    if (open) {
      setCustomerInfo({
        receiver: '',
        phone: '',
        address: '',
        date: dayjs(),
        time: dayjs(),
        note: '',
      });
      setCart([]);
      setShippingCost(0);
    }
  }, [open]);

  // --- HÀM XỬ LÝ ---
  
  // Tính tổng tiền
  const calculateTotal = () => {
    const productTotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    return productTotal + shippingCost;
  };

  // Thêm bánh vào danh sách
  const handleAddProductToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      // Nếu có rồi thì tăng số lượng
      setCart(cart.map(item => 
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      // Nếu chưa có thì thêm mới
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    message.success(`Added ${product.name}`);
  };

  // Xóa bánh khỏi danh sách
  const handleRemoveItem = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  // Thay đổi số lượng trong bảng
  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCart(cart.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  // Lưu đơn hàng
  const handleSave = () => {
    if (cart.length === 0) {
      message.error("Please add at least one product!");
      return;
    }
    if (!customerInfo.receiver || !customerInfo.phone) {
      message.error("Please fill in customer info!");
      return;
    }

    const orderData = {
      ...customerInfo,
      products: cart,
      shippingCost,
      total: calculateTotal(),
      status: 'pending' // Mặc định đơn mới là pending
    };

    onSave(orderData);
    onCancel();
  };

  return (
    <>
      <Modal
        title={null}
        open={open}
        onCancel={onCancel}
        footer={null}
        width={1000}
        centered
        maskClosable={false}
      >
        <div style={{ padding: '10px' }}>
          {/* Header */}
          <div className={styles.headerContainer}>
            <h2 className={styles.headerTitle}>CREATE NEW ORDER</h2>
          </div>
          <p className={styles.orderTime} style={{color: '#666'}}>
            Create at: {dayjs().format('YYYY-MM-DD HH:mm:ss')}
          </p>

          <Row gutter={24}>
            {/* --- CỘT TRÁI: NHẬP THÔNG TIN KHÁCH --- */}
            <Col span={10}>
              <div className={styles.tableHeaderRed}>Customer Information</div>
              <table className={styles.infoTable}>
                <tbody>
                  <tr>
                    <td className={styles.cellBold}>Receiver (*)</td>
                    <td className={styles.cell} style={{padding: 0}}>
                      <Input 
                        bordered={false} 
                        placeholder="Name..." 
                        value={customerInfo.receiver}
                        onChange={e => setCustomerInfo({...customerInfo, receiver: e.target.value})}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className={styles.cellBold}>Phone (*)</td>
                    <td className={styles.cell} style={{padding: 0}}>
                      <Input 
                        bordered={false} 
                        placeholder="Phone..." 
                        value={customerInfo.phone}
                        onChange={e => setCustomerInfo({...customerInfo, phone: e.target.value})}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className={styles.cellBold}>Address</td>
                    <td className={styles.cell} style={{padding: 0}}>
                      <TextArea 
                        bordered={false} 
                        autoSize={{ minRows: 1, maxRows: 3 }}
                        placeholder="Address..." 
                        value={customerInfo.address}
                        onChange={e => setCustomerInfo({...customerInfo, address: e.target.value})}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className={styles.cellBold}>Receiving date</td>
                    <td className={styles.cell} style={{padding: 0}}>
                      <DatePicker 
                        bordered={false} 
                        style={{width: '100%'}} 
                        value={customerInfo.date}
                        onChange={val => setCustomerInfo({...customerInfo, date: val})}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className={styles.cellBold}>Receiving time</td>
                    <td className={styles.cell} style={{padding: 0}}>
                       <TimePicker 
                        bordered={false} 
                        format="HH:mm" 
                        style={{width: '100%'}}
                        value={customerInfo.time}
                        onChange={val => setCustomerInfo({...customerInfo, time: val})}
                       />
                    </td>
                  </tr>
                  <tr>
                    <td className={styles.cellBold}>Note</td>
                    <td className={styles.cell} style={{padding: 0}}>
                       <Input 
                        bordered={false} 
                        placeholder="Note..." 
                        value={customerInfo.note}
                        onChange={e => setCustomerInfo({...customerInfo, note: e.target.value})}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </Col>

            {/* --- CỘT PHẢI: CHỌN SẢN PHẨM --- */}
            <Col span={14}>
              <div className={styles.tableHeaderYellow}>Order Details</div>
              
              <div style={{maxHeight: '300px', overflowY: 'auto'}}>
                <table className={styles.detailTable}>
                  <thead>
                    <tr>
                      <th className={styles.tableHeaderCell}>No.</th>
                      <th className={styles.tableHeaderCell}>Product</th>
                      <th className={styles.tableHeaderCell}>Qty</th>
                      <th className={styles.tableHeaderCell}>Price</th>
                      <th className={styles.tableHeaderCell}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map((item, index) => (
                      <tr key={item.id}>
                        <td className={styles.cell}>{index + 1}</td>
                        <td className={styles.cell} style={{textAlign: 'left'}}>
                          <div>{item.name}</div>
                          <small style={{color: '#888'}}>{item.id}</small>
                        </td>
                        <td className={styles.cell}>
                          <InputNumber 
                            min={1} 
                            value={item.quantity} 
                            onChange={(val) => handleQuantityChange(item.id, val)}
                            size="small"
                            style={{width: '60px'}}
                          />
                        </td>
                        <td className={styles.cell}>{(item.price * item.quantity).toLocaleString()}</td>
                        <td className={styles.cell}>
                           <Button danger size="small" type="text" onClick={() => handleRemoveItem(item.id)}>X</Button>
                        </td>
                      </tr>
                    ))}
                    {cart.length === 0 && (
                       <tr>
                         <td colSpan={5} className={styles.cell} style={{color: '#999', fontStyle: 'italic'}}>
                           No products added yet.
                         </td>
                       </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Button mở modal chọn bánh */}
              <Button 
                type="dashed" 
                style={{width: '100%', marginTop: '10px', color: '#1890ff', borderColor: '#1890ff'}}
                onClick={() => setIsProductPickerOpen(true)}
              >
                + Add Product
              </Button>

              <div className={styles.shippingRow}>
                <span>Shipping Cost</span>
                <InputNumber 
                  value={shippingCost}
                  formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={value => value.replace(/\$\s?|(,*)/g, '')}
                  onChange={val => setShippingCost(val)}
                  bordered={false}
                  style={{width: 100, fontWeight: 'bold', backgroundColor: 'transparent'}}
                  className="shipping-input"
                />
              </div>
              <div className={styles.totalRow}>
                <span className={styles.totalLabel}>Total</span>
                <span className={styles.totalValue}>{calculateTotal().toLocaleString()} đ</span>
              </div>
            </Col>
          </Row>

          {/* Internal Note */}
          <div className={styles.noteContainer}>
            <div className={styles.noteHeader}>Internal Note</div>
            <TextArea rows={2} style={{ borderRadius: 0 }} />
          </div>

          {/* Footer Buttons */}
          <div style={{ textAlign: 'right', marginTop: 20, display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
            <Button onClick={onCancel}>Close</Button>
            <Button type="primary" onClick={handleSave} style={{backgroundColor: '#b71c1c'}}>Save Order</Button>
          </div>
        </div>
      </Modal>

      {/* --- MODAL CON: CHỌN BÁNH --- */}
      <Modal
        title="Select Product"
        open={isProductPickerOpen}
        onCancel={() => setIsProductPickerOpen(false)}
        footer={null}
      >
        <List
          itemLayout="horizontal"
          dataSource={MOCK_PRODUCT_LIST}
          renderItem={(item) => (
            <List.Item
              actions={[<Button type="primary" size="small" onClick={() => handleAddProductToCart(item)}>Add</Button>]}
            >
              <List.Item.Meta
                title={item.name}
                description={`Price: ${item.price.toLocaleString()} đ | ID: ${item.id}`}
              />
            </List.Item>
          )}
        />
      </Modal>
    </>
  );
};

export default AddOrderModal;