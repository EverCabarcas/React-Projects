import { useContext, useEffect, useState } from "react";
import NewPost from "../routes/NewPost";
import Post from "./Post";
import classess from "./PostList.module.css";
import { PostContext } from "../store/post-store";
import { useSelector } from "react-redux";
import { usePostStoreZustand, useStore } from "../store/post-store-zustand";
import { useQuery } from "react-query";
import Modal from "./Modal";
import { useLoaderData } from "react-router-dom";

export default function PostList() {
  // const { posts } = useContext(PostContext)
  // console.log(posts.length)
  // const postList = useSelector((state)=> state.post.posts)
  // const otherList = useSelector((state) => state.other.other)
  // const postsData = usePostStoreZustand((state) => state.posts);
  // const setAllPost = usePostStoreZustand((state) => state.setAllPost);
  // const isFetching = usePostStoreZustand((state) => state.isFetching);
  // const setIsFetching = usePostStoreZustand((state) => state.setIsFetching);

  const PostListData = useLoaderData()

  // useEffect(() => {
  //   async function fetchPost() {
  //     setIsFetching(true);
  //     const postData = await fetch("http://localhost:8080/posts");
  //     const { posts } = await postData.json();
  //     setAllPost(posts);
  //     setIsFetching(false);
  //   }
  //   fetchPost();
  // }, []);
  // const bears = useStore((state) => state.bears)

  // const {data} = useQuery({
  //   queryKey: "test",
  //   queryFn: async () => {
  //     const data = await fetch("https://pokeapi.co/api/v2/pokemon-species/aegislash");
  //     const response = await data.json()
  //     return response
  //   },
  // });

  // let content;
  // if (isFetching) {
  //   content = (
  //     <div style={{ textAlign: "center", color: "white" }}>
  //       <p>Loading posts...</p>
  //     </div>
  //   );
  // } else {
  //   content = (
  //     <>
        
  //     </>
  //   );
  // }

  return (
    <>
      {PostListData.length >= 0 && (
          <ul className={classess.posts}>
            {PostListData.map((post) => {
              return (
                <Post id={post.id} key={post.author} author={post.author} body={post.body} />
              );
            })}
          </ul>
        )}
        {PostListData.length === 0 && (
          <div style={{ textAlign: "center", color: "white" }}>
            <h2>There are no posts yet.</h2>
            <p>Start adding some!</p>
          </div>
        )}
    </>
  );
}
