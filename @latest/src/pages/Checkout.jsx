import "./Checkout.css";
import { useMemo, useState } from "react";
import { useCart } from "../context/CartContext.jsx";
import { formatVND } from "../lib/money";
import { Link, useNavigate } from "react-router-dom";
import { generateOrderId, saveOrder } from "../lib/orders.js";
import Header from "../components/Header/Header.jsx";
import Footer from "../components/Footer/Footer.jsx";

const CITIES = ["Hà Nội", "TP. Hồ Chí Minh", "Đà Nẵng"];
const DISTRICTS = {
  "Hà Nội": ["Ba Đình", "Hai Bà Trưng", "Cầu Giấy"],
  "TP. Hồ Chí Minh": ["Quận 1", "Quận 3", "Bình Thạnh"],
  "Đà Nẵng": ["Hải Châu", "Sơn Trà", "Thanh Khê"],
};
const WARDS = {
  "Ba Đình": ["Phúc Xá", "Trúc Bạch", "Liễu Giai"],
  "Hai Bà Trưng": ["Bạch Mai", "Thanh Nhàn", "Vĩnh Tuy"],
  "Cầu Giấy": ["Dịch Vọng", "Nghĩa Tân", "Yên Hòa"],
  "Quận 1": ["Bến Nghé", "Bến Thành"],
  "Quận 3": ["Võ Thị Sáu", "Phường 7"],
  "Bình Thạnh": ["26", "25"],
  "Hải Châu": ["Hòa Thuận", "Thanh Bình"],
  "Sơn Trà": ["An Hải Bắc", "Phước Mỹ"],
  "Thanh Khê": ["An Khê", "Chính Gián"],
};

