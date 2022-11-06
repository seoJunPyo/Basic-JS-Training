import { getProductSection } from "./module/productSection.js";
import { fetchSectionListData } from "./module/fetch.js";
fetchSectionListData();

try {
  const sectionInfoList = await fetchSectionListData();
  sectionInfoList.forEach((setionInfo) => {
    console.log(setionInfo);
    const { sectionTitel, productList } = setionInfo;
    const producSetionDOM = getProductSection(sectionTitel, productList);
    document.body.appendChild(producSetionDOM);
  });
} catch {
  console.log("error");
}
