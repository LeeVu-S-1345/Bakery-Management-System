import { useParams, Link } from "react-router-dom";
import Header from "../components/Header/Header.jsx";
import Footer from "../components/Footer/Footer.jsx";
import "./OrderTracking.css";
import { findOrderById } from "../lib/orders.js";
import { formatVND } from "../lib/money.js";

function formatDateTime(iso) {
  if (!iso) return "Updating";
  const date = new Date(iso);
  return date.toLocaleString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
    day: "2-digit",
    month: "2-digit",
  });
}

export default function OrderTracking() {
  const { orderId } = useParams();
  const order = findOrderById(orderId);

  return (
    <>
      <Header />
      <main className="trackPage">
        <div className="container">
          {!order ? (
            <section className="trackBox">
              <h1>Không tìm thấy đơn hàng</h1>
              <p>
                Vui lòng kiểm tra lại mã đơn <strong>{orderId}</strong>. Nếu
                bạn chắc chắn mã chính xác, hãy liên hệ hotline để được hỗ trợ.
              </p>
              <Link to="/menu">Trở về menu</Link>
            </section>
          ) : (
            <section className="trackBox">
              <p className="trackEyebrow">Tracking</p>
              <h1>Tình trạng đơn {order.id}</h1>
              <div className="trackStatusChip">{order.status}</div>
              <p className="trackTotal">
                Tổng đơn: <strong>{formatVND(order.prices.total)}</strong>
              </p>

              <div className="trackTimeline">
                {order.timeline.map((step, index) => (
                  <div className="trackStep" key={index}>
                    <div className="trackDot" />
                    <div>
                      <h3>{step.label}</h3>
                      <p>{formatDateTime(step.time)}</p>
                      <small>{step.note}</small>
                    </div>
                  </div>
                ))}
              </div>

              <div className="trackMeta">
                <div>
                  <span>Người nhận</span>
                  <strong>{order.receiver.name}</strong>
                  <p>{order.receiver.phone}</p>
                </div>
                <div>
                  <span>Địa chỉ</span>
                  <p>
                    {order.address.street}, {order.address.ward},{" "}
                    {order.address.district}, {order.address.city}
                  </p>
                </div>
                <div>
                  <span>Ngày giao dự kiến</span>
                  <p>
                    {order.time.date} · {order.time.slot}
                  </p>
                </div>
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

