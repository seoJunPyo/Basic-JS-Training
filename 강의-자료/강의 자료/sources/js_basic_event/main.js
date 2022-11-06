import { setTabMenu } from "./module/tabMenu.js";
import {
  setResultContainer,
  setSelectButton,
  setSelectCards,
} from "./module/selectCard.js";
import { countUp } from "./utils/countUp.js";
import { setMbtiSection } from "./module/mbtiSelect.js";
import { setShareURLBtn } from "./module/share.js";

const data = {
  participate: 123414,
};

const participateDOM = document.getElementById("participate-number");
participateDOM.innerHTML = data.participate;

countUp(participateDOM, data.participate, 3);

setTabMenu();

setSelectCards();

setSelectButton();

setResultContainer();

setMbtiSection();

setShareURLBtn();
