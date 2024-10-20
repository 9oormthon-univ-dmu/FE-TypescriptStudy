import { connectDB } from "@/util/database";
import styles from "./page.module.css";

export default async function Home() {

   const db = (await connectDB).db('forum');
   let result = await  db.collection('post').find().toArray();

  return (
    <div className={styles.page}>
    </div>
  );
}
