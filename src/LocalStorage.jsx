export const getThemeFromLocalStorage = () => {
  let theme = localStorage.getItem("theme");
  if (theme) {
    theme = JSON.parse(theme);
  } else {
    theme = false;
  }
  return theme;
};

export const getCartFromLocalStorage = () => {
  let localCart = localStorage.getItem("cart");
  if (localCart) {
    localCart = JSON.parse(localCart);
  } else {
    localCart = [];
  }
  // console.log("localCart", localCart);
  return localCart;
};