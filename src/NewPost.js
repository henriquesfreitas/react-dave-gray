import React from 'react'
import { useStoreState, useStoreActions } from 'easy-peasy';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from 'react-router-dom';

const NewPost = () => {

  const navigate = useNavigate();

  const posts = useStoreState(state => state.posts);
  const postTitle = useStoreState(state => state.postTitle);
  const postBody = useStoreState(state => state.postBody);

  const savePost = useStoreActions(actions => actions.savePost);
  const setPostTitle = useStoreActions(actions => actions.setPostTitle);
  const setPostBody = useStoreActions(actions => actions.setPostBody);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = new Date(Date.now()).toISOString();
    const newPost = { id, title: postTitle, datetime, body: postBody };
    await savePost(newPost);
    navigate('/');
  }

  return (
    <main>
      <h1>NewPost</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="postTitle">Post Title:</label>
        <input type="text" id="postTitle" value={postTitle} onChange={(e) => setPostTitle(e.target.value)} />
        <label htmlFor="postBody">Post Body:</label>
        <textarea id="postBody" value={postBody} onChange={(e) => setPostBody(e.target.value)} />
        <button type="submit">Submit</button>
      </form>
    </main>
  )
}

export default NewPost