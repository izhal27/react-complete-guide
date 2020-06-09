import React, { Component } from 'react';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENT_PRICES = {
  salad: 0.5,
  bacon: 0.4,
  cheese: 1.3,
  meat: 0.7,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    },
    totalPrice: 4,
  };

  shouldComponentUpdate() {
    console.log('Should component update');

    return true;
  }

  addIngredientHandler = (type) => {
    const updateIngredients = {
      ...this.state.ingredients,
    };
    updateIngredients[type] += 1;

    const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type];

    this.setState({
      ingredients: updateIngredients,
      totalPrice: newPrice,
    });
  };

  removeIngredientHandler = (type) => {
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
  };

  render() {
    const disabledInfo = { ...this.state.ingredients };
    for (const key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] === 0;
    }

    return (
      <>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabled={disabledInfo}
          price={this.state.totalPrice}
        />
      </>
    );
  }
}

export default BurgerBuilder;
