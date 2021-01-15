/* eslint-disable no-nested-ternary */
import React from 'react';
import PropTypes from 'prop-types';
import Spinner from '../components/Spinner';

const sleep = (time) => new Promise((resolve) => setTimeout(resolve, time));

const getUser = () =>
  sleep(1000).then(() => ({ username: 'maria', apartment: null }));
// .then(() => null)

const AuthContext = React.createContext();
function AuthProvider({ children }) {
  const [state, setState] = React.useState({
    status: 'pending',
    error: null,
    user: null,
    apartment: null,
  });
  React.useEffect(() => {
    getUser().then(
      (user) => setState({ status: 'success', error: null, user }),
      (error) => setState({ status: 'error', error, user: null })
    );
  }, []);

  return (
    <AuthContext.Provider value={state}>
      {/* eslint-disable-next-line no-nested-ternary */}
      {state.status === 'pending' ? (
        <Spinner />
      ) : state.status === 'error' ? (
        <div>
          Oh no
          <div>
            <pre>{state.error.message}</pre>
          </div>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
}

function useAuthState() {
  const state = React.useContext(AuthContext);
  const isPending = state.status === 'pending';
  const isError = state.status === 'error';
  const isSuccess = state.status === 'success';
  const isAuthenticated = state.user && isSuccess;
  return {
    ...state,
    isPending,
    isError,
    isSuccess,
    isAuthenticated,
  };
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AuthProvider, useAuthState };
