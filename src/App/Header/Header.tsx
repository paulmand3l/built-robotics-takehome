import React from 'react';
import styles from './Header.module.css';
import logo from './assets/built_by_paul.svg';
import Button, { ButtonVariant } from 'components/Button';
import MenuItem from './MenuItem';

type HeaderProps = {};

const Header = (props: HeaderProps) => {
  return (
    <div className={styles.Header}>
      <nav>
        <img src={logo} alt="built robotics logo" />
        <ul className={styles.menu}>
          {[
            {
              name: 'Technology',
              href: 'https://replit.com/@PaulMandel/VioletredTanUpgrade#main.py',
            },
            {
              name: 'Solutions',
              href: 'https://replit.com/@PaulMandel/VioletredTanUpgrade#main.py',
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
            { name: 'Careers', href: 'https://resume.mand3l.com' }
          ].map(({ name, href }) => (
            <MenuItem key={name} title={name} href={href} />
          ))}
        </ul>
      </nav>
      <Button
        title="Get in Touch"
        variant={ButtonVariant.SECONDARY}
        hasArrow={true}
        onClick={() =>
          window.open("mailto:paul.mand3l@gmail.com?subject=You're hired!")
        }
      />
    </div>
  );
};

export default Header;
