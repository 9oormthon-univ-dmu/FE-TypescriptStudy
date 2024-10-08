import { connectDB } from "@/utils/database";
import { ObjectId } from "mongodb";

type propsType = { params: { contentID: string } };

export default async function Detail(props: propsType) {
  const contentID = props.params.contentID;

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
    return <div>notfound contentID : {contentID}</div>;
  }

  return (
    <>
      <div>
        <h4>상세 페이지</h4>
        <h4>{data?.title}</h4>
        <p>{data?.content}</p>
      </div>
    </>
  );
}
