import React, { Component } from 'react';
import { Redirect, Route } from 'react-router-dom';
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
    let summary = <Redirect to="/" />;

    if (this.props.ings) {
      const purchased = this.props.purchased ? <Redirect to="/" /> : null;
      summary = (
        <div>
          {purchased}
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
    return summary;
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    purchased: state.order.purchased,
  };
};

export default connect(mapStateToProps)(Checkout);
