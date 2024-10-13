"use client";

import { getServerSession } from "next-auth";
import { useState, useEffect } from "react";

export default function Comment(props) {
    let [comment, setComment] = useState("");
    let [userName, setUserName] = useState("");
    let [data, setData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        await fetch("/api/comment/list?id=" + props._id)
            .then((r) => r.json())
            .then((result) => {
                setData(result);
            });
    };

    return (
        <div>
            <hr />
            {data.length > 0 ? (
                data.map((a, i) => (
                    <div key={i}>
                        <p>
                            {a.author_name} : {a.content}
                        </p>
                    </div>
                ))
            ) : (
                <p>댓글이 없습니다.</p>
            )}
            <input
                onChange={(e) => {
                    setComment(e.target.value);
                }}
            />
            <button
                onClick={() => {
                    fetch("/api/comment/new", {
                        method: "POST",
                        body: JSON.stringify({ comment: comment, _id: props._id }),
                    }).then(() => {
                        fetchData();
                    });
                }}
            >
                전송
            </button>
        </div>
    );
}
