"use client";

import { useState } from "react";
import { products } from "./../cart/data";

export default function List() {
  let [count, setCount] = useState([0, 0, 0]);
  return (
    <div>
      <h3 className="title">상품목록</h3>
      <div>
        {products.map((product, i) => {
          return (
            <div className="food" key={i}>
              <div>
                <img src={`food${i}.png`} className="food-img" alt="food" />
                <div>{`${product} $40`}</div>
              </div>
              <div className="add-food">
                <span> {count[i]} </span>
                <button
                  onClick={() => {
                    let copyCount = [...count];
                    copyCount[i]++;
                    setCount(copyCount);
                  }}
                >
                  +
                </button>
                <button
                  onClick={() => {
                    if (count[i] > 0) {
                      let copyCount = [...count];
                      copyCount[i]--;
                      setCount(copyCount);
                    }
                  }}
                >
                  -
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
