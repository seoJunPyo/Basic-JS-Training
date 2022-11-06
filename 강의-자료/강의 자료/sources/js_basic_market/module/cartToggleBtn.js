import { makeDOMUWithPropertys } from "../utils/dom.js";

export const getCartInfo = () =>
  JSON.parse(localStorage.getItem("CART_COOKIE_KEY")) || [];

const isInCart = ({ id }) => {
  const originalCartInfo = getCartInfo();
  return !!originalCartInfo.find((cartInfo) => cartInfo.id === id);
};

const addCartInfo = (productInfo) => {
  console.log("add");
  const originalCartInfo =
    JSON.parse(localStorage.getItem("CART_COOKIE_KEY")) || [];

  if (
    originalCartInfo.findIndex((cartInfo) => cartInfo.id == productInfo.id) !==
    -1
  )
    return;
  localStorage.setItem(
    "CART_COOKIE_KEY",
    JSON.stringify([...originalCartInfo, productInfo])
  );
};

const removeCartInfo = ({ id }) => {
  console.log("remove");
  const originalCartInfo = getCartInfo();
  const newCartInfo = originalCartInfo.filter((cartInfo) => cartInfo.id !== id);

  localStorage.setItem("CART_COOKIE_KEY", JSON.stringify(newCartInfo));
};

export const getCartToggleBtn = (productInfo, removeCartCallback) => {
  let inCart = isInCart(productInfo);
  console.log(inCart);
  const cartToggleBtn = makeDOMUWithPropertys("button", {
    className: "cart-toggle-btn",
    type: "button",
    onclick: () => {
      if (inCart) {
        let confirmRemove = confirm("이 상품을 장바구니에서 삭제할까요??");
        if (!confirmRemove) return;
        removeCartInfo(productInfo);
        cartImage.src = "public/assets/cart.png";
        removeCartCallback?.();
      } else {
        let confirmAdd = confirm(
          "장바구니에 상품을 담았습니다. 장바구니로 이동할까요?"
        );
        if (confirmAdd) {
          location.href = "./cart.html";
        }
        addCartInfo(productInfo);
        cartImage.src = "public/assets/cartDisabled.png";
      }
      inCart = !inCart;
    },
  });
  const cartImage = makeDOMUWithPropertys("img", {
    className: "cart-image",
    src: inCart ? "public/assets/cartDisabled.png" : "public/assets/cart.png",
  });

  cartToggleBtn.appendChild(cartImage);

  return cartToggleBtn;
};
