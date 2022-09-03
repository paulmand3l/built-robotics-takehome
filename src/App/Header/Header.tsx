import React from 'react';
import Button, { ButtonVariant } from 'components/Button';
import Scrim from './Scrim';
import Menu from './Menu';
import styles from './Header.module.scss';
import Logo from './Logo';

type HeaderProps = {};

const Header = (props: HeaderProps) => {
  return (
    <div className={styles.Header}>
      <Scrim />
      <nav>
        <Logo />
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
