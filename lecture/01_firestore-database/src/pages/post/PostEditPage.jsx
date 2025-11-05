import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostForm from "../../components/post/PostForm";
import { getPost } from "../../services/postService";

function PostEditPage() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState();

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      const post = await getPost(id);
      setPost(post);
      setLoading(false);
    };
    fetchPost();
  }, []);

  return (
    <div>
      <h2>게시글 수정</h2>
      {loading ? (
        <div>로딩중...</div>
      ) : (
        <PostForm mode="edit" initialData={post} />
      )}
    </div>
  );
}

export default PostEditPage;
