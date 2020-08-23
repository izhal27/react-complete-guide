import React from 'react';
import { NavLink } from 'react-router-dom';

import styles from './NavigationItem.module.css';

const navigationItem = props => (
  <li className={styles.NavigationItem}>
    <NavLink
      exact={props.exact}
      to={props.link}
      activeClassName={styles.active}
    >
      {props.children}
    </NavLink>
    {/* <a href={props.link} className={props.active ? styles.active : null}>
      {props.children}
    </a> */}
  </li>
);

export default navigationItem;
