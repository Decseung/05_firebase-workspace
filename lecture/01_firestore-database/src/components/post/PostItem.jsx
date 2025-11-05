import React from "react";
import { useNavigate } from "react-router-dom";
import { deletePost } from "../../services/postService";

// 한 게시글 정보를 표현하는 컴포넌트
/*
  props 정의
  {
    post: {
      id: string,
      title: string,
      content: string,
      createdAt: TimeStamp
    }
    mode: string // 'list' | 'detail'
  }
*/
function PostItem({ post, mode }) {
  const navigate = useNavigate();

  const handelPostClick = () => {
    console.log(post.id);
    if (mode === "list") {
      // /posts/해당게시글ID
      navigate(`/posts/${post.id}`);
    }
  };

  const handlePostDeleteClick = async () => {
    if (confirm("정말 삭제")) {
      await deletePost(post.id);
    }
  };

  return (
    <div
      style={{
        border: "1px solid black",
        margin: "10px",
        padding: "10px",
        cursor: mode === "list" ? "pointer" : "default",
      }}
      onClick={handelPostClick}
    >
      {post.title}
      {mode === "list" && `(${post.createdAt.toDate().toLocaleString()})`}
      {mode === "detail" && (
        <>
          <p>{post.content}</p>
          <button>수정</button>
          <button onClick={handlePostDeleteClick}>삭제</button>
        </>
      )}
    </div>
  );
}

export default PostItem;
