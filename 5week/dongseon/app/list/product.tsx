"use client";

import Image from "next/image";
import { ProductType } from "../types";
import { useState } from "react";

export default function Product({ product }: { product: ProductType }) {
  const [amount, setAmount] = useState<number>(1);
  return (
    <div className="product">
      <Image
        src={product.image}
        alt="image"
        className="productImage"
        width={1000}
        height={1000}
      />
      <div>
        {product.name} ${product.price}
      </div>
      <div className="productAmount">
        <button
          onClick={() => {
            setAmount((cur) => {
              if (cur > 0) {
                return (cur -= 1);
              }
              return cur;
            });
          }}
        >
          -
        </button>
        <div>{amount}</div>
        <button
          onClick={() => {
            setAmount((cur) => {
              return (cur += 1);
            });
          }}
        >
          +
        </button>
      </div>
    </div>
  );
}
