import "./style.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Logo from "../../assets/Logo";
import { LightIcon, DarkIcon } from "../../assets/Icons";
import { FaShoppingCart } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import { AiFillCloseCircle } from "react-icons/ai";
import { books } from "../../data";

import Search from "../ui/Search/Search";

const Navbar = ({ numberOfItems, isDark, setIsDark }) => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(
    window.matchMedia("(max-width: 480px)").matches
  );
  useEffect(() => {
    window
      .matchMedia("(max-width: 480px)")
      .addEventListener("change", (e) => setIsMobile(e.matches));
  }, []);

  function openMenu() {
    setIsOpen(true);
  }
  function closeMenu() {
    setIsOpen(false);
  }

  const Modes = () => {
    return (
      <button
        onClick={() => {
          document.documentElement.classList.toggle("dark-theme");
          setIsDark((prev) => !prev);
        }}
        className="btn__menu"
      >
        {isDark === true || isDark === "true" ? <DarkIcon /> : <LightIcon />}
      </button>
    );
  };

  return (
    <nav>
      <div className="nav__container">
        <Link to="/" className="logo__container">
          <Logo />
        </Link>
        <Search query={query} setQuery={setQuery} books={books} />
        <ul className="nav__links">
          {!isMobile && (
            <>
              <li className="nav__list">
                <Link to="/" className="nav__link">
                  Home
                </Link>
              </li>
              <li className="nav__list">
                <Link to="/books" className="nav__link">
                  Books
                </Link>
              </li>
            </>
          )}
          <li className="nav__icon">
            <Modes />
            <Link to="/cart" className="nav__link">
              <FaShoppingCart />
            </Link>
            {numberOfItems > 0 && (
              <span className="cart__length">{numberOfItems}</span>
            )}
          </li>
          {isMobile && (
            <>
              <button onClick={openMenu} className="btn__menu m-fs">
                <FiMenu />
              </button>
            </>
          )}
        </ul>

        {isOpen && <Backdrop closeMenu={closeMenu} />}
      </div>
    </nav>
  );
};

function Backdrop({ closeMenu }) {
  return (
    <div className="menu__backdrop">
      <button onClick={closeMenu} className="btn__menu btn__menu--close fs-m">
        <AiFillCloseCircle />
      </button>
      <ul className="menu__links">
        <li className="menu__list">
          <Link to="/" className="menu__link" onClick={closeMenu}>
            Home
          </Link>
        </li>
        <li className="menu__list">
          <Link to="/books" className="menu__link" onClick={closeMenu}>
            Books
          </Link>
        </li>
        <li className="menu__list">
          <Link to="/cart" className="menu__link" onClick={closeMenu}>
            Cart
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
