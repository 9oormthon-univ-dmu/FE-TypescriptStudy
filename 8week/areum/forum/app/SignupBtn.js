"use client";

import { useRouter } from "next/navigation";

export default function SignupBtn() {
    const router = useRouter();

    return (
        <button
            onClick={() => {
                router.push("/register");
            }}
            style={{ marginLeft: "5px" }}
        >
            회원가입
        </button>
    );
}
