"use client";

import Link from "next/link";

export default function ListItem({ result }) {
    return (
        <div>
            {result.map((a, i) => (
                <div className="list-item" key={i}>
                    <Link href={"/detail/" + result[i]._id}>
                        <h4>{result[i].title}</h4>
                    </Link>
                    <Link href={"/edit/" + result[i]._id} className="list-btn">
                        ✏️
                    </Link>
                    <button
                        className="list-btn"
                        onClick={(e) => {
                            fetch(`/api/delete/${a._id}`, { method: "DELETE" }).then((response) => {
                                if (response.ok) {
                                    e.target.parentElement.style.opacity = 0;
                                    setTimeout(() => {
                                        e.target.parentElement.style.display = "none";
                                    }, 1000);
                                } else {
                                    return response.json().then((data) => {
                                        alert(data.message);
                                    });
                                }
                            });
                        }}
                    >
                        🗑️
                    </button>
                    <p>
                        {new Date(result[i].date).toLocaleDateString("ko-KR", {
                            month: "long",
                            day: "numeric",
                        })}
                    </p>
                </div>
            ))}
        </div>
    );
}
