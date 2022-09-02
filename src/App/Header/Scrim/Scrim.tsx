import React from 'react';
import styles from './Scrim.module.css';
import { useIsScrolled } from './useScrolled';

const Scrim = () => {
  const isScrolled = useIsScrolled();

  const style = isScrolled
    ? {
        opacity: 1,
        boxShadow: '0 8px 32px -10px rgb(0 0 0 / 24%)',
      }
    : {
        opacity: 0,
        bowShadow: 'none',
      };

  return <div style={style} className={styles.Scrim}></div>;
};

export default Scrim;
