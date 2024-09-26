import { QueryClient, QueryClientProvider } from "react-query";
import PostList from "../components/PostList";
import PostProvider from "../store/post-store";
import { Outlet } from "react-router-dom";
const queryClient = new QueryClient();

function Posts() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <PostProvider>
          <Outlet />
          <main>
            <PostList />
          </main>
        </PostProvider>
      </QueryClientProvider>
    </>
  );
}

export default Posts;

export async function loader() {
  const postData = await fetch("http://localhost:8080/posts");
  const { posts } = await postData.json();
  return posts;
}
