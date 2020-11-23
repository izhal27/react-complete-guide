import * as actionTypes from '../actions/actionTypes';

const INGREDIENT_PRICES = {
  salad: 0.5,
  bacon: 0.4,
  cheese: 1.3,
  meat: 0.7,
};

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
  building: false,
};

const setIngredients = (state, { payload }) => {
  return {
    ...state,
    ingredients: {
      salad: payload.salad,
      bacon: payload.bacon,
      cheese: payload.cheese,
      meat: payload.meat,
    },
    totalPrice: 4,
    building: false,
  };
};

const addIngredient = (state, { payload }) => {
  return {
    ...state,
    ingredients: {
      ...state.ingredients,
      [payload]: state.ingredients[payload] + 1,
    },
    totalPrice: state.totalPrice + INGREDIENT_PRICES[payload],
    building: true,
  };
};

const removeIngredient = (state, { payload }) => {
  return {
    ...state,
    ingredients: {
      ...state.ingredients,
      [payload]: state.ingredients[payload] - 1,
    },
    totalPrice: state.totalPrice - INGREDIENT_PRICES[payload],
    building: true,
  };
};

const fetchIngredientFailed = (state, action) => {
  return {
    ...state,
    error: true,
  };
};

const reducer = (state = initialState, action) => {
  const { type } = action;

  switch (type) {
    case actionTypes.SET_INGREDIENTS:
      return setIngredients(state, action);
    case actionTypes.ADD_INGREDIENT:
      return addIngredient(state, action);
    case actionTypes.REMOVE_INGREDIENT:
      return removeIngredient(state, action);
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return fetchIngredientFailed(state, action);
    default:
      return state;
  }
};

export default reducer;
