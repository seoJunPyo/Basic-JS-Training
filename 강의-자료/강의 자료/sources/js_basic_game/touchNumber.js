import { TOUCH_NUMBER_SCORE_KEY } from "./constants/localStorage.js";
import { handleModalClose, handleModalOpne } from "./utils/modal.js";
import {
  getNowTime,
  getResultTimeString,
  setTimer,
  startTimer,
  stopTimer,
} from "./utils/timer.js";

const numberButtonList = document.getElementsByClassName("number-button");
const maxId = numberButtonList.length;
let currentNumber = 1;

const handleSuccessGame = () => {
  stopTimer();
  handleModalOpne({
    isSuccess: true,
    timeString: getResultTimeString(),
  });

  const nowScore = getNowTime();
  const currentScore = localStorage.getItem(TOUCH_NUMBER_SCORE_KEY);

  if (!currentScore || currentScore > nowScore) {
    localStorage.setItem(TOUCH_NUMBER_SCORE_KEY, nowScore);
  }
  setTimer(0);
};
const handleFailedGame = () => {
  stopTimer();
  handleModalOpne({
    isSuccess: false,
    timeString: "",
  });
  setTimer(0);
};

const setButtoDOM = () => {
  for (let numberButton of numberButtonList) {
    numberButton.style.display = "block";
    numberButton.style.top = `${Math.floor(Math.random() * 100 * 0.8)}%`;
    numberButton.style.left = `${Math.floor(Math.random() * 100 * 0.8)}%`;

    numberButton.onclick = (e) => {
      let numId = Number(e.target.innerHTML);
      if (isNaN(numId)) return;
      if (numId !== currentNumber) {
        return;
      }

      e.target.style.display = "none";
      if (numId === maxId) {
        handleSuccessGame();
        return;
      }

      if (numId === 1) {
        startTimer(handleFailedGame);
      }
      currentNumber++;
    };
  }
};

const initializeTouchNumberGame = () => {
  setTimer(0);
  stopTimer();
  setButtoDOM();
  currentNumber = 1;
};

const initialize = () => {
  const [headerRetryBtn, modalRetryBtn] =
    document.getElementsByClassName("retry-button");

  headerRetryBtn.onclick = () => {
    handleModalClose(initializeTouchNumberGame);
  };
  modalRetryBtn.onclick = () => {
    handleModalClose(initializeTouchNumberGame);
  };
};

setButtoDOM();
initialize();
