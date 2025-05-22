import logo from './logo.svg';
import './App.css';
import Header from './Header';
import Nav from './Nav';
import Footer from './Footer';
import Home from './Home.js';
import NewPost from './NewPost';
import PostPage from './PostPage';
import About from './About';
import Missing from './Missing';
import EditPost from './EditPost';
import {
  Route,
  Routes,
} from 'react-router-dom';
import { useEffect } from 'react';
import useAxiosFetch from './hooks/useAxiosFetch';
import { useStoreActions } from 'easy-peasy';

function App() {
  const setPosts = useStoreActions((actions) => actions.setPosts);

  const { data, fetchError, isLoading } = useAxiosFetch('http://localhost:3500/posts');

  useEffect(() => {
    setPosts(data);
  }, [data, setPosts])
  /* const setPosts = useStoreActions(actions => actions.setPosts);
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
        console.log('meu deus');
        console.log(data);
        setPosts(data);
        //setting data as array depency, so it be called every time the data changes
    }, [data, setPosts]); */





  return (
    <div className="App">

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

    </div>
  );
}

export default App;
