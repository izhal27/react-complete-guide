import React, { Component, Suspense, lazy } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import './App.css';
import Layout from './components/hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import * as actions from './store/actions/index';
import Spinner from './components/UI/Spinner/Spinner';

class App extends Component {
  componentDidMount() {
    this.props.onTryCheckAuthState();
  }

  render() {
    const Auth = lazy(() => import('./containers/Auth/Auth'));
    const Checkout = lazy(() => import('./containers/Checkout/Checkout'));
    const Orders = lazy(() => import('./containers/Orders/Orders'));
    const Logout = lazy(() => import('./containers/Auth/Logout/Logout'));

    let routes = (
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" component={Orders} />
          <Route path="/auth" component={Auth} />
          <Route path="/logout" component={Logout} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>
      );
    }

    return (
      <Layout>
        <Suspense fallback={<Spinner />}>{routes}</Suspense>
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  const { token } = state.auth;

  return {
    isAuthenticated: token !== null,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryCheckAuthState: () => dispatch(actions.checkAuthState()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
