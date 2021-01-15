import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './containers/Home';
import CheckOut from './containers/CheckOutPage';
import Order from './containers/PlaceOrderPage';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" render={() => <Home />} />
        <Route exact path="/checkOut" render={() => <CheckOut />} />
        <Route exact path="/order" render={() => <Order />} />
      </Switch>
    </Router>
  );
}

export default App;
