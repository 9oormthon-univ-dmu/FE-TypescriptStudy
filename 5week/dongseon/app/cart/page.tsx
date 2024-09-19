import Link from "next/link";

export default function Cart() {
  return (
    <div>
      <h4>장바구니임</h4>
      <Link href="/cart/payment">결제하러 가기</Link>
    </div>
  );
}
