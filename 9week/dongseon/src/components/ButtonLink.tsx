"use client";

import { useRouter } from "next/navigation";

type paramType = {
  url: string;
  label: string;
};

export default function ButtonLink({ url, label }: paramType) {
  let router = useRouter();
  return (
    <button
      onClick={() => {
        router.push(url);
      }}
    >
      {label}
    </button>
  );
}
