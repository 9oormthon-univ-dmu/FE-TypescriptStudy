import Link from "next/link";

export default async function Home() {
  return (
    <div className="home">
      <h4>Home</h4>
      <Link href={"/list"}>List</Link>
      <Link href={"/write"}>Write</Link>
    </div>
  );
}
