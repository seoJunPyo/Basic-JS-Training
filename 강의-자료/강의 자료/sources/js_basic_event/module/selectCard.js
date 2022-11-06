import { makeDOMwithProperties } from "../utils/dom.js";
import { appendChildrenList } from "../utils/dom.js";
import { SELECT_RESULT_KEY } from "../constants/result.js";

const cardInfoList = [
  {
    id: 1,
    imgSrc: "./public/assets/초코꼬북칩.jpeg",
    name: "초코꼬북칩",
    desc: "맛있는 초코꼬북칩",
  },
  {
    id: 2,
    imgSrc: "./public/assets/허니버터칩.jpeg",
    name: "허니버터칩",
    desc: "맛있는 허니버터칩",
  },
  {
    id: 3,
    imgSrc: "./public/assets/나쵸.jpeg",
    name: "나쵸",
    desc: "맛있는 나쵸",
  },
  {
    id: 4,
    imgSrc: "./public/assets/홈런볼.jpeg",
    name: "홈런볼",
    desc: "맛있는 홈런볼",
  },
];

const snackCardList = document.getElementsByClassName("snack-card-list")[0];
const selectButtonDOM =
  document.getElementsByClassName("participate-button")[0];
const [notyetContainerDOM, resultContainerDOM] =
  document.getElementsByClassName("result-container");
const [, resultImageDOM, resultNameDOM, resultDescDOM, selectRetryBtn] =
  resultContainerDOM.children;
const getSelectedCadr = () => {
  return document.getElementsByClassName("select")[0];
};
const getCardId = (id) => {
  return document.getElementById(`select-${id}`);
};

const handleSelectCard = (cardId) => {
  const origianlSelectedCard = getSelectedCadr();
  origianlSelectedCard?.classList.remove("select");

  const newSelcetedCard = getCardId(cardId);
  newSelcetedCard?.classList.add("select");
};

const getSelectCardDOM = ({ id, imgSrc, name, desc }) => {
  const snackCardDOM = makeDOMwithProperties("button", {
    id: `select-${id}`,
    className: "snack-card",
    onclick: () => handleSelectCard(id),
  });

  const imageDom = makeDOMwithProperties("img", {
    src: imgSrc,
    alt: name,
  });

  const descContainerDom = makeDOMwithProperties("div", {
    className: "snack-desc",
  });

  const nameDOM = makeDOMwithProperties("div", {
    innerHTML: name,
  });

  const dscsDOM = makeDOMwithProperties("div", {
    innerHTML: desc,
  });

  appendChildrenList(descContainerDom, [nameDOM, dscsDOM]);
  appendChildrenList(snackCardDOM, [imageDom, descContainerDom]);

  return snackCardDOM;
};

export const setSelectCards = () => {
  const originalCardList = Object.assign([], snackCardList.children);
  originalCardList.forEach((snackCard) => {
    snackCard.remove();
  });

  cardInfoList.forEach((cardInfo) => {
    const seletCardDOM = getSelectCardDOM(cardInfo);
    snackCardList.appendChild(seletCardDOM);
  });

  const cardId = Number(localStorage.getItem(SELECT_RESULT_KEY));
  if (!cardId || isNaN(cardId)) return;
  handleSelectCard(cardId);
};

export const setSelectButton = () => {
  selectButtonDOM.onclick = () => {
    const selectedCard = getSelectedCadr();
    if (!selectedCard) {
      alert("선택한 카드가 없습니다.");
      return;
    }
    const cardId = selectedCard.id.split("-")?.[1];
    localStorage.setItem(SELECT_RESULT_KEY, cardId);
    setResultContainer();

    const resultScetionDOM = document.getElementById("result-section");
    const scrollTargetY = resultScetionDOM.offsetTop;
    window.scroll({
      top: scrollTargetY,
      left: 0,
      behavior: "smooth",
    });
  };
};

const initialize = () => {
  localStorage.removeItem(SELECT_RESULT_KEY);
  setSelectCards();
  setResultContainer();

  const selectSectionDOM = document.getElementById("participate-section");
  const scrollTargetY = selectSectionDOM.offsetTop;
  window.scroll({
    top: scrollTargetY,
    left: 0,
    behavior: "smooth",
  });
};

export const setResultContainer = () => {
  const selectedId = Number(localStorage.getItem(SELECT_RESULT_KEY));

  const isSelected = !!selectedId;
  if (!isSelected) {
    notyetContainerDOM.style.display = "block";
    resultContainerDOM.style.display = "none";
    return;
  }
  notyetContainerDOM.style.display = "none";
  resultContainerDOM.style.display = "flex";

  const cardInfo = cardInfoList.find((info) => info.id === selectedId);
  resultImageDOM.src = cardInfo.imgSrc;
  resultImageDOM.alt = cardInfo.name;
  resultNameDOM.innerHTML = cardInfo.name;
  resultDescDOM.innerHTML = cardInfo.desc;

  selectRetryBtn.onclick = () => {
    initialize();
  };
};
