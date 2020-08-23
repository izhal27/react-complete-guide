import React, { Component } from 'react';

import styles from './ContactData.module.css';
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-orders';
import withErrorHandler from '../../../components/hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: '',
    },
    loading: false,
  };

  orderHandler = e => {
    e.preventDefault();
    this.setState({ loading: true });

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice.toFixed(2),
      customer: {
        name: 'Risal Wwalangadi',
        address: {
          street: 'Jl. Madura, 39',
          zipCode: '96127',
          country: 'Indonesia',
        },
        email: 'risal.gooner@arsenal.com',
      },
      deliveryMethod: 'fastest',
    };

    axios
      .post('/orders.json', order)
      .then(res => {
        this.setState({ loading: false });
        this.props.history.push('/');
      })
      .catch(err => {
        this.setState({ loading: false });
      });
  };

  render() {
    let form = (
      <form id="contact-data">
        <input type="text" name="name" placeholder="Enter Your Name" />
        <input type="email" name="email" placeholder="Enter Your Mail" />
        <input type="text" name="street" placeholder="Street" />
        <input type="text" name="postal" placeholder="Postal" />
        <Button btnType="Success" clicked={this.orderHandler}>
          Order
        </Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }
    return (
      <div className={styles.ContactData}>
        <h1>Enter Your contact data</h1>
        {form}
      </div>
    );
  }
}

export default withErrorHandler(ContactData, axios);
