import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { useStoreState, useStoreActions } from 'easy-peasy';
import { useNavigate } from 'react-router-dom';

const PostPage = () => {

  const navigate = useNavigate();

  const { id } = useParams();

  const deletePost = useStoreActions(actions => actions.deletePost);
  const getPostById = useStoreState(state => state.getPostById);
  const post = getPostById(id);


  const handleDelete = async (id) => {
      await deletePost(id);
      navigate('/');
  }

  return (
    <main>
        <article>
          {post && <>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
            <Link to={`/edit/${post.id}`}>Edit Post</Link>
            <button onClick={() => handleDelete(post.id)}>Delete</button>
            </>}
            {!post && <>
            <h2>Post Not Found</h2>
            <p>Well, that's disappointing.</p>
            <p>
              <Link to="/">Visit Our Homepage</Link>
            </p>
            </>}
        </article>
    </main>
  )
}

export default PostPage