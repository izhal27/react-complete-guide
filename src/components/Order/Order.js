import React from 'react';

import styles from './Order.module.css';

const order = props => {
  const ingredients = [];

  for (const name in props.ingredients) {
    if (props.ingredients[name] > 0) {
      ingredients.push({
        name,
        amount: props.ingredients[name],
      });
    }
  }

  const ingredientsOutput = ingredients.map((ing, index) => (
    <span
      key={index}
      style={{
        display: 'inline-block',
        border: '1px solid #ccc',
        margin: '0 5px',
        padding: '5px 10px',
        textTransform: 'capitalize',
      }}
    >
      {ing.name} ({ing.amount})
    </span>
  ));

  return (
    <div className={styles.Order}>
      <p>Order Id: {props.id}</p>
      <p>Ingredients: {ingredientsOutput}</p>
      <p>
        Price: <strong>USD ${props.price}</strong>
      </p>
    </div>
  );
};

export default order;
