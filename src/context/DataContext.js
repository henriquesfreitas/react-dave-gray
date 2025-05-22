import { createContext, useState, useEffect } from "react";
import {
    BrowserRouter as Router,
    Route,
    Routes,
    useNavigate,
} from 'react-router-dom';
import api from '../api/posts';
import useAxiosFetch from '../hooks/useAxiosFetch';

export const DataContext = createContext();


/* 
    The DataProvider is the parent component of all the components that need access to the data.
    It provides the data to all the components that need it.
    we are using redux easy peasy instead of DataContext, but we could use DataContext instead
    keeping this file for study purposes

    how to use:
    <DataProvider>
        <Header title="My Blog" />
        <Nav />
        <Routes>
          <Route path="/" element={
            <Home isLoading={isLoading} fetchError={fetchError} />} />

          <Route path="/post" element={
            <NewPost />} />

          <Route path="/edit/:id" element={
            <EditPost />} />

          <Route path="/post/:id" element={<PostPage />} />

          <Route path="/about" element={<About />} />

          <Route path="*" element={<Missing />} />
        </Routes>
      <Footer />
    </DataProvider>
*/
export const DataProvider = ({ children }) => {
    const [posts, setPosts] = useState([]);
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const navigate = useNavigate();

    const { data, fetchError, isLoading } = useAxiosFetch('http://localhost:3500/posts');

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                //using axios, instead of fetch, to make requests, because it's easier
                //config made in posts.js
                //const response = await fetch('https://localhost:3500/posts');
                console.log('fetching posts');
                const response = await api.get('/posts');
                setPosts(response.data);
                console.log('posts fetched');
            } catch (err) {
                console.log(err);
                // not in the 200 response range
                if (err.response) {
                    console.log(err.response.data);
                    console.log(err.response.status);
                    console.log(err.response.headers);
                }
            }
        }

        // now its using useAxiosFetch, instead of fetchPosts
        //fetchPosts();


        //using useAxiosFetch(called above), instead of fetchPosts, data is being populated by useAxiosFetch
        setPosts(data);
        //setting data as array depency, so it be called every time the data changes
    }, [data]);

    // whenever posts or search changes, re-run this code
    useEffect(() => {
        // filter the posts array, only keeping posts that include the search term
        // in their title, and convert the title to lower case to make the search case-insensitive
        const filteredResults = posts.filter(post => post.title.toLowerCase().includes(search.toLowerCase()));
        // set the searchResults state to the filtered results, in reverse order
        setSearchResults(filteredResults.reverse());
    }, [posts, search]);

    
    return (
        <DataContext.Provider
            value={{
                search,
                setSearch,
                searchResults,
                setSearchResults,
                fetchError,
                isLoading,
                posts,
                setPosts,
                navigate,
            }}
        >
            {children}
        </DataContext.Provider>
    );

}