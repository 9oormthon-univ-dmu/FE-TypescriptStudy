import { connectDB } from "@/util/database";
import Link from "next/link";
import DetailLink from "../detailLink/page";

export default async function List() {
  const db = (await connectDB).db("forum");
  let result = await db.collection("post").find().toArray();
  return (
    <div className="list-bg">
      {result.map((item) => (
        <div className="list-item">
          <Link prefetch={false} href={`/detail/${item._id}`}>
            <h4>{item.title}</h4>
          </Link>
          <DetailLink></DetailLink>
          <p>{item.content}</p>
        </div>
      ))}
    </div>
  );
}
