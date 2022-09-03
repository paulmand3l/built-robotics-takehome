import React, { useCallback, useEffect, useState } from 'react';
import MenuItem from '../MenuItem';
import styles from './Menu.module.scss';
import menuIcon from 'icons/24_menu.svg';
import closeIcon from 'icons/24_close_white.svg';
import { useEscape } from './useEscape';
import { useWindowWidth } from '@react-hook/window-size';

type MenuProps = {};

const Menu = (props: MenuProps) => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const forceMenuOpenStyle = {
    display: 'block',
  };

  const windowWidth = useWindowWidth();

  useEffect(() => {
    if (windowWidth > 1200 && isMenuOpen) {
      setMenuOpen(false);
    }
  }, [isMenuOpen, windowWidth]);

  useEscape(
    useCallback(() => {
      if (isMenuOpen) {
        setMenuOpen(false);
      }
    }, [isMenuOpen])
  );

  return (
    <>
      <div
        className={styles.openButton}
        onClick={() => setMenuOpen(!isMenuOpen)}
      >
        <img className={styles.icon} src={menuIcon} alt="menu icon" />
        <span className={styles.label}>Menu</span>
      </div>
      <div className={styles.Menu} style={isMenuOpen ? forceMenuOpenStyle : {}}>
        <img
          className={styles.closeButton}
          src={closeIcon}
          alt="Close menu icon"
          onClick={() => setMenuOpen(false)}
        />
        <ul>
          {[
            {
              name: 'Technology',
              href: 'https://github.com/paulmand3l/built-robotics-takehome',
            },
            {
              name: 'Solution',
              href: 'https://github.com/paulmand3l/built-robotics-takehome/blob/main/src/App/JumbleSolver/solve.ts',
            },
            {
              name: 'How it Works',
              href: 'https://github.com/paulmand3l/built-robotics-takehome',
            },
            {
              name: 'Safety',
              href: 'https://github.com/paulmand3l/built-robotics-takehome/blob/main/src/App/JumbleSolver/solve.test.ts',
            },
            { name: 'About', href: 'https://www.mand3l.com/' },
            { name: 'Careers', href: 'https://resume.mand3l.com' },
          ].map(({ name, href }) => (
            <MenuItem key={name} title={name} href={href} />
          ))}
        </ul>
      </div>
    </>
  );
};

export default Menu;
