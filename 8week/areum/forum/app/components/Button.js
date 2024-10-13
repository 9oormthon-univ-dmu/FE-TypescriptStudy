"use client";

import { useRouter } from "next/navigation";

export default function Button({ label, backBtn = false, newPost = false, listBtn = false }) {
    const router = useRouter();

    const handleClick = () => {
        if (backBtn) {
            router.back();
        } else if (newPost) {
            router.push("/write");
        } else if (listBtn) {
            router.push("/list");
        }
    };

    return (
        <button onClick={handleClick} style={{ marginLeft: "5px", marginBottom: "10px" }}>
            {label}
        </button>
    );
}
