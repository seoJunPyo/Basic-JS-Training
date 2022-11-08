import { ARROW_SPEED_SCORE_KEY } from "./constants/localStorage.js";
import { makeDOMwithProperties } from "./utils/dom.js";
import { handleModalClose, handleModalOpne } from "./utils/modal.js";
import {
  getNowTime,
  getResultTimeString,
  setTimer,
  startTimer,
  stopTimer,
} from "./utils/timer.js";

const arrowFieldDOM = document.getElementById("arrow-field");
const roundDOM = document.getElementsByClassName("round")[0];
const MAX_ARROW = 8;
const MAX_ROUND = 3;

let arrowDOMList = [];
let currentIndex = 0;
let round = 1;

const clearArrowDOM = () => {
  arrowDOMList.forEach((arrowDOM) => {
    arrowDOM.remove();
  });
  arrowDOMList = [];
};

const handleSuccessGame = () => {
  stopTimer();
  handleModalOpne({
    isSuccess: true,
    timeString: getResultTimeString(),
  });

  const nowScore = getNowTime();
  const currentScore = localStorage.getItem(ARROW_SPEED_SCORE_KEY);

  if (!currentScore || currentScore > nowScore) {
    localStorage.setItem(ARROW_SPEED_SCORE_KEY, nowScore);
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

const setArrowDOM = () => {
  clearArrowDOM();
  roundDOM.innerHTML = `ROUND ${round}`;
  for (let i = 0; i < MAX_ARROW; i++) {
    const direction = Math.random() < 0.5 ? "left" : "right";
    const arrowDOM = makeDOMwithProperties("span", {
      className: `arrow arrow-${direction}`,
      innerHTML: direction === "left" ? "&lt;" : "&gt;",
    });
    arrowDOMList.push(arrowDOM);
    arrowFieldDOM.appendChild(arrowDOM);
  }
};

const setKeyboardEvent = () => {
  const handleCorrect = () => {
    arrowDOMList[currentIndex].style.display = "none";
    currentIndex++;
    if (currentIndex === MAX_ARROW) {
      if (round === MAX_ROUND) {
        handleSuccessGame();
        return;
      } else {
        currentIndex = 0;
        round++;
        setArrowDOM();
      }
    }
  };

  window.addEventListener("keydown", (e) => {
    if (!["ArrowLeft", "ArrowRight"].includes(e.code)) return;

    const isFirst = currentIndex === 0 && round === 1;

    if (isFirst) startTimer(handleFailedGame);
    const isLeft = arrowDOMList[currentIndex].innerHTML === "&lt;";
    if (isLeft && e.code === "ArrowLeft") {
      handleCorrect();
    }
    if (!isLeft && e.code === "ArrowRight") {
      handleCorrect();
    }
    if (!isLeft && e.code === "ArrowLeft") {
      handleFailedGame();
    }
    if (isLeft && e.code === "ArrowRight") {
      handleFailedGame();
    }
  });
};

const initialize = () => {
  const [headerRetryBtn, modalRetryBtn] =
    document.getElementsByClassName("retry-button");

  const initializeArrowGame = () => {
    stopTimer();
    currentIndex = 0;
    round = 1;
    setArrowDOM();
    setTimer(0);
  };

  headerRetryBtn.onclick = () => {
    handleModalClose(initializeArrowGame);
  };
  modalRetryBtn.onclick = () => {
    handleModalClose(initializeArrowGame);
  };
};

initialize();
setArrowDOM();
setKeyboardEvent();
