import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import PropTypes from 'prop-types';
import { AuthProvider } from './context/auth-context';


function AppProviders({ children }) {
  return (
    <Router>
      <AuthProvider>{children}</AuthProvider>
    </Router>
  );
}

AppProviders.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppProviders;
