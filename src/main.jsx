import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Home from './pages/Home';
import Post from './pages/Post';

import 'bootstrap/dist/css/bootstrap.min.css'
import PostList from "./pages/PostList.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <Home />,
  },
  {
    path: "posts",
    element: <PostList />,
  },
  {
    path: "post/:slug",
    element: <Post />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
