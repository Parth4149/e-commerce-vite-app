import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar, Footer } from "./components";
import { Home, Books, BookInfo, Cart } from "./pages";
import { books } from "./data";

import {
  getThemeFromLocalStorage,
  getCartFromLocalStorage,
} from "./LocalStorage";

function App() {
  const [cart, setCart] = useState([]);
  const [isDark, setIsDark] = useState(getThemeFromLocalStorage());

  const addToCart = (book) => {
    setCart([...cart, { ...book, quantity: 1 }]);
  };

  const removeItem = (book) => {
    const updatedCart = cart.filter((item) => +item.id !== +book.id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const numberOfItems = () => {
    let count = 0;
    cart.forEach((item) => {
      count += item.quantity;
    });
    return count;
  };

  const changeQuantity = (book, quantity) => {
    setCart(
      cart.map((item) =>
        +item.id === +book.id ? { ...item, quantity: +quantity } : item
      ) // + convert str to number
    );
  };

  useEffect(() => {
    setCart(getCartFromLocalStorage());
    const theme = getThemeFromLocalStorage();
    if (theme === true || theme === "true") {
      document.documentElement.classList.add("dark-theme");
    } else {
      document.documentElement.classList.remove("dark-theme");
    }
    setIsDark(theme);
  }, []);

  useEffect(() => {
    cart.length > 0 && localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);
  useEffect(() => {
    localStorage.setItem("theme", isDark);
  }, [isDark]);

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar
          numberOfItems={numberOfItems()}
          isDark={isDark}
          setIsDark={setIsDark}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<Books books={books} />} />
          <Route
            path="/books/:id"
            element={<BookInfo props={{ books, addToCart, cart }} />}
          />
          <Route
            path="/cart"
            element={<Cart props={{ cart, changeQuantity, removeItem }} />}
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
