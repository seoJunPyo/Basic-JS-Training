import {
  MOUSE_CONTROL_SCORE_KEY,
  ARROW_SPEED_SCORE_KEY,
  TOUCH_NUMBER_SCORE_KEY,
} from "./constants/localStorage.js";
import { getTimeString } from "./utils/timer.js";
import { makeDOMwithProperties, appendChildrenList } from "./utils/dom.js";

const gameInfoList = [
  {
    id: 1,
    url: "mouse_control.html",
    thumbnail: "public/assets/mouse_control_thumbnail.png",
    title: "마우스컨트롤 게임",
    isNew: false,
  },

  {
    id: 2,
    url: "touch_number.html",
    thumbnail: "public/assets/touch_number_thumbnail.png",
    title: "숫자 클릭 게임",
    isNew: true,
  },
  {
    id: 3,
    url: "arrow_speed.html",
    thumbnail: "public/assets/arrow_speed_thumbnail.png",
    title: "방향키 게임",
    isNew: false,
  },
];

const localstorageKeymap = {
  1: MOUSE_CONTROL_SCORE_KEY,
  2: TOUCH_NUMBER_SCORE_KEY,
  3: ARROW_SPEED_SCORE_KEY,
};

const getCard = ({ id, url, thumbnail, title, isNew }) => {
  const gameCardDOM = makeDOMwithProperties("a", {
    className: "game-card",
    href: url,
  });
  const thumbnailDOM = makeDOMwithProperties("img", {
    src: thumbnail,
    alt: title,
  });
  const newBedgeDOM = isNew
    ? makeDOMwithProperties("span", {
        className: "game-new-badge",
        innerHTML: "new",
      })
    : null;

  const titleDOM = makeDOMwithProperties("div", {
    className: "game-title",
    innerHTML: title,
  });
  const result = localStorage.getItem(localstorageKeymap[id]);

  const resultDOM = makeDOMwithProperties("div", {
    className: "game-result",
    innerHTML: result ? `최고기록 : ${getTimeString(result)}` : "도전해보세요!",
  });

  appendChildrenList(gameCardDOM, [
    thumbnailDOM,
    newBedgeDOM,
    titleDOM,
    resultDOM,
  ]);

  return gameCardDOM;
};

const gameListContainer = document.getElementById("game-list-container");

gameInfoList.forEach((gameInfo) => {
  const cardDOM = getCard(gameInfo);
  gameListContainer.appendChild(cardDOM);
});
