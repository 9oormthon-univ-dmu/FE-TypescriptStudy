"use client";

import Link from "next/link";
import ButtonLink from "@/components/ButtonLink";
import { useState } from "react";

// ObjectId는 React 컴포넌트에 prop으로 전달할 수 없기 때문에 문자열로 변환
type propsType = {
  data: {
    _id: string;
    title: string;
    content: string;
  };
};

export default function ListItem({ data }: propsType) {
  // ListItem을 숨기기 위해 isVisible에 "deleted-content"를 담아 div className에 전달한다.
  const [isVisible, setIsvisible] = useState<string>("");

  return (
    <div className={`list-item ${isVisible}`}>
      <Link href={`/detail/${data._id}`}>
        <h4>{data.title}</h4>
      </Link>
      <p>{data.content}</p>
      <span>
        <ButtonLink url={`/detail/${data._id}`} label="더보기" />
        <ButtonLink url={`/edit/${data._id}`} label="✏️수정하기" />
        <button
          onClick={() => {
            // query string을 사용하거나 path param을 [파일 이름].ts 로 받아와 쓸 수도 있다.
            /*
            query string 예시 -> useRouter를 사용해서 받아옴
            fetch(`/api/post/delete?content-id=${data._id}`, {
              method: "DELETE",
            });

            path param 예시 -> [파일 이름].ts를 사용해서 req.query로 받아옴
            fetch(`/api/post/delete/${data._id}`, {
              method: "DELETE",
            });
            */

            // ajax로 요청 시 새로고침이 발생하지 않는다.
            // headers를 설정해줘야 json 데이터를 인식하고 자동으로 파싱한다.
            // body 값은 json으려 변환해서 전송한다.
            fetch("/api/post/delete", {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ contentID: data._id.toString() }),
            })
              .then((res) => {
                if (res.status == 200) {
                  // ajax 요청 전송을 성공했을 경우
                  console.log("delete done");
                  // ListItem을 숨긴다. 리액트 쓰면서 누가 DOM 건드나?
                  setIsvisible("deleted-content");
                } else {
                  // 서버에서 에러 코드를 전송하는 경우
                  console.log("server error");
                }
              })
              .catch((err) => {
                // ajax 요청에 문제가 발생할 경우 (ex 인터넷 문제)
                console.log(err);
              });
          }}
        >
          🗑️삭제하기
        </button>
      </span>
    </div>
  );
}
