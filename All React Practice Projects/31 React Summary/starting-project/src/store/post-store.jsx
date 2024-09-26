import { createContext, useState } from "react";

export const PostContext = createContext({
  posts: [],
  addPost: () => {},
});

export default function PostProvider({ children }) {
  const [postList, setPostList] = useState([]);

  function addPost(postItem) {
    setPostList(postItem);
  }

  const postCtx = {
    posts: postList,
    addPost: addPost,
  };

  return <PostContext.Provider value={postCtx}>{children}</PostContext.Provider>;
}
