"use client";

import { useRouter } from "next/navigation";

type paramType = {
  url: string;
};

export default function DetailLink({ url }: paramType) {
  let router = useRouter();
  return (
    <button
      onClick={() => {
        router.push(url);
      }}
    >
      더보기
    </button>
  );
}
