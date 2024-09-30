import Button from "../components/Button";

export default function Write() {
    return (
        <div className="p-20">
            <h4>글작성</h4>
            <Button label="뒤로가기" backBtn={true} />
            <form action="/api/post/new" method="POST">
                <input name="title" placeholder="제목" />
                <input name="content" placeholder="내용" />
                <button type="submit">완료</button>
            </form>
        </div>
    );
}
