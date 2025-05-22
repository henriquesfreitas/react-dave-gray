import React from 'react'
import { Link } from 'react-router-dom'
import { useEffect } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';

const Nav = () => {

  const posts = useStoreState(state => state.posts);
  console.log(posts);
  const search = useStoreState(state => state.search);
  const setSearch = useStoreActions(actions => actions.setSearch);
  const setSearchResults = useStoreActions(actions => actions.setSearchResults);

  // whenever posts or search changes, re-run this code
  useEffect(() => {
    // filter the posts array, only keeping posts that include the search term
    // in their title, and convert the title to lower case to make the search case-insensitive
    const filteredResults = posts.filter(post => post.title.toLowerCase().includes(search.toLowerCase()));
    // set the searchResults state to the filtered results, in reverse order
    setSearchResults(filteredResults.reverse());
}, [posts, search, setSearchResults]);
  
  return (
    <nav>
        <form onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="search">Search:</label>
            <input type="text" id="search" value={search} onChange={(e) => setSearch(e.target.value)} />
        </form>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/post">New Post</Link></li>
          <li><Link to="/about">About</Link></li>
        </ul>
    </nav>
  )
}

export default Nav