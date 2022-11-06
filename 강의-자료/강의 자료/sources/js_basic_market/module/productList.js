import { makeDOMUWithPropertys } from "../utils/dom.js";
import { getProductCard } from "../module/productCard.js";

export const getProductList = (productInfoList, removeCartCallback) => {
  if (!productInfoList && Array.isArray(productInfoList)) return;
  const productListContainer = makeDOMUWithPropertys("div", {
    className: "product-list-con",
  });

  productInfoList.forEach((productInfo) => {
    productListContainer.appendChild(
      getProductCard(productInfo, removeCartCallback)
    );
  });

  return productListContainer;
};