export default function Checkout() {
  const cart = useCart();
  const nav = useNavigate();

  // form state
  const [customer, setCustomer] = useState({ name: "", phone: "", note: "" });
  const [receiverSame, setReceiverSame] = useState(true);
  const [receiver, setReceiver] = useState({ name: "", phone: "" });

  const [city, setCity] = useState("Hà Nội");
  const [district, setDistrict] = useState("Hai Bà Trưng");
  const [ward, setWard] = useState("Bạch Mai");
  const [street, setStreet] = useState("");

  const [invoice, setInvoice] = useState(false);
  const [date, setDate] = useState(() => new Date().toISOString().slice(0,10));
  const [slot, setSlot] = useState("Sáng (7h–11h)");

  const [voucher, setVoucher] = useState("");
  const [voucherMsg, setVoucherMsg] = useState("");
  const [payment, setPayment] = useState("bank"); // bank | cod

  // phí/giảm giá
  const shipFee = 15000;
  const discount = 0;

  const voucherDiscount = useMemo(() => {
    // demo: BA25 giảm 25k; FREESHIP miễn ship
    if (voucher.toUpperCase() === "BA25") return 25000;
    return 0;
  }, [voucher]);
  const freeShip = voucher.toUpperCase() === "FREESHIP";

  const subtotal = cart.subtotal;
  const total = Math.max(
    0,
    subtotal - discount - voucherDiscount + (freeShip ? 0 : shipFee)
  );

  function applyVoucher() {
    if (voucher.toUpperCase() === "BA25") {
      setVoucherMsg("Áp dụng mã BA25: giảm 25.000₫");
    } else if (voucher.toUpperCase() === "FREESHIP") {
      setVoucherMsg("Áp dụng mã FREESHIP: miễn phí ship");
    } else if (!voucher) {
      setVoucherMsg("");
    } else {
      setVoucherMsg("Mã không hợp lệ");
    }
  }

  function valid() {
    if (!customer.name.trim() || !customer.phone.trim()) return false;
    if (!receiverSame && (!receiver.name.trim() || !receiver.phone.trim())) return false;
    if (!street.trim()) return false;
    if (cart.items.length === 0) return false;
    return true;
  }

  function placeOrder(e) {
    e.preventDefault();
    if (!valid()) return;
    const orderId = generateOrderId();
    const placedAt = new Date().toISOString();
    const payload = {
      id: orderId,
      status: "Processing",
      placedAt,
      customer,
      receiver: receiverSame ? customer : receiver,
      address: { city, district, ward, street },
      invoice,
      time: { date, slot },
      payment,
      items: cart.items,
      prices: {
        subtotal,
        discount,
        voucherDiscount,
        ship: freeShip ? 0 : shipFee,
        total,
      },
      voucher: voucher.toUpperCase() || null,
      timeline: [
        { label: "Order placed", time: placedAt, note: "Chờ xác nhận" },
        { label: "Preparing", time: null, note: "Bếp đang chuẩn bị" },
        { label: "On delivery", time: null, note: "Đang giao bởi shipper" },
      ],
    };
    saveOrder(payload);
    cart.clear();
    nav(`/order-success/${orderId}`);
  }

  const districts = DISTRICTS[city] || [];
  const wards = WARDS[district] || [];

  return (
    <>
      <Header />
      <main className="checkout">
        <div className="container">
          <h1 className="co__title">Order Confirmation</h1>

        <div className="co__grid">
          {/* LEFT */}
          <form className="co__left" onSubmit={placeOrder}>
            {/* Customer info */}
            <section className="co__card">
              <div className="co__cardTitle">Thông tin người đặt</div>

              <label className="co__row">
                <span>Họ và tên</span>
                <input
                  value={customer.name}
                  onChange={e => setCustomer(c => ({...c, name:e.target.value}))}
                  placeholder="Nguyễn Văn A"
                  required
                />
              </label>

              <label className="co__row">
                <span>Số điện thoại</span>
                <input
                  value={customer.phone}
                  onChange={e => setCustomer(c => ({...c, phone:e.target.value}))}
                  placeholder="09xx xxx xxx"
                  required
                />
              </label>

              <label className="co__row co__row--full">
                <span>Ghi chú</span>
                <textarea
                  value={customer.note}
                  onChange={e => setCustomer(c => ({...c, note:e.target.value}))}
                  placeholder="Ví dụ: không vẽ chữ"
                />
              </label>
            </section>

            {/* Receiver */}
            <section className="co__card">
              <div className="co__cardTitle">Thông tin người nhận</div>

              <label className="co__check">
                <input
                  type="checkbox"
                  checked={receiverSame}
                  onChange={e => setReceiverSame(e.target.checked)}
                />
                <span>Giống người đặt hàng</span>
              </label>

              {!receiverSame && (
                <>
                  <label className="co__row">
                    <span>Họ và tên</span>
                    <input
                      value={receiver.name}
                      onChange={e => setReceiver(r => ({...r, name:e.target.value}))}
                      placeholder="Tên người nhận"
                      required
                    />
                  </label>
                  <label className="co__row">
                    <span>Số điện thoại</span>
                    <input
                      value={receiver.phone}
                      onChange={e => setReceiver(r => ({...r, phone:e.target.value}))}
                      placeholder="09xx xxx xxx"
                      required
                    />
                  </label>
                </>
              )}

              {/* Address */}
              <div className="co__row">
                <span>Tỉnh/Thành</span>
                <select value={city} onChange={e => setCity(e.target.value)}>
                  {CITIES.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>

              <div className="co__row">
                <span>Quận/Huyện</span>
                <select value={district} onChange={e => setDistrict(e.target.value)}>
                  {districts.map(d => <option key={d}>{d}</option>)}
                </select>
              </div>

              <div className="co__row">
                <span>Phường/Xã</span>
                <select value={ward} onChange={e => setWard(e.target.value)}>
                  {wards.map(w => <option key={w}>{w}</option>)}
                </select>
              </div>

              <label className="co__row co__row--full">
                <span>Địa chỉ chi tiết</span>
                <input
                  value={street}
                  onChange={e => setStreet(e.target.value)}
                  placeholder="Số nhà, đường…"
                  required
                />
              </label>
            </section>

            {/* Invoice */}
            <section className="co__card">
              <label className="co__check">
                <input type="checkbox" checked={invoice} onChange={e => setInvoice(e.target.checked)} />
                <span>Xuất hóa đơn trong đơn hàng</span>
              </label>
            </section>

            {/* Delivery time */}
            <section className="co__card">
              <div className="co__cardTitle">Thời gian nhận hàng</div>
              <div className="co__row">
                <span>Ngày nhận</span>
                <input type="date" value={date} onChange={e => setDate(e.target.value)} />
              </div>
              <div className="co__row">
                <span>Giờ nhận</span>
                <select value={slot} onChange={e => setSlot(e.target.value)}>
                  <option>Sáng (7h–11h)</option>
                  <option>Trưa (11h–14h)</option>
                  <option>Chiều (14h–18h)</option>
                  <option>Tối (18h–21h)</option>
                </select>
              </div>

              <ul className="co__note">
                <li>Lưu ý: Đơn hàng giao lẻ 1h.</li>
                <li>Không giao đơn sau 19h30.</li>
                <li>Nếu cần gấp, vui lòng liên hệ hotline.</li>
              </ul>
            </section>

            {/* Submit */}
            <button className="co__submit" type="submit" disabled={!valid()}>
              Đặt hàng
            </button>

            <div className="co__back">
              <Link to="/cart">← Quay lại giỏ hàng</Link>
            </div>
          </form>

          {/* RIGHT */}
          <aside className="co__right">
            <section className="co__card">
              <div className="co__cardTitle">Thanh toán</div>

              {cart.items.map(it => (
                <div key={it.id} className="co__item">
                  <div className="co__itemInfo">
                    <img src={it.image} alt="" />
                    <div>
                      <div className="co__itemName">{it.name}</div>
                      <div className="co__itemSku">Số lượng: {it.qty}</div>
                    </div>
                  </div>
                  <div className="co__itemSum">{formatVND(it.price * it.qty)}</div>
                </div>
              ))}

              <div className="co__hr" />

              <div className="co__line"><span>Tổng tiền hàng</span><span>{formatVND(subtotal)}</span></div>
              {discount > 0 && <div className="co__line"><span>Giảm giá</span><span>-{formatVND(discount)}</span></div>}
              {voucherDiscount > 0 && <div className="co__line"><span>Voucher</span><span>-{formatVND(voucherDiscount)}</span></div>}
              <div className="co__line"><span>Phí ship tạm tính</span><span>{freeShip ? "0₫" : formatVND(shipFee)}</span></div>

              <div className="co__grand">
                <span>Tổng đơn:</span>
                <strong>{formatVND(total)}</strong>
              </div>

              {/* Voucher */}
              <div className="co__voucher">
                <input
                  placeholder="Mã voucher (ví dụ: BA25, FREESHIP)"
                  value={voucher}
                  onChange={e => setVoucher(e.target.value)}
                />
                <button onClick={applyVoucher} type="button">Áp dụng</button>
              </div>
              {voucherMsg && <div className="co__voucherMsg">{voucherMsg}</div>}
            </section>

            {/* Shipping policy */}
            <section className="co__card">
              <div className="co__cardTitle">Phí ship</div>
              <ol className="co__policy">
                <li>Nội thành Hà Nội: đồng giá 15k.</li>
                <li>FREESHIP khi có mã hợp lệ.</li>
                <li>Thời gian giao 7:00–21:00 hàng ngày.</li>
              </ol>
            </section>

            {/* Payment method */}
            <section className="co__card">
              <div className="co__cardTitle">Phương thức thanh toán</div>
              <label className="co__radio">
                <input type="radio" name="pm" checked={payment==="bank"} onChange={() => setPayment("bank")} />
                <span>Chuyển khoản ngân hàng</span>
              </label>
              <label className="co__radio">
                <input type="radio" name="pm" checked={payment==="cod"} onChange={() => setPayment("cod")} />
                <span>Thanh toán khi nhận hàng</span>
              </label>
            </section>
          </aside>
        </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
