import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import './App.scss';

import Home from '../components/pages/Home/Home';
import Products from '../components/pages/Products/Products';
import UserProfile from '../components/pages/UserProfile/UserProfile';
import Orders from '../components/pages/Orders/Orders';
import ShoppingCart from '../components/pages/ShoppingCart/ShoppingCart';
import SingleProduct from '../components/pages/SingleProduct/SingleProduct';
import Navbar from '../components/shared/Navbar/Navbar';

const PublicRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = (props) => (authed === false ? <Component {...props} {...rest}/> : <Redirect to={{ pathname: '/', state: { from: props.location } }} />);
  return <Route {...rest} render={(props) => routeChecker(props)} />;
};

const PrivateRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = (props) => (authed === true ? <Component {...props} {...rest}/> : <Redirect to={{ pathname: '/welcome', state: { from: props.location } }} />);
  return <Route {...rest} render={(props) => routeChecker(props)} />;
};

class App extends React.Component {
  state = {
    authed: false,
  }

  render() {
    const { authed } = this.state;

    return (
      <div className="App">
        <Router>
          <Navbar />
          <Switch>
            <Route path="/" exact component={Home} authed={authed} />
            <Route path="/products" exact component={Products} authed={authed} />
            <Route path="/userProfile" exact component={UserProfile} authed={authed} />
            <Route path="/userProfile/orders" exact component={Orders} authed={authed} />
            <Route path="/userProfile/shoppingCart" exact component={ShoppingCart} authed={authed} />
            <Route path="/products/:productId" exact component={SingleProduct} authed={authed} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
