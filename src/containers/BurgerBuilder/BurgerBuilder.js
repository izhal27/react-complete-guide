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

    const newPrice = INGREDIENT_PRICES[type] + this.state.totalPrice;

    this.setState({
      ingredients: updateIngredients,
      totalPrice: newPrice,
    });
  };

  render() {
    console.log('render()', this.state);

    return (
      <>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls ingredientAdded={this.addIngredientHandler} />
      </>
    );
  }
}

export default BurgerBuilder;
