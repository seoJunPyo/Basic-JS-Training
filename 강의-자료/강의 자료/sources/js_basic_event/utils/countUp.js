export const countUp = (dom, target, second, term = 15) => {
  if (
    !dom ||
    isNaN(Number(target)) ||
    isNaN(Number(second)) ||
    isNaN(Number(term))
  ) {
    return;
  }
  let nowNumboer = 0;
  const countTerm = Math.floor(target / second / (1000 / term));
  const timerId = setInterval(() => {
    if (nowNumboer >= target) {
      nowNumboer = target;
      clearInterval(timerId);
      return;
    }
    nowNumboer += countTerm;
    dom.innerHTML = `${nowNumboer.toLocaleString()}명`;
  }, term);
};
