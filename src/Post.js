import React from 'react'
import { Link } from 'react-router-dom'

const Post = ({ post }) => {
  return (
    <article>
        <h2>{post.title}</h2>
        <p>{post.body.slice(0, 100)}{post.body.length > 100 ? '...' : ''}</p>
        <Link to={`/post/${post.id}`}>Read More</Link>
    </article>
  )
}

export default Post