import React, { Component } from 'react';

import Order from '../../components/Order/Order';
import axios from './../../axios-orders';
import withErrorHandler from '../../components/hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {
  state = {
    orders: [],
    loading: false,
  };

  async componentDidMount() {
    try {
      this.setState({ loading: true });
      const res = await axios.get('/orders.json');
      const fetchedOrders = [];

      for (const key in res.data) {
        fetchedOrders.push({ ...res.data[key], id: key });
      }

      this.setState({ loading: false, orders: fetchedOrders });
    } catch (error) {
      this.setState({ loading: false });
    }
  }

  render() {
    let orders = null;
    if (this.state.orders.length) {
      orders = this.state.orders.map(order => (
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

    if (this.state.loading) {
      orders = <Spinner />;
    }

    return <div>{orders}</div>;
  }
}

export default withErrorHandler(Orders, axios);
