import { connectDB } from "@/util/database";
import Button from "./components/Button";

export default async function Home() {
    const db = (await connectDB).db("forum");
    let result = await db.collection("post").find().toArray();
    console.log(result);

    return (
        <>
            <h1>Home</h1>
            <Button label="글 목록" listBtn={true} />
        </>
    );
}
