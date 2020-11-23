import React, { Component } from 'react';
import { connect } from 'react-redux';

import Order from '../../components/Order/Order';
import axios from './../../axios-orders';
import withErrorHandler from '../../components/hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';

class Orders extends Component {
  async componentDidMount() {
    this.props.onFetchOrders(this.props.token, this.props.userId);
  }

  render() {
    let orders = null;
    if (!this.props.token) {
      orders = (
        <h1 style={{ textAlign: 'center' }}>
          You don't have permission to access this page.
        </h1>
      );
    } else if (this.props.orders.length) {
      orders = this.props.orders.map(order => (
        <Order
          key={order.id}
          id={order.id}
          ingredients={order.ingredients}
          price={order.price}
        />
      ));
    } else {
      orders = <h1 style={{ textAlign: 'center' }}>No Order Found.</h1>;
    }

    if (this.props.loading) {
      orders = <Spinner />;
    }

    return <div>{orders}</div>;
  }
}

const mapStateToProps = state => {
  const { orders, loading } = state.order;
  const { token, userId } = state.auth;

  return {
    orders,
    loading,
    token,
    userId,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: (token, userId) =>
      dispatch(actions.fetchOrders(token, userId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
