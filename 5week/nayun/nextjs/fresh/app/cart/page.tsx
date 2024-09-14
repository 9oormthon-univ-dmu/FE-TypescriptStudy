import React from "react";

export default function Cart() {
  return (
    <div>
      <CartItem />
      <CartItem />
      <Btn color="blue" />
    </div>
  );
}

function CartItem() {
  return (
    <div className="cart-item">
      <p>상품명</p>
      <p>$40</p>
      <p>1개</p>
    </div>
  );
}

type BtnProps = {
  color: string;
};

function Btn(props: BtnProps) {
  return <button style={{ background: props.color, color: "white" }}>버튼임</button>;
}
