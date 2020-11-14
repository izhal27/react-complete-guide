import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngredient = payload => ({
  type: actionTypes.ADD_INGREDIENT,
  payload,
});

export const removeIngredient = payload => ({
  type: actionTypes.REMOVE_INGREDIENT,
  payload,
});

export const setIngredients = ingredients => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    payload: ingredients,
  };
};

export const fetchFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED,
  };
};

export const initIngredients = () => {
  return async dispatch => {
    try {
      const res = await axios.get(
        'https://react-my-burger-4a2d5.firebaseio.com/ingredients.json'
      );
      dispatch(setIngredients(res.data));
    } catch (err) {
      dispatch(fetchFailed());
    }
  };
};
