import { makeDOMUWithPropertys } from "../utils/dom.js";
import { getProductList } from "./productList.js";

const MAX_PRICE = Number.MAX_VALUE;

const minPriceFliter = document.getElementById("price-min-filter");
const maxPriceFliter = document.getElementById("price-max-filter");
const discountFliter = document.getElementById("discount-filter");
const filterButton =
  document.getElementsByClassName("product-filter-con")[0]?.lastElementChild;

export const setButtonEvent = (productList) => {
  filterButton.onclick = () => {
    const maxPrice = convertPriceToNumber(maxPriceFliter.value) || MAX_PRICE;
    const minPrice = convertPriceToNumber(minPriceFliter.value) || 0;
    const discountRate = convertPercentToNumber(discountFliter.value) || 0;

    const newProductLIst = productList.filter((productInfo) => {
      const { price, discountPercent } = productInfo;
      return (
        price >= minPrice &&
        price <= maxPrice &&
        discountRate <= discountPercent
      );
    });

    const setctionDOM = document.getElementsByTagName("section")[0];
    const orignalProductListDOM =
      document.getElementsByClassName("product-list-con")[0];
    setctionDOM.removeChild(orignalProductListDOM);

    if (newProductLIst.length > 0) {
      const ProductListDOM = getProductList(newProductLIst);
      setctionDOM.appendChild(ProductListDOM);
    } else {
      const emptyProductDOM = makeDOMUWithPropertys("div", {
        innerHTML: "조건에 해당하는 상품이 없습니다.",
        className: "product-list con empty",
      });

      setctionDOM.appendChild(emptyProductDOM);
    }
  };
};

const formatToPrice = (e) => {
  const val = e.target.value;
  const result = Number(val);

  if (isNaN(result)) {
    alert("숫자를 입력해주세요.");
    e.target.value = 0;
  } else {
    e.target.value = ` ${result.toLocaleString()}원`;
  }
};

const convertPercentToNumber = (originalValue) => {
  const formetedString = originalValue.replace(",", "").replace("%", "");
  const formetedNumber = Number(formetedString);
  return isNaN(formetedNumber) ? 0 : formetedNumber;
};

const convertPriceToNumber = (orignalPrice) => {
  const formetedString = orignalPrice.replace(",", "").replace("원", "");
  const formetedNumber = Number(formetedString);
  return isNaN(formetedNumber) ? 0 : formetedNumber;
};

export const setFilter = () => {
  minPriceFliter.onfocus = (e) => {
    e.target.value = convertPriceToNumber(e.target.value);
  };
  minPriceFliter.onblur = formatToPrice;
  maxPriceFliter.onfocus = (e) => {
    e.target.value = convertPriceToNumber(e.target.value);
  };
  maxPriceFliter.onblur = formatToPrice;
  discountFliter.onfocus = (e) => {
    e.target.value = convertPercentToNumber(e.target.value);
  };
  discountFliter.onblur = (e) => {
    const val = e.target.value;
    const result = Number(val);

    if (isNaN(result)) {
      alert("숫자를 입력해주세요.");
      e.target.value = 0;
      return;
    }
    if (result > 100 || result < 0) {
      alert("0과 100사이로 입력해주세요");
      e.target.value = 0;
      return;
    }

    e.target.value = `${result.toLocaleString()}%`;
  };
};
