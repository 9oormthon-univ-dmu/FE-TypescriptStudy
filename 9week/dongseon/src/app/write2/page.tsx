"use client";
import handleSubmit from "./actions";
export default async function Write2() {
  return (
    <div>
      {/* 서버 함수 등록 */}
      <form action={handleSubmit}>
        <input name="title"></input>
        <button type="submit">등록</button>
      </form>
    </div>
  );
}
