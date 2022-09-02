import React from 'react';
import MenuItem from '../MenuItem';
import styles from './Menu.module.css';
import icon from 'icons/24_menu.svg';

type MenuProps = {};

const Menu = (props: MenuProps) => {
  return (
    <>
      <img src={icon} alt="menu icon" />
      <ul className={styles.Menu}>
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
            href: 'https://www.mathsisfun.com/prime-factorization.html',
          },
          {
            name: 'Safety',
            href: 'https://replit.com/@PaulMandel/VioletredTanUpgrade#main.py',
          },
          { name: 'About', href: 'https://www.mand3l.com/' },
          { name: 'Careers', href: 'https://resume.mand3l.com' },
        ].map(({ name, href }) => (
          <MenuItem key={name} title={name} href={href} />
        ))}
      </ul>
    </>
  );
};

export default Menu;
