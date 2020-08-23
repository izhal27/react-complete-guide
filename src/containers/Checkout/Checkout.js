import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
  state = {
    ingredients: null,
    totalPrice: 0,
  };

  componentWillMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    let totalPrice = 0;

    for (const param of query.entries()) {
      if (param[0] === 'price') {
        totalPrice = parseFloat(param[1]);
      } else {
        ingredients[param[0]] = +param[1];
      }
    }

    this.setState({ ingredients, totalPrice });
  }

  componentDidUpdate(prevProps, prevState) {
    const selected = prevProps.history.location.hash;
    if (selected.length) {
      const el = document.querySelector(selected);
      el && el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  checkoutCanceledHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinuedHandler = () => {
    this.props.history.push({
      pathname: this.props.match.path + '/contact-data',
      hash: '#contact-data',
    });
  };

  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          checkoutCanceled={this.checkoutCanceledHandler}
          checkoutContinued={this.checkoutContinuedHandler}
        />
        <Route
          path={this.props.match.path + '/contact-data'}
          render={props => (
            <ContactData
              ingredients={this.state.ingredients}
              totalPrice={this.state.totalPrice}
              {...props}
            />
          )}
        />
      </div>
    );
  }
}

export default Checkout;
