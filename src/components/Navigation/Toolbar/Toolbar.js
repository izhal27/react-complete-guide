import React from 'react';
import { Link } from 'react-router-dom';

import styles from './Toolbar.module.css';
import Logo from './../../Logo/Logo';
import NavigationItems from './../NavigationItems/NavigationItems';
import DrawToggle from '../SideDrawer/DrawToggle/DrawToggle';

const toolbar = props => (
  <header className={styles.Toolbar}>
    <DrawToggle clicked={props.drawerToggleClicked} />
    <div className={styles.Logo}>
      <Link to="/">
        <Logo />
      </Link>
    </div>
    <nav className={styles.DesktopOnly}>
      <NavigationItems isAuthenticated={props.isAuth} />
    </nav>
  </header>
);

export default toolbar;
