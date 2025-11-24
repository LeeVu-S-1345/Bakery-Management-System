import "./Header.css";
<<<<<<< Updated upstream
import { Link, NavLink } from "react-router-dom";
=======
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
>>>>>>> Stashed changes
import { useCart } from "../../context/CartContext.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
export default function Header() {
  const cart = useCart();
  const auth = useAuth();
<<<<<<< Updated upstream
=======
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [trackId, setTrackId] = useState("");
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const accountRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (accountRef.current && !accountRef.current.contains(event.target)) {
        setIsAccountOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const scrollToMenuItem = (itemId) => {
    const targetId = `menu-item-${itemId}`;
    navigate("/menu", { state: { scrollToId: targetId } });
  };

  const onLogout = () => {
    auth.logout();
    navigate("/");
  };

  const onSearchSubmit = (event) => {
    event.preventDefault();
    const term = searchTerm.trim();
    if (!term) return;
    navigate(`/search?q=${encodeURIComponent(term)}`);
    setSearchTerm("");
  };

>>>>>>> Stashed changes
  return (
    <header className="hdr">
      {/* Top bar */}
      <div className="container hdr__top">
        <Link to="/" className="hdr__brand">
          <img src="/logo.png" alt="Sweet Bakery" />
        </Link>

        {/* Search left */}
        <form className="hdr__search">
          <input type="text" placeholder="Find you cake" aria-label="Search cake" />
          <button type="submit" aria-label="Search">🔍</button>
        </form>

        {/* Track order */}
        <form className="hdr__track">
          <input type="text" placeholder="Track your Order - Enter Order's ID" aria-label="Track order" />
          <button type="submit" aria-label="Track">🔎</button>
        </form>

        {/* Actions */}
        <nav className="hdr__actions">
          {/* Nếu CHƯA đăng nhập */}
          {!auth.isAuthed ? (
            <>
<<<<<<< Updated upstream
              <Link to="/signin">Sign in</Link>
              <Link to="/signup">Sign up</Link>
              <Link to="/cart">🛒 Cart ({cart.count})</Link>
            </>
          ) : (
            <>
              <span>Hi, <strong>{auth.user.name}</strong></span>
              <Link to="/account">My account</Link>
              <button className="icon-btn" onClick={auth.logout} title="Sign out">⎋</button>
              <Link to="/cart">🛒 Cart ({cart.count})</Link>
=======
              <Link to="/signin" className="hdr__action-item">
                <span className="hdr__icon-circle">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </span>
                <span>Sign in</span>
              </Link>
              <Link to="/signup" className="hdr__action-item">
                <span className="hdr__icon-circle">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="8.5" cy="7" r="4"></circle>
                    <line x1="20" y1="8" x2="20" y2="14"></line>
                    <line x1="23" y1="11" x2="17" y2="11"></line>
                  </svg>
                </span>
                <span>Sign up</span>
              </Link>
            </>
          ) : (
            <>
              <span className="hdr__action-item hdr__action-item--greeting">
                <span className="hdr__icon-circle">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                </span>
                <span>Hi, <strong>{auth.user.name}</strong></span>
              </span>
              <div
                className={`hdr__account ${isAccountOpen ? "open" : ""}`}
                ref={accountRef}
              >
                <button
                  type="button"
                  className="hdr__action-item"
                  onClick={() => setIsAccountOpen((prev) => !prev)}
                  aria-expanded={isAccountOpen}
                >
                  <span className="hdr__icon-circle">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </span>
                  <span>Account</span>
                  <span className="hdr__accountChevron">▾</span>
                </button>
                {isAccountOpen && (
                  <div className="hdr__accountMenu">
                    <button
                      type="button"
                      onClick={() => {
                        setIsAccountOpen(false);
                        navigate("/account");
                      }}
                    >
                      View information
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsAccountOpen(false);
                        navigate("/orders");
                      }}
                    >
                      History
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsAccountOpen(false);
                        onLogout();
                      }}
                    >
                      Sign out
                    </button>
                  </div>
                )}
              </div>
              <Link to="/cart" className="hdr__action-item hdr__action-item--cart">
                <span className="hdr__icon-circle">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="9" cy="21" r="1"></circle>
                    <circle cx="20" cy="21" r="1"></circle>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                  </svg>
                </span>
                {cart.count > 0 && <span className="hdr__cart-count">{cart.count}</span>}
              </Link>
>>>>>>> Stashed changes
            </>
          )}
        </nav>
      </div>

      {/* Category bar (pink) */}
      <div className="hdr__cats">
        <div className="container hdr__cats__inner">
          <NavLink to="/birthday" className="cat">Birthday cake</NavLink>
          <NavLink to="/mousse" className="cat">Mousse</NavLink>
          <NavLink to="/cupcake" className="cat">Cupcake</NavLink>
          <NavLink to="/cookies" className="cat">Cookies & Mini cake</NavLink>
          <NavLink to="/choux" className="cat">Cream choux</NavLink>
        </div>
      </div>
    </header>
  );
}
