export const fetchSectionListData = async () => {
  try {
    const response = await fetch(
      "../js_basic_market/public/mock/sectionListData.json"
    );
    const data = await response.json();
    return data?.sectionInfoList || [];
  } catch (error) {
    console.log(error);
    return [];
  }
};
