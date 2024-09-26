import React from "react";
import ReactDOM from "react-dom/client";
import Posts from "./routes/Posts";
import "./index.css";
import { Provider } from "react-redux";
import { postStore } from "./store/postReduxStore";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainHeader from "./components/MainHeader";
import RootLayout from "./routes/RootLayout";
import NewPost from "./routes/NewPost";
import PostDetails from "./components/PostDetails";
import { loader as PostLoader } from "./routes/Posts";
import { action as NewPostAction } from "./routes/NewPost";
import { loader as PostDetailsLoader } from "./components/PostDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <Posts />,
        loader: PostLoader,
        children: [
          {
            path: "new",
            element: <NewPost />,
            action: NewPostAction,
          },
          {
            path: '/:id',
            element: <PostDetails />,
            loader: PostDetailsLoader
          }
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={postStore}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  </React.StrictMode>
);
