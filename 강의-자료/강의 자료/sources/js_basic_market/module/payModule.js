import { getCartInfo } from "./cartToggleBtn.js";
const delivery_Free_Price = 20000;
const delivery_Price = 3000;

const orignalPriceDOM = document.getElementById("original-price");
const discountPriceDOM = document.getElementById("discount-price");
const deliveryPriceDOM = document.getElementById("delivery-price");
const totalPriceDOM = document.getElementById("total-price");

export const setPayInfo = () => {
  const cartInfoList = getCartInfo();
  let deliveryPrice = 0;
  let totalPrice = 0;

  const { orignalPrice, discountPrice } = cartInfoList.reduce(
    (prev, curr) => ({
      orignalPrice: prev.orignalPrice + curr.orignalPrice,
      discountPrice: prev.discountPrice + (curr.orignalPrice - curr.price),
    }),
    {
      orignalPrice: 0,
      discountPrice: 0,
    }
  );

  console.log(orignalPrice);
  console.log(discountPrice);

  // cartInfoList.forEach((cartInfo) => {
  //   orignalPrice += cartInfo.orignalPrice;
  //   discountPrice += cartInfo.orignalPrice - cartInfo.price;

  // });

  const payPrice = orignalPrice - discountPrice;
  deliveryPrice = payPrice >= delivery_Free_Price ? 0 : delivery_Price;
  totalPrice = payPrice + deliveryPrice;

  orignalPriceDOM.innerHTML = `${orignalPrice.toLocaleString()}원`;
  discountPriceDOM.innerHTML = discountPrice
    ? `- ${discountPrice.toLocaleString()}원`
    : `0원`;
  deliveryPriceDOM.innerHTML = deliveryPrice
    ? `+ ${deliveryPrice.toLocaleString()}원`
    : `0원`;
  totalPriceDOM.innerHTML = `${totalPrice.toLocaleString()}원`;
};
