import React from 'react';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import styles from './CheckoutSummary.module.css';

const checkoutSummary = props => (
  <div className={styles.CheckoutSummary}>
    <h1>Semoga rasanya enak!!!</h1>
    <div style={{ width: '100%', margin: 'auto' }}>
      <Burger ingredients={props.ingredients} />
    </div>
    <Button btnType="Danger" clicked={props.checkoutCanceled}>
      CANCEL
    </Button>
    <Button btnType="Success" clicked={props.checkoutContinued}>
      CONTINUE
    </Button>
  </div>
);

export default checkoutSummary;
