import React, { useEffect, useState } from "react";
import PostItem from "../../components/post/PostItem";
import { getPosts } from "../../services/postService";
import { useNavigate } from "react-router-dom";

function PostListPage() {
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const posts = await getPosts();
      setPosts(posts);
      setLoading(false);
    };
    fetchPosts();
  }, []);
  return (
    <div>
      <h2>게시글 목록</h2>
      <button onClick={() => navigate("/posts/new")}>게시글 등록</button>
      <div>
        {loading ? (
          <div>로딩중...</div>
        ) : (
          posts.map((post) => {
            return <PostItem key={post.id} post={post} mode="list" />;
          })
        )}
      </div>
    </div>
  );
}

export default PostListPage;
