"use client";

import { useState } from "react";


export default async function Write() {
  let [src, setSrc] = useState("");
  return (
    <div className="p-20">
      <h4>글 작성</h4>
      <form action="/api/post/new" method="POST">
        <input name="title" placeholder="글제목" />
        <input name="content" placeholder="글내용" />
        <input
          type="file"
          accept="image/*"
          onChange={() => {
            async () => {
              let file = e.target.files[0];
              let filename = encodeURIComponent(file.name);
              await fetch("/api/post/image?=file=" + filename);
              res = await res.json();
              //S3 업로드
              const formData = new FormData();
              Object.entries({ ...res.fields, file }).forEach(
                ([key, value]) => {
                  formData.append(key, value);
                }
              );
              let 업로드결과 = await fetch(res.url, {
                method: "POST",
                body: formData,
              });
              setSrc(업로드결과.url + '/' + filename)

              if (업로드결과.ok) {
                setSrc(업로드결과.url + "/" + filename);
              } else {
                console.log("실패");
              }
            };
          }}
        ></input>
        <img src={src}></img>
        <button type="submit">전송</button>
      </form>
    </div>
  );
}
