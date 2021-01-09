import React from 'react';
import { AuthProvider, useAuthState } from './context/auth-context';
import Home from './containers/Home';
import Unauthenticated from './containers/Unauthenticated';

function App() {
  const { user } = useAuthState();
  return <AuthProvider>{user ? <Home /> : <Unauthenticated />}</AuthProvider>;
}

export default App;
