import clasess from "./newPost.module.css";

import { PostContext } from "../store/post-store";
import { useContext, useState } from "react";
import { postSliceActions } from "../store/postReduxStore";
import { useDispatch } from "react-redux";
import { usePostStoreZustand, useStore } from "../store/post-store-zustand";
import Modal from "../components/Modal";
import { Form, Link, redirect } from "react-router-dom";

export default function NewPost() {
  const [enteredBody, setEnteredBody] = useState("");
  const [enteredAuthor, setEnteredAuthor] = useState("");
  const addPost = usePostStoreZustand((state) => state.addPost);

  function handleTextAreaChange(event) {
    setEnteredBody(event.target.value);

    // dispatch(postSliceActions.addPost(event.target.value))
    // addPost(event.target.value)
    // postAdd(event.target.value)
    // bears(event.target.value)
  }

  function handleInputChange(event) {
    setEnteredAuthor(event.target.value);
  }

  function submitHandler(event) {
    event.preventDefault();

    const postData = {
      body: enteredBody,
      author: enteredAuthor,
    };

    // addPost(postData);

    onCancel();
  }

  // const { addPost } = useContext(PostContext)
  // const dispatch = useDispatch()
  // const postAdd = usePostStoreZustand((state) => state.addPost)
  // const bears = useStore((state) => state.updateBears)

  return (
    <Modal>
      <Form className={clasess.form} method="post" action="/new">
        <p>
          <label htmlFor="body">Text</label>
          <textarea
            onChange={handleTextAreaChange}
            id="body"
            required
            name="body"
            rows={3}
          ></textarea>
        </p>
        <p>
          <label htmlFor="author">Your Name</label>
          <input
            id="author"
            type="text"
            name="author"
            required
            onChange={handleInputChange}
          ></input>
        </p>
        <p className={clasess.actions}>
          <Link to=".." type="button">
            Cancel
          </Link>
          <button>Submit</button>
        </p>
      </Form>
    </Modal>
  );
}

export async function action({ params, request }) {
  const formData = await request.formData()
  const postData = Object.fromEntries(formData)
  
  await fetch("http://localhost:8080/posts", {
    method: "POST",
    body: JSON.stringify(postData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return redirect('/')
}
