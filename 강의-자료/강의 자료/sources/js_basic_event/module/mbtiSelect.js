const mbtiQuestionList = [
  "짠 과자가 단 과자보다 좋다",
  "봉지 과자가 박스과자 보다 좋다",
  "과자를 뜯으면 한번에 다 먹는다",
];

const getMbtiResult = (resultValue) => {
  switch (resultValue) {
    case 0:
      return {
        title: "A유형",
        desc: "과린이과린이과린이과린이과린이과린이과린이",
      };
    case 1:
      return {
        title: "B유형",
        desc: "과초자과초자과초자과초자과초자과초자과초자",
      };
    case 2:
      return {
        title: "C유형",
        desc: "과중자과중자과중자과중자과중자과중자과중자",
      };
    case 3:
      return {
        title: "D유형",
        desc: "과고자과고자과고자과고자과고자과고자과고자",
      };
  }
};

const mbtiQuestionDOM = document.getElementsByClassName("mbti-question")[0];
const [yesBtn, noBtn] =
  document.getElementsByClassName("mbti-select")[0].children;
const [selectDOM, pendingDOM, resultDOM] =
  document.getElementsByClassName("mbti-container");
const mbtiResultTitleDOM = document.getElementsByClassName("mbti-result")[0];
const mbtiDescTitleDOM = document.getElementsByClassName("mbti-description")[0];
const mbtiRetryBtn = document.getElementsByClassName("mbti-retry-button")[0];

let currentRound = 0;
let resultValue = 0;
const maxRound = mbtiQuestionList.length;

const setPendingSection = () => {
  pendingDOM.style.display = "block";
  selectDOM.style.display = "none";

  setTimeout(() => {
    pendingDOM.style.display = "none";
    resultDOM.style.display = "block";
  }, 3000);
};

const initialize = () => {
  currentRound = 0;
  resultValue = 0;

  setMbtiSection();
  resultDOM.style.display = "none";
  selectDOM.style.display = "block";
};

const setResultSection = () => {
  const { title, desc } = getMbtiResult(resultValue);
  mbtiResultTitleDOM.innerHTML = title;
  mbtiDescTitleDOM.innerHTML = desc;
  console.log(resultValue);

  mbtiRetryBtn.onclick = () => {
    initialize();
  };
};

export const setMbtiSection = () => {
  if (currentRound === maxRound) {
    setPendingSection();
    setResultSection();
    return;
  }

  selectDOM.style.display = "block";

  mbtiQuestionDOM.innerHTML = mbtiQuestionList[currentRound++];
  yesBtn.onclick = () => {
    resultValue++;
    setMbtiSection();
  };
  noBtn.onclick = () => {
    setMbtiSection();
  };
};
