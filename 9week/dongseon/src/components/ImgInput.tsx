"use client";

import { useState } from "react";

export default function ImgInput() {
  const [imageURL, setImageURL] = useState<string | null>();

  const imageChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    if (file) {
      let image = window.URL.createObjectURL(file);
      setImageURL(image);
    }
  };

  return (
    <>
      <h5>createObjectURL</h5>
      <input type="file" accept="image/*" onChange={imageChangeHandler} />
      {imageURL && <img src={imageURL} />}

      <hr />

      <h5>Presigned URL</h5>
      <input
        type="file"
        accept="image/*"
        onChange={async (e: React.ChangeEvent<HTMLInputElement>) => {
          if (!e.target.files) return;

          let file = e.target.files[0];
          let filename = encodeURIComponent(file.name);

          let result = await fetch(`/api/post/image?file=${filename}`);
          let jsonResult = await result.json();

          // S3 업로드 폼 생성
          const formData = new FormData();
          Object.entries({ ...jsonResult.fields, file }).forEach(
            ([key, value]) => {
              formData.append(key, value as string);
            }
          );

          // S3 업로드 결과
          let uploadResult = await fetch(jsonResult.url, {
            method: "POST",
            body: formData,
          });
          if (uploadResult.ok) {
            setImageURL(uploadResult.url + "/" + filename);
          } else {
            console.log("이미지 불러오기 실패");
          }
        }}
      />
      {imageURL && <img src={imageURL} />}
    </>
  );
}
