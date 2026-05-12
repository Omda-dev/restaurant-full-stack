import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaUserCircle, FaShoppingCart } from "react-icons/fa";
import { useAuth } from "../Auth/useAuth";
import Login from "../Login/Login";
import Register from "../Register/Register";
import BookATable from "../BookATable/BookATable";
import Cart from "../Cart/Cart";
import { useCart } from "../Cart/useCart";
import logo from "../../assets/logo.png";
import logo404 from "../../assets/logo404.png";
import "./Nav.css";

const DEFAULT_AVATAR = logo404;

const Nav = () => {
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showBookModal, setShowBookModal] = useState(false);
  const [showCartModal, setShowCartModal] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const { user } = useAuth();
  const { cart } = useCart();
  const avatarSrc = user?.image || user?.imagePreview || DEFAULT_AVATAR;
  const CartButton = () => (
    <div className="relative">
      <FaShoppingCart
        size={22}
        className="cart-icon"
        onClick={() => setShowCartModal(true)}
      />
      {cart.length > 0 && (
        <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#8B0000] text-[10px] font-bold text-[#F9FAFB]">
          {cart.length}
        </span>
      )}
    </div>
  );

  const openLoginModal = () => {
    setShowRegisterModal(false);
    setShowLoginModal(true);
  };

  const closeLoginModal = () => setShowLoginModal(false);

  const openRegisterModal = () => {
    setShowLoginModal(false);
    setShowRegisterModal(true);
  };

  const closeRegisterModal = () => setShowRegisterModal(false);

  const openBookModal = () => {
    setShowBookModal(true);
    if (menuOpen) setMenuOpen(false);
  };

  const closeBookModal = () => setShowBookModal(false);
  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const handleLinkClick = () => {
    if (menuOpen) setMenuOpen(false);
  };
  const handleDashboardClick = () => {
    if (!user) {
      openLoginModal();
      return;
    }

    if (user.role === "admin") {
      navigate("/admin");
      if (menuOpen) setMenuOpen(false);
      return;
    }

    alert("You Are Not Admin");
  };

  const handleProfileClick = () => {
    if (!user) {
      openLoginModal();
      return;
    }

    navigate("/profile");
    if (menuOpen) setMenuOpen(false);
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-logo">
          <NavLink to="/" className="logo-link" onClick={handleLinkClick}>
            <img src={logo} alt="Logo" className="logo-image" />
            Restaurant
          </NavLink>
        </div>

        <div className={`hamburger ${menuOpen ? "active" : ""}`} onClick={toggleMenu}>
          <div></div>
          <div></div>
          <div></div>
        </div>

        <ul className={`navbar-links ${menuOpen ? "open" : ""}`}>
          <div className="top-buttons">
            <li>
              {user ? (
                <div className="nav-profile-wrapper">
                  <img
                    src={avatarSrc}
                    alt={user.name}
                    className="nav-profile-img"
                    onClick={handleProfileClick}
                  />
                  <CartButton />
                </div>
              ) : (
                <div className="nav-profile-wrapper">
                  <button onClick={openLoginModal} className="icon-button">
                    <FaUserCircle size={30} />
                  </button>
                  <CartButton />
                </div>
              )}
            </li>
            <li>
              <button onClick={openBookModal} className="btn-book">
                Book A Table
              </button>
            </li>
            <li>
              <button onClick={handleDashboardClick} className="btn-dash">
                Dashboard
              </button>
            </li>
          </div>

          <li><NavLink to="/" onClick={handleLinkClick}>Home</NavLink></li>
          <li><NavLink to="/AboutUs" onClick={handleLinkClick}>About Us</NavLink></li>
          <li><NavLink to="/OurMenu" onClick={handleLinkClick}>Our Menu</NavLink></li>
          <li><NavLink to="/order-online" onClick={handleLinkClick}>Order Online</NavLink></li>
          <li><NavLink to="/ContactUs" onClick={handleLinkClick}>Contact</NavLink></li>

          <li className="desktop-login-btn">
            {user ? (
              <div className="nav-profile-wrapper">
                  <img
                    src={avatarSrc}
                    alt={user.name}
                    className="nav-profile-img"
                    onClick={handleProfileClick}
                  />
                <CartButton />
              </div>
            ) : (
              <div className="nav-profile-wrapper">
                <button onClick={openLoginModal} className="icon-button">
                  <FaUserCircle size={28} />
                </button>
                <CartButton />
              </div>
            )}
          </li>
          <li className="desktop-book-btn">
            <button onClick={openBookModal} className="btn-book">
              Book A Table
            </button>
          </li>
          <li className="desktop-dash-btn">
            <button onClick={handleDashboardClick} className="btn-dash">
              Dashboard
            </button>
          </li>
        </ul>
      </nav>

      <Login show={showLoginModal} onClose={closeLoginModal} onRegisterClick={openRegisterModal} />

      <Register isOpen={showRegisterModal} onClose={closeRegisterModal} onBackToLogin={openLoginModal} />

      <BookATable show={showBookModal} onClose={closeBookModal} />

      {showCartModal && (
        <Cart
          closeCart={() => setShowCartModal(false)}
        />
      )}
    </>
  );
};

export default Nav;
