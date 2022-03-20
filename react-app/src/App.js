import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// import ProtectedRoute from './components/auth/ProtectedRoute';
import NavBar from './components/NavBar';
// import UsersList from './components/UsersList';
import ProfileDetailPage from './components/Profiles/ProfileDetailPage';
import PostForm from './components/Posts/PostForm';
import PostsList from './components/Posts/PostsList';
import PostDetailPage from './components/Posts/PostDetailPage';
import { authenticate } from './store/session';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        {/* <ProtectedRoute path='/users' exact={true} >
          <UsersList />
        </ProtectedRoute> */}

        <Route path='/' exact={true} >
          <h1>My Home Page</h1>
        </Route>

        <Route path='/profiles/:id' exact={true}>
          <ProfileDetailPage />
        </Route>

        <Route path='/posts' exact={true} >
          <PostsList />
        </Route>

        <Route path='/posts/new' exact={true} >
          <PostForm />
        </Route>

        <Route path='/posts/:id' exact={true} >
          <PostDetailPage />
        </Route>

      </Switch>
    </BrowserRouter>
  );
}

export default App;
