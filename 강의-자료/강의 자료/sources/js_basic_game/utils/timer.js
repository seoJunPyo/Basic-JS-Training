const timerDOM = document.getElementsByClassName("game-time")[0];
const MAX_TIME = 10;
let time = 0;
let timerId = null;

export let isGameStart = false;

const covertToTwoNumber = (n) => {
  const stringNum = String(n);

  if (stringNum.length === 1) {
    return `0${stringNum}`;
  } else {
    return `${stringNum}`;
  }
};

export const getTimeString = (time) => {
  const hour = Math.floor(time / 3600);
  time = time - hour * 3600;
  const minute = Math.floor(time / 60);
  time = time - minute * 60;
  const second = time;

  return `${covertToTwoNumber(hour)}:${covertToTwoNumber(
    minute
  )}:${covertToTwoNumber(second)}`;
};

export const startTimer = (onTimeOver) => {
  isGameStart = true;
  timerId = setInterval(() => {
    time++;
    timerDOM.innerHTML = getTimeString(time);

    if (MAX_TIME < time) {
      onTimeOver?.();
      clearInterval(timerId);
    }
  }, 1000);
};

export const stopTimer = () => {
  isGameStart = false;
  if (timerId === null) return;
  clearInterval(timerId);
};

export const setTimer = (iniTime) => {
  time = iniTime;
  timerDOM.innerHTML = getTimeString(time);
};

export const getResultTimeString = () => {
  return getTimeString(time);
};

export const getNowTime = () => {
  return time;
};
