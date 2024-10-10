"use client";
import { useEffect, useRef, useState } from "react";

type Comment = {
  author: string;
  content: string;
  parentID: string;
  _id: string;
};

export default function Comment({ parentID }: { parentID: string }) {
  const commentInput = useRef<HTMLInputElement>(null);
  const [comment, setComment] = useState("");
  const [commentList, setCommentList] = useState<Comment[]>([]);

  const submit = async () => {
    await fetch("/api/comment/new", {
      method: "POST",
      body: JSON.stringify({ comment: comment, parentID: parentID }),
    }).then(() => {
      fetchData();
    });

    if (commentInput.current) {
      commentInput.current.value = "";
    }
  };

  const fetchData = async () => {
    await fetch(`/api/comment/list?id=${parentID}`)
      .then((r) => r.json())
      .then((result) => {
        setCommentList(result);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <hr />
      <h4>댓글</h4>
      <div className="comment-list">
        {commentList.length > 0 &&
          commentList.map((c, key) => (
            <div className="comment" key={key}>
              <h6>{c.author}</h6>
              <h5>{c.content}</h5>
            </div>
          ))}
      </div>
      <hr />
      <input
        onChange={(e) => {
          setComment(e.target.value);
        }}
        ref={commentInput}
      />
      <button
        onClick={() => {
          submit();
        }}
      >
        댓글 전송
      </button>
    </div>
  );
}
