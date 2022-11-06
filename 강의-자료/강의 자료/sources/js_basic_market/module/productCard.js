import { makeDOMUWithPropertys } from "../utils/dom.js";
import { appendChildList } from "../utils/dom.js";
import { getCartToggleBtn } from "./cartToggleBtn.js";

export const getProductCard = (productInfo, removeCartCallback) => {
  const { imgSrc, id, name, discountPercent, price, orignalPrice } =
    productInfo;
  const productCard = makeDOMUWithPropertys("div", {
    className: "product-card",
  });

  //이미지 컨테이너
  const productImgCon = makeDOMUWithPropertys("div", {
    className: "product-image-con",
  });
  const productImg = makeDOMUWithPropertys("img", {
    src: imgSrc,
    alt: name,
  });

  const cartToggleBtn = getCartToggleBtn(productInfo, removeCartCallback);

  appendChildList(productImgCon, [productImg, cartToggleBtn]);

  // 상품 설명
  const productDesc = makeDOMUWithPropertys("div", {
    className: "product-description",
  });

  const productName = makeDOMUWithPropertys("div", {
    className: "product-name",
    innerHTML: name,
  });

  const productPriceCon = makeDOMUWithPropertys("div", {
    className: "product-price-con",
  });
  const productDiscountPerent = makeDOMUWithPropertys("div", {
    className: "product-discount-percent",
    innerHTML: ` ${discountPercent}%`,
  });
  const productPrice = makeDOMUWithPropertys("div", {
    className: "product-price",
    innerHTML: `${price.toLocaleString()}원`,
  });

  const productorignalPrice = makeDOMUWithPropertys("div", {
    className: "product-original-price",
    innerHTML: `${orignalPrice.toLocaleString()}원`,
  });

  appendChildList(productPriceCon, [productDiscountPerent, productPrice]);
  appendChildList(productDesc, [
    productName,
    productPriceCon,
    productorignalPrice,
  ]);

  // 전체카드
  appendChildList(productCard, [productImgCon, productDesc]);

  return productCard;
};
