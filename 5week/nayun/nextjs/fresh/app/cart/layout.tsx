import React from "react";

type CartLayoutProps = {
  children: React.ReactNode;
};

export default function CartLayout({ children }: CartLayoutProps) {
  return (
    <div>
      <div>
        <h3>현대카드 무이자 이벤트 중</h3>
      </div>
      {children}
    </div>
  );
}
