import { getProductList } from "./module/productList.js";
import { fetchSectionListData } from "./module/fetch.js";
import { setButtonEvent, setFilter } from "./module/productFilter.js";

const sectionInfoList = await fetchSectionListData();

const productList = sectionInfoList.reduce(
  (prev, curr) => [...prev, ...curr.productList],
  []
);

const section = document.getElementsByTagName("section")[0];
const prodouctListDOM = getProductList(productList);
section.appendChild(prodouctListDOM);

setButtonEvent(productList);
setFilter();
