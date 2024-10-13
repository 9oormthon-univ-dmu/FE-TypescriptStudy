import Button from "@/app/components/Button";
import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import Comment from "./Comment";

export default async function Detail(props) {
    const db = (await connectDB).db("forum");
    let result = await db.collection("post").findOne({ _id: new ObjectId(props.params.id) });

    return (
        <div>
            <h4>상세페이지</h4>
            <h4>{result.title}</h4>
            <p>{result.content}</p>
            <Button label="뒤로가기" backBtn={true} />
            <Comment _id={result._id.toString()} />
        </div>
    );
}
