"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DarkMode() {
  let router = useRouter();
  let [emoji, setEmoji] = useState("🌙");

  useEffect(() => {
    let cookieValue = ("; " + document.cookie)
      .split(`; mode=`)
      .pop()
      .split(";")[0];
    if (cookieValue === "") {
      document.cookie = "mode=light; max-age=" + 3600 * 24 * 400 + "; path=/; SameSite=Lax";
    } else {
      setEmoji(cookieValue === "light" ? "☀️" : "🌙");
    }
  }, []);

  const toggleDarkMode = () => {
    let cookieValue = ("; " + document.cookie)
      .split(`; mode=`)
      .pop()
      .split(";")[0];
    if (cookieValue === "light") {
      document.cookie = "mode=dark; max-age=" + 3600 * 24 * 400 + "; path=/; SameSite=Lax";
      setEmoji("🌙");
    } else {
      document.cookie = "mode=light; max-age=" + 3600 * 24 * 400 + "; path=/; SameSite=Lax";
      setEmoji("☀️");
    }
    router.refresh(); // 상태 변경 후 페이지 새로 고침
  };

  return (
    <span onClick={toggleDarkMode}>
      {emoji}
    </span>
  );
}
