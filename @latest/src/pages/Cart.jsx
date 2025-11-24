import "./Cart.css";
import { useCart } from "../context/CartContext.jsx";
import { formatVND } from "../lib/money";
import { Link } from "react-router-dom";
<<<<<<< Updated upstream
=======
import Header from "../components/Header/Header.jsx";
import Footer from "../components/Footer/Footer.jsx";
import { useState } from "react";
>>>>>>> Stashed changes

export default function Cart() {
  const cart = useCart();
  const [draftQty, setDraftQty] = useState({});

  const updateDraft = (id, value) => {
    setDraftQty((prev) => ({ ...prev, [id]: value }));
  };

  const clearDraft = (id) => {
    setDraftQty((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  };

  const handleQtyChange = (id, value) => {
    if (!/^\d*$/.test(value)) return;
    updateDraft(id, value);
    if (value === "") return;
    const num = Number(value);
    if (!Number.isNaN(num) && num > 0) {
      cart.setQty(id, num);
    }
  };

  const handleQtyBlur = (id, value, currentQty) => {
    if (value === "" || Number(value) <= 0) {
      cart.setQty(id, currentQty);
    }
    clearDraft(id);
  };

  if (cart.items.length === 0) {
    return (
      <main className="cart">
        <div className="container">
          <h1 className="cart__title">Shopping Cart</h1>
          <p>Giỏ của bạn đang trống.</p>
          <Link to="/menu" className="cart__back">Xem sản phẩm</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="cart">
      <div className="container">
        <h1 className="cart__title">Shopping Cart</h1>
        <p className="cart__subtitle">
          You have <strong>{cart.count}</strong> item{cart.count>1?'s':''} in the cart
        </p>

        <div className="cart__table">
          {cart.items.map((it) => (
            <div key={it.id} className="cart__row">
              <img src={it.image} alt="" className="cart__thumb" />
              <div className="cart__info">
                <div className="cart__name">{it.name}</div>
                <div className="cart__price">{formatVND(it.price)}</div>
              </div>

              <div className="cart__qty">
                <button
                  onClick={() => {
                    cart.dec(it.id);
                    clearDraft(it.id);
                  }}
                  aria-label="Decrease"
                >
                  −
                </button>
                <input
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={
                    draftQty[it.id] !== undefined
                      ? draftQty[it.id]
                      : String(it.qty)
                  }
                  onChange={(e) => handleQtyChange(it.id, e.target.value)}
                  onBlur={(e) => handleQtyBlur(it.id, e.target.value, it.qty)}
                />
                <button
                  onClick={() => {
                    cart.inc(it.id);
                    clearDraft(it.id);
                  }}
                  aria-label="Increase"
                >
                  +
                </button>
              </div>  

              <div className="cart__sum">{formatVND(it.price * it.qty)}</div>
              <button className="cart__remove" onClick={() => cart.remove(it.id)}>✕</button>
            </div>
          ))}
        </div>

        <div className="cart__totals">
          <div className="cart__line">
            <span>Subtotal</span>
            <strong>{formatVND(cart.subtotal)}</strong>
          </div>
          {/* sau này thêm ship/discount ở đây */}
          <div className="cart__actions">
            <Link to="/menu" className="cart__back">← Continue shopping</Link>
            <Link to="/checkout"><button className="cart__checkout">Proceed to checkout</button></Link>
          </div>
        </div>
      </div>
    </main>
  );
}
