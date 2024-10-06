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
                            // fetch("/api/post/delete", { method: "DELETE", body: result[i]._id }).then(() => {
                            //     e.target.parentElement.style.opacity = 0;
                            //     setTimeout(() => {
                            //         e.target.parentElement.style.display = "none";
                            //     }, 1000);
                            // });
                            fetch(`/api/delete/${result[i]._id}`, { method: "DELETE" }).then(() => {
                                e.target.parentElement.style.opacity = 0;
                                setTimeout(() => {
                                    e.target.parentElement.style.display = "none";
                                }, 1000);
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
