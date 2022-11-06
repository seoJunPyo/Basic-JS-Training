import { makeDOMUWithPropertys } from "../utils/dom.js";
import { getProductCard } from "../module/productCard.js";
import { appendChildList } from "../utils/dom.js";
import { getProductList } from "../module/productList.js";

export const getProductSection = (secctionName, productInfoList) => {
  const productListSection = makeDOMUWithPropertys("div", {
    className: "product-list-section",
  });

  const sectionTitle = makeDOMUWithPropertys("div", {
    className: "section-title",
  });
  const titleHighLight = makeDOMUWithPropertys("span", {
    className: "section-title-highlight",
  });
  const title = makeDOMUWithPropertys("span", {
    innerHTML: secctionName,
  });

  appendChildList(sectionTitle, [titleHighLight, title]);

  const productListContainer = getProductList(productInfoList);

  appendChildList(productListSection, [sectionTitle, productListContainer]);

  return productListSection;
};
