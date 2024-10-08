import { connectDB } from "@/utils/database";
import { ObjectId } from "mongodb";

type propsType = { params: { contentID: string } };

export default async function Edit(props: propsType) {
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
    <div className="p-20">
      <h4>글 수정</h4>
      <form action="/api/post/edit" method="POST">
        <input name="title" placeholder="글제목" defaultValue={data?.title} />
        <input
          name="content"
          placeholder="글내용"
          defaultValue={data?.content}
        />
        <input name="contentID" type="hidden" defaultValue={contentID} />
        <button type="submit">전송</button>
      </form>
    </div>
  );
}
