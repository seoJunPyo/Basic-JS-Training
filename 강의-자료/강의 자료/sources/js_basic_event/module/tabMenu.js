// const headerDOM = document.getElementsByTagName("header")[0];
// const headerHeight = headerDOM.offsetHeight;
const selectAnchorMenuDOM = document.getElementById("anchor-to-select");
const resultAnchorMenuDOM = document.getElementById("anchor-to-result");
const mbtiAnchorMenuDOM = document.getElementById("anchor-to-mbti");

const selectScetionDOM = document.getElementById("participate-section");
const resultScetionDOM = document.getElementById("result-section");
const mbtiScetionDOM = document.getElementById("mbti-section");

const setScrollHandler = (anchorDOM, targetDOM) => {
  anchorDOM.onclick = () => {
    const scrollTargetY = targetDOM.offsetTop;
    window.scroll({
      top: scrollTargetY,
      left: 0,
      behavior: "smooth",
    });
  };
};

export const setTabMenu = () => {
  setScrollHandler(selectAnchorMenuDOM, selectScetionDOM);
  setScrollHandler(resultAnchorMenuDOM, resultScetionDOM);
  setScrollHandler(mbtiAnchorMenuDOM, mbtiScetionDOM);

  // selectScetionDOM.scrollIntoView({
  //   behavior: "smooth",
  // });
};
