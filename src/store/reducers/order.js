import * as actionTypes from '../actions/actionTypes';

const initialState = {
  orders: [],
  loading: false,
  purchased: false,
  error: null,
};

const purchaseInit = state => {
  return {
    ...state,
    purchased: false,
    error: null,
  };
};

const purchaseBurgerStart = state => {
  return {
    ...state,
    loading: true,
    error: null,
  };
};

const purchaseBurgerSuccess = (state, { orderData, orderId }) => {
  return {
    ...state,
    loading: false,
    purchased: true,
    orders: [...state.orders, { ...orderData, id: orderId }],
  };
};

const purchaseBurgerFail = (state, { error }) => {
  return {
    ...state,
    loading: false,
    error,
  };
};

const fetchOrdersStart = state => {
  return {
    ...state,
    loading: true,
    error: null,
  };
};

const fetchOrdersSuccess = (state, { orders }) => {
  return {
    ...state,
    loading: false,
    orders,
  };
};

const fetchOrdersFail = (state, { error }) => {
  return { ...state, loading: false, error };
};

const reducer = (state = initialState, action) => {
  const { type } = action;

  switch (type) {
    case actionTypes.PURCHASE_INIT:
      return purchaseInit(state);
    case actionTypes.PURCHASE_BURGER_START:
      return purchaseBurgerStart(state);
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      return purchaseBurgerSuccess(state, action);
    case actionTypes.PURCHASE_BURGER_FAIL:
      return purchaseBurgerFail(state, action);
    case actionTypes.FETCH_ORDERS_START:
      return fetchOrdersStart(state);
    case actionTypes.FETCH_ORDERS_SUCCESS:
      return fetchOrdersSuccess(state, action);
    case actionTypes.FETCH_ORDERS_FAIL:
      return fetchOrdersFail(state, action);
    default:
      return state;
  }
};

export default reducer;
