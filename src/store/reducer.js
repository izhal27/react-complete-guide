import * as actionTypes from './actions';

const INGREDIENT_PRICES = {
  salad: 0.5,
  bacon: 0.4,
  cheese: 1.3,
  meat: 0.7,
};

const initialState = {
  ingredients: {
    salad: 0,
    bacon: 0,
    cheese: 0,
    meat: 0,
  },
  totalPrice: 4,
};

const reducer = (state = initialState, action) => {
  const { type, ingredientName } = action;

  switch (type) {
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [ingredientName]: state.ingredients[ingredientName] + 1,
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[ingredientName],
      };

    case actionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [ingredientName]: state.ingredients[ingredientName] - 1,
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[ingredientName],
      };

    case actionTypes.RESET_INGREDIENT:
      return initialState;

    default:
      return state;
  }
};

export default reducer;
