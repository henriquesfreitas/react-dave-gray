import { React, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { useNavigate } from 'react-router-dom';

const EditPost = () => {

    const navigate = useNavigate();
    const { id } = useParams();

    const editTitle = useStoreState(state => state.editTitle);
    const editBody = useStoreState(state => state.editBody);

    const editPost = useStoreActions(actions => actions.editPost);
    const setEditTitle = useStoreActions(actions => actions.setEditTitle);
    const setEditBody = useStoreActions(actions => actions.setEditBody);

    const getPostById = useStoreState(state => state.getPostById);
    const post = getPostById(id);

    const handleEdit = async (id) => {
        const datetime = new Date(Date.now()).toISOString();
        const updatedPost = { id, title: editTitle, datetime, body: editBody };
        await editPost(updatedPost);
        navigate(`/post/${id}`);
    }

    useEffect(() => {
        if (post) {
            setEditTitle(post.title);
            setEditBody(post.body);
        }
    }, [post, setEditTitle, setEditBody])
    return (
        <div>
            <h1>Edit Post</h1>
            <form onSubmit={(e) => e.preventDefault()}>
                <label htmlFor="postTitle">Post Title:</label>
                <input
                    id="postTitle"
                    type="text"
                    required
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                />
                <label htmlFor="postBody">Post:</label>
                <textarea
                    id="postBody"
                    required
                    value={editBody}
                    onChange={(e) => setEditBody(e.target.value)}
                />
                <button type="button" onClick={() => handleEdit(post.id)}>Submit</button>
            </form>
        </div>
    )
}

export default EditPost