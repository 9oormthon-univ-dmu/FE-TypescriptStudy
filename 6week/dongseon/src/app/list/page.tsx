import { connectDB } from "@/utils/database";
import Link from "next/link";
import DetailLink from "./DetailLink";

export default async function List() {
  let data;

  try {
    // 서버 컴포넌트 안에서만 사용한다. (보안)
    const db = (await connectDB).db("forum");
    data = await db.collection("post").find().toArray();
  } catch (err) {
    console.error(err);
    return <div>DB error</div>;
  }

  return (
    <div className="list-bg">
      {data.map((d, key) => (
        <div className="list-item" key={key}>
          <Link href={`/detail/${d._id}`}>
            <h4>{d.title}</h4>
          </Link>
          <p>{d.content}</p>
          <DetailLink url={`/detail/${d._id}`} />
        </div>
      ))}
    </div>
  );
}