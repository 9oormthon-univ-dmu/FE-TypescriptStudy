"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DarkMode() {
  let router = useRouter();

  const getCookieValue = (cookieName: string) => {
    const cookies = document.cookie.split("; ");
    for (const cookie of cookies) {
      const [name, value] = cookie.split("=");
      if (name == cookieName) return value;
    }
  };

  useEffect(() => {
    let mode = getCookieValue("mode");

    if (!mode) {
      document.cookie = `mode=light; max-age=${60 * 60 * 24 * 400}`;
    }
  }, []);

  const onClickHandler = () => {
    let mode = getCookieValue("mode");

    if (mode == "light") {
      document.cookie = `mode=dark; max-age=${60 * 60 * 24 * 400}`;
      router.refresh();
    } else {
      document.cookie = `mode=light; max-age=${60 * 60 * 24 * 400}`;
      router.refresh();
    }
  };

  return (
    <>
      <button onClick={onClickHandler}>🌙</button>
    </>
  );
}
