import React from 'react';
import styles from './Footer.module.scss';

type FooterProps = {};

const Footer = (props: FooterProps) => {
  return (
    <div className={styles.Footer}>
      <span className={styles.line}>
        Created by&nbsp;<a href="https://mand3l.com">Paul Mandel</a>
      </span>
      <span className={styles.line}>
        Inspired by&nbsp;
        <a href="https://www.builtrobotics.com/">Built Robotics</a>
      </span>
    </div>
  );
};

export default Footer;
