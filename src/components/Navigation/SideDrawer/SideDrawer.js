import React from 'react';

import styles from './SideDrawer.module.css';
import Logo from './../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';

const sideDrawer = (props) => {
  let attachedStyles = [styles.SideDrawer, styles.Close];

  if (props.open) {
    attachedStyles = [styles.SideDrawer, styles.Open];
  }

  return (
    <>
      <Backdrop show={props.open} clicked={props.closed} />
      <div className={attachedStyles.join(' ')}>
        <div className={styles.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </>
  );
};

export default sideDrawer;
