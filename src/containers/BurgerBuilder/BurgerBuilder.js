import React, { Component } from 'react';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../components/hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
  salad: 0.5,
  bacon: 0.4,
  cheese: 1.3,
  meat: 0.7,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: null,
  };

  async componentDidMount() {
    try {
      const res = await axios.get(
        'https://react-my-burger-4a2d5.firebaseio.com/ingredients.json'
      );

      this.setState({ ingredients: res.data });
    } catch (err) {
      this.setState({ error: err });
    }
  }

  updatePurchaseState = ingredients => {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return (sum += el);
      }, 0);

    this.setState({ purchasable: sum > 0 });
  };

  addIngredientHandler = type => {
    const updateIngredients = {
      ...this.state.ingredients,
    };
    updateIngredients[type] += 1;

    const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type];

    this.setState({
      ingredients: updateIngredients,
      totalPrice: newPrice,
    });

    this.updatePurchaseState(updateIngredients);
  };

  removeIngredientHandler = type => {
    const updateIngredients = {
      ...this.state.ingredients,
    };

    if (updateIngredients[type] <= 0) {
      return;
    }

    updateIngredients[type] -= 1;

    const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];

    this.setState({
      ingredients: updateIngredients,
      totalPrice: newPrice,
    });

    this.updatePurchaseState(updateIngredients);
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    console.log('cancel order');
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    this.setState({ loading: true });

    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice.toFixed(2),
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
        this.setState({ loading: false, purchasing: false });
      })
      .catch(err => {
        this.setState({ loading: false, purchasing: false });
      });
  };

  render() {
    const disabledInfo = { ...this.state.ingredients };
    for (const key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] === 0;
    }
    let orderSummary;
    let burger = this.state.error ? (
      <p>Ingredients can't be loaded...</p>
    ) : (
      <Spinner />
    );

    if (this.state.ingredients) {
      burger = (
        <>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            disabled={disabledInfo}
            price={this.state.totalPrice}
            purchasable={this.state.purchasable}
            ordered={this.purchaseHandler}
          />
        </>
      );
      orderSummary = (
        <OrderSummary
          purchaseCancelled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
          ingredients={this.state.ingredients}
          price={this.state.totalPrice}
        />
      );

      if (this.state.loading) {
        orderSummary = <Spinner />;
      }
    }

    return (
      <>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
