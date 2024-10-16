import { connectDB } from "@/utils/database";
import { ObjectId } from "mongodb";

import Comment from "@/components/Comment";
import { notFound } from "next/navigation";

export default async function Detail({
  params,
}: {
  params: { contentID: string };
}) {
  const contentID = params.contentID;

  let data;
  try {
    const db = (await connectDB).db("forum");

    data = await db
      .collection("post")
      .findOne({ _id: new ObjectId(contentID) });
  } catch (err) {
    console.error(err);
    return <div>DB error</div>;
  }

  if (!data) {
    return notFound();
  }

  return (
    <>
      <div>
        <h4>상세 페이지</h4>
        <h4>{data?.title}</h4>
        <p>{data?.content}</p>
        <Comment parentID={data._id.toString()} />
      </div>
    </>
  );
}
