import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Navbar from './components/Navbar';
import PostList from './components/PostList'; 
import PostDetail from './components/PostDetail';
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';
import './styles/styles.css';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact>
          {/* Pass the loggedIn prop to the PostList component */}
          <PostList loggedIn={loggedIn} />
        </Route>
        <Route path="/post/:id" component={PostDetail} />
        <Route
          path="/login"
          render={(props) => (
            loggedIn ? (
              <Redirect to="/" />
            ) : (
              <LoginForm {...props} setLoggedIn={setLoggedIn} />
            )
          )}
        />
        <Route
          path="/register"
          render={(props) => (
            loggedIn ? (
              <Redirect to="/" />
            ) : (
              <RegistrationForm {...props} />
            )
          )}
        />
        <Route render={() => <Redirect to="/" />} />
      </Switch>
    </Router>
  );
};

export default App;
