"use client";

import { useEffect, useState } from "react";

export default function Comment(props) {
  console.log("id : " + props._id);
  useEffect(() => {
    fetch("/api/comment/list?id=" + props._id)
      .then((r) => r.json())
      .then((result) => {
        console.log("값" + result);
        setData(result);
        setComment("");
      });
  }, []);
  let [comment, setComment] = useState("");
  let [data, setData] = useState([]);
  return (
    <div>
      <div>
        <b>댓글 목록</b>
      </div>
      {data.length > 0
        ? data.map((a, i) => {
            return (
              <p className="comment-box" key={i}>
                {a.name + ' : ' + a.content}
              </p>
            );
          })
        : "댓글 없음"}
      <input
        value={comment}
        onChange={(e) => {
          console.log("입력값:", e.target.value);
          setComment(e.target.value);
        }}
      />
      <button
        onClick={(e) =>
          fetch("/api/comment/new", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ comment: comment, _id: props._id }),
          })
        }
      >
        댓글전송
      </button>
    </div>
  );
}
