import React from 'react';
import styles from './MenuItem.module.scss';

type MenuItemProps = {
  title: string;
  href: string;
};

const MenuItem = (props: MenuItemProps) => {
  return (
    <li className={styles.MenuItem}>
      <a href={props.href} target="_blank" rel="noopener noreferrer">
        {props.title}
      </a>
    </li>
  );
};

export default MenuItem;
