import { connectDB } from "@/util/database";
import Link from "next/link";
import Button from "../components/Button";
import ListItem from "./ListItem";

export const dynamic = "force-dynamic";

export default async function List() {
    const db = (await connectDB).db("forum");
    let result = await db.collection("post").find().toArray();

    result.forEach((item) => (item._id = item._id.toString()));

    return (
        <div className="list-bg">
            {/* <Link href={"/write"}>글쓰기</Link> */}
            <Button label="글쓰기" newPost={true} />
            <Button label="뒤로가기" backBtn={true} />
            <ListItem result={result} />
        </div>
    );
}
