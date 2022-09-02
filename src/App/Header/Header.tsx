import React from 'react';
import logo from './assets/built_by_paul.svg';
import Button, { ButtonVariant } from 'components/Button';
import Scrim from './Scrim';
import Menu from './Menu';
import styles from './Header.module.scss';

type HeaderProps = {};

const Header = (props: HeaderProps) => {
  return (
    <div className={styles.Header}>
      <Scrim />
      <nav>
        <img className={styles.logo} src={logo} alt="built robotics logo" />
        <Menu />
      </nav>
      <Button
        title="Get in Touch"
        variant={ButtonVariant.SECONDARY}
        onClick={() =>
          window.open("mailto:paul.mand3l@gmail.com?subject=You're hired!")
        }
      />
    </div>
  );
};

export default Header;
