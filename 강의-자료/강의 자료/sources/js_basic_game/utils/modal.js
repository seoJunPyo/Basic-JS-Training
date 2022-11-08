const modalDOM = document.getElementsByClassName("modal")[0];
const modalTitleDOM = document.getElementsByClassName("modal-title")[0];
const modalDescDOM = document.getElementsByClassName("modal-description")[0];

export const handleModalOpne = ({ isSuccess, timeString }) => {
  modalDOM.classList.add("open");
  if (isSuccess) {
    modalTitleDOM.innerHTML = "성공";
    modalDescDOM.innerHTML = `${timeString}만에 성공했습니다.`;
  } else if (!isSuccess) {
    modalTitleDOM.innerHTML = "실패";
    modalDescDOM.innerHTML = `다시 시도해보세요.`;
  }
};
export const handleModalClose = (onModalClose) => {
  modalDOM.classList.remove("open");
  onModalClose?.();
};
