import React from "react";
import PostForm from "../../components/post/PostForm";

function PostRegistPage() {
  return (
    <div>
      <h2>게시글 등록</h2>
      <PostForm mode="create" />
    </div>
  );
}

export default PostRegistPage;
