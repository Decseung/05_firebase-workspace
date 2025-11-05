import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPost } from "../../services/postService";
import PostItem from "../../components/post/PostItem";

function PostDetailPage() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const fetchPost = async () => {
      const fetchData = await getPost(id);
      setPost(fetchData);
      setLoading(false);
    };
    fetchPost();
  }, []);
  return (
    <div>
      <h2>게시글 상세</h2>
      <button
        onClick={() => {
          navigate("/posts");
        }}
      >
        목록으로
      </button>
      {loading ? <div>로딩중...</div> : <PostItem post={post} mode="detail" />}
    </div>
  );
}

export default PostDetailPage;
