import Header from "../components/Header/Header.jsx";
import Footer from "../components/Footer/Footer.jsx";
import "./History.css";
import { useAuth } from "../context/AuthContext.jsx";
import { formatVND } from "../lib/money.js";
import { useMemo } from "react";

const BASE_ORDERS = [
  {
    id: "INV-1001",
    date: "2025-01-05",
    status: "Delivered",
    total: 420000,
    items: [
      { name: "Red Velvet Celebration Cake", qty: 1, price: 230000 },
      { name: "Matcha Cream Choux", qty: 4, price: 48000 },
    ],
  },
  {
    id: "INV-1002",
    date: "2025-01-18",
    status: "Preparing",
    total: 320000,
    items: [
      { name: "Tin Box Cake - Strawberry", qty: 1, price: 180000 },
      { name: "Mini Cookies Set", qty: 1, price: 140000 },
    ],
  },
  {
    id: "INV-1003",
    date: "2025-02-02",
    status: "Cancelled",
    total: 150000,
    items: [{ name: "Classic Cupcake x6", qty: 1, price: 150000 }],
  },
];

export default function HistoryPage() {
  const auth = useAuth();

  const orders = useMemo(() => {
    if (!auth.user) return [];
    return BASE_ORDERS.map((order) => ({
      ...order,
      email: auth.user.email,
    }));
  }, [auth.user]);

  return (
    <>
      <Header />
      <main className="historyPage">
        <div className="container">
          {!auth.isAuthed ? (
            <section className="historyEmpty">
              <h1>Please sign in to view your orders</h1>
              <p>
                Dessert history is only available for logged in customers. Sign
                in to revisit your celebrations!
              </p>
            </section>
          ) : (
            <>
              <header className="historyHeader">
                <p className="historyEyebrow">Order history</p>
                <h1>Sweet moments for {auth.user.name}</h1>
                <p className="historySub">
                  Showing {orders.length} order
                  {orders.length !== 1 ? "s" : ""} placed with{" "}
                  <strong>{auth.user.email}</strong>
                </p>
              </header>

              <div className="historyTimeline">
                {orders.map((order) => (
                  <article key={order.id} className="historyCard">
                    <div className="historyMeta">
                      <div>
                        <p className="historyLabel">Order ID</p>
                        <h2>{order.id}</h2>
                      </div>
                      <div>
                        <p className="historyLabel">Date</p>
                        <strong>{order.date}</strong>
                      </div>
                      <div>
                        <p className="historyLabel">Status</p>
                        <span className={`historyStatus is-${order.status.toLowerCase()}`}>
                          {order.status}
                        </span>
                      </div>
                      <div>
                        <p className="historyLabel">Total</p>
                        <strong>{formatVND(order.total)}</strong>
                      </div>
                    </div>

                    <div className="historyItems">
                      {order.items.map((item, index) => (
                        <div key={`${order.id}-${index}`} className="historyItem">
                          <div>
                            <p className="historyItemName">{item.name}</p>
                            <p className="historyItemMeta">
                              Qty {item.qty} · {formatVND(item.price)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

