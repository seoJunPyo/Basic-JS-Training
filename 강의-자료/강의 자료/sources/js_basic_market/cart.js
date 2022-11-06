import { getCartInfo } from "./module/cartToggleBtn.js";
import { setPayInfo } from "./module/payModule.js";
import { getProductList } from "./module/productList.js";
import { makeDOMUWithPropertys } from "./utils/dom.js";

const sectionDOM = document.getElementsByTagName("section")[0];
const cartPayContainerDOM = document.getElementById("cart-pay-container");
const cartRemoveAllBtn = document.getElementById("remove-all-button");

const cartInfo = getCartInfo();

const reloadPage = () => location.reload();

if (cartInfo.length < 1) {
  const noticeDOM = makeDOMUWithPropertys("div", {
    innerHTML: "장바구니에 상품이 없습니다.",
    className: "product-list-con",
  });
  sectionDOM.insertBefore(noticeDOM, cartPayContainerDOM);
} else {
  const productListDOM = getProductList(cartInfo, reloadPage);
  sectionDOM.insertBefore(productListDOM, cartPayContainerDOM);
}

cartRemoveAllBtn.onclick = () => {
  localStorage.removeItem("CART_COOKIE_KEY");
  reloadPage();
};

setPayInfo();
