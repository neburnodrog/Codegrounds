import React, { useState } from 'react';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';
import { UserDocument } from '../../src/models/User';

// COMPONENTS
import NavBar from './Components/NavBar/NavBar';
import Home from './Pages/Home';
import Profile from './Pages/Profile';
import CodeGround from './Pages/CodeGround';
import SignUp from './Pages/SignUp';
import Login from './Pages/Login';
import NotFound from './Pages/NotFound';
import { ProtectedRoute } from './Pages/ProtectedRoute';

const AppContainer = styled.div`
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
`;

function App(props: { user: UserDocument | null }) {
  const [user, setUser] = useState(props.user);

  return (
    <AppContainer>
      <NavBar user={user ? true : false} setUser={setUser} />

      <Switch>
        <Route exact path="/" render={(props) => <Home user={user} />} />
        <ProtectedRoute
          exact={true}
          path="/profile"
          permission={user ? true : false}
          redirectPath="/login"
          component={Profile}
        />
        <Route
          exact
          path="/code-ground"
          render={() => <CodeGround user={user} />}
        />
        <Route exact path="/code-ground/:id" component={CodeGround} />
        <ProtectedRoute
          exact={true}
          path="/login"
          permission={user ? false : true}
          redirectPath="/profile"
          render={(props) => <Login setUser={setUser} />}
        />
        <ProtectedRoute
          exact={true}
          path="/signup"
          permission={user ? false : true}
          redirectPath="/profile"
          component={SignUp}
        />
        <Route component={NotFound} />
      </Switch>
    </AppContainer>
  );
}

export default App;
