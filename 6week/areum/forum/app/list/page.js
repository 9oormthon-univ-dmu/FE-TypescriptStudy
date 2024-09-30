import { connectDB } from "@/util/database";
import Link from "next/link";
import Button from "../components/Button";

export default async function List() {
    const db = (await connectDB).db("forum");
    let result = await db.collection("post").find().toArray();

    return (
        <div className="list-bg">
            {/* <Link href={"/write"}>글쓰기</Link> */}
            <Button label="글쓰기" newPost={true} />
            <Button label="뒤로가기" backBtn={true} />
            {result.map((a, i) => (
                <div className="list-item" key={i}>
                    <Link href={"/detail/" + result[i]._id}>
                        <h4>{result[i].title}</h4>
                    </Link>
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
