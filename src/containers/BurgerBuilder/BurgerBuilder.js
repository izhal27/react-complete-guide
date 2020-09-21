import React, { Component } from 'react';
import { connect } from 'react-redux';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import axios from '../../axios-orders';
import withErrorHandler from '../../components/hoc/withErrorHandler/withErrorHandler';

import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actionTypes from './../../store/actions';

const INGREDIENT_PRICES = {
  salad: 0.5,
  bacon: 0.4,
  cheese: 1.3,
  meat: 0.7,
};

class BurgerBuilder extends Component {
  state = {
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: null,
  };

  async componentDidMount() {
    // try {
    //   const res = await axios.get(
    //     'https://react-my-burger-4a2d5.firebaseio.com/ingredients.json'
    //   );
    //   this.setState({ ingredients: this.state.ingredients });
    // } catch (err) {
    //   this.setState({ error: err });
    // }
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
    const queryParams = [];
    for (const i in this.state.ingredients) {
      const key = encodeURIComponent(i);
      const value = encodeURIComponent(this.state.ingredients[i]);
      queryParams.push(`${key}=${value}`);
    }
    queryParams.push('price=' + this.state.totalPrice);

    this.props.history.push({
      pathname: '/checkout',
      search: `?${queryParams.join('&')}`,
    });
  };

  render() {
    const disabledInfo = { ...this.props.ings };
    for (const key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] === 0;
    }
    let orderSummary;
    let burger = this.state.error ? (
      <p>Ingredients can't be loaded...</p>
    ) : (
      <Spinner />
    );

    if (this.props.ings) {
      burger = (
        <>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
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
          ingredients={this.props.ings}
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

const mapStateToProps = state => ({ ings: state.ingredients });

const mapDispatchToProps = dispatch => ({
  onIngredientAdded: ingName =>
    dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName: ingName }),
  onIngredientRemoved: ingName =>
    dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
