import { Link, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import PostListPage from "./pages/post/PostListPage";
import PostDetailPage from "./pages/post/PostDetailPage";
import PostRegistPage from "./pages/post/PostRegistPage";
import PostEditPage from "./pages/post/PostEditPage";

function App() {
  return (
    <>
      <nav>
        <Link to="/">홈</Link> | <Link to="/posts">게시글 목록</Link>
      </nav>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/posts" element={<PostListPage />} />
        <Route path="/posts/:id" element={<PostDetailPage />} />
        <Route path="/posts/new" element={<PostRegistPage />} />
        <Route path="/posts/:id/edit" element={<PostEditPage />} />
      </Routes>
    </>
  );
}

export default App;
