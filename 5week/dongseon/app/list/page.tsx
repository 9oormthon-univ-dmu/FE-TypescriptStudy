import { ProductType } from "../types";
import Product from "./product";

export default function List() {
  let productList: ProductType[] = [
    { name: "상품1", price: 50, image: "/food0.png" },
    { name: "상품2", price: 30, image: "/food1.png" },
    { name: "상품3", price: 70, image: "/food2.png" },
  ];

  return (
    <div className="productList">
      <h4>상품 목록임</h4>
      {productList.map((product, i) => (
        <Product product={product} key={i} />
      ))}
    </div>
  );
}
