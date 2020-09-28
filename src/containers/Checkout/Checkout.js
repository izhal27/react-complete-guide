import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
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
          ingredients={this.props.ings}
          checkoutCanceled={this.checkoutCanceledHandler}
          checkoutContinued={this.checkoutContinuedHandler}
        />
        <Route
          path={this.props.match.path + '/contact-data'}
          component={ContactData}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { ings: state.ingredients };
};

export default connect(mapStateToProps)(Checkout);
