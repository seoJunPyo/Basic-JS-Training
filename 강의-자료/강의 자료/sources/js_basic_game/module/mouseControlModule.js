import { MOUSE_CONTROL_SCORE_KEY } from "../constants/localStorage.js";
import { makeDOMwithProperties } from "../utils/dom.js";
import { handleModalOpne } from "../utils/modal.js";
import {
  getNowTime,
  getResultTimeString,
  isGameStart,
  setTimer,
  startTimer,
  stopTimer,
} from "../utils/timer.js";

let boxDOMList = [];
let wallBoxDOM = [];
let startBoxDOM = null;
let endBoxDOM = null;

const gameFieldDOM = document.getElementById("game-field");

export const initMouseControlGame = () => {
  startBoxDOM.innerHTML = "Start";
  endBoxDOM.innerHTML = "End";
  boxDOMList.forEach((boxDOM) => {
    boxDOM.style.backgroundColor = "transparent";
  });
  stopTimer();
  setTimer(0);
};

const handleGameFail = () => {
  stopTimer();
  handleModalOpne({
    isSuccess: false,
    timeString: "",
  });
  setTimer(0);
};

const handleGameSucess = () => {
  stopTimer();
  handleModalOpne({
    isSuccess: true,
    timeString: getResultTimeString(),
  });
  const nowScore = getNowTime();
  const currentScore = localStorage.getItem(MOUSE_CONTROL_SCORE_KEY);

  if (!currentScore || currentScore > nowScore) {
    localStorage.setItem(MOUSE_CONTROL_SCORE_KEY, nowScore);
  }
  setTimer(0);
};

export const setBoxDOM = ({ row, col, start, end, walls }) => {
  const controlBoxContainer = makeDOMwithProperties("div", {
    id: "control-box-container",
    onmouseleave: () => {
      if (!isGameStart) return;
      handleGameFail();
    },
  });

  controlBoxContainer.style.display = "grid";
  controlBoxContainer.style.gridTemplateRows = `repeat(${row}, 1fr)`;
  controlBoxContainer.style.gridTemplateColumns = `repeat(${col}, 1fr)`;

  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      const {
        type,
        className,
        innerHTML = "",
        onmouseover,
      } = (function () {
        if (i === start[0] && j === start[1]) {
          return {
            type: "start",
            className: "control-box start",
            innerHTML: "Start",
            onmouseover: (e) => {
              startTimer(handleGameFail);

              e.target.innerHTML = "";
            },
          };
        }
        if (i === end[0] && j === end[1]) {
          return {
            type: "end",
            className: "control-box end",
            innerHTML: "End",
            onmouseover: (e) => {
              if (!isGameStart) return;
              e.target.innerHTML = "";
              handleGameSucess();
            },
          };
        }
        for (let wall of walls) {
          if (i === wall[0] && j === wall[1]) {
            return {
              type: "wall",
              className: "control-box wall",
              onmouseover: () => {
                if (!isGameStart) return;
                handleGameFail();
              },
            };
          }
        }
        return {
          type: "normal",
          className: "control-box",
          onmouseover: (e) => {
            if (!isGameStart) return;
            e.target.style.backgroundColor = "linen";
          },
        };
      })();
      const boxDOM = makeDOMwithProperties("div", {
        className,
        innerHTML,
        id: `box-${i}-${j}`,
        onmouseover,
      });

      switch (type) {
        case "start":
          startBoxDOM = boxDOM;
          break;
        case "end":
          endBoxDOM = boxDOM;
          break;
        case "wall":
          wallBoxDOM.push(boxDOM);
          break;
        default:
          boxDOMList.push(boxDOM);
      }
      controlBoxContainer.appendChild(boxDOM);
    }
  }
  gameFieldDOM.appendChild(controlBoxContainer);
};
