import React from 'react';
import styles from './Button.module.scss';
import arrowEastWhite from 'icons/24_arrow_east_white.svg';
import arrowEastSmoke from 'icons/24_arrow_east_carbon.svg';

import classnames from 'classnames';

export enum Variant {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
}

type ButtonProps = {
  variant?: Variant;
  title: string;
  hasArrow?: boolean;
  onClick: () => void;
};

const Button = ({
  variant = Variant.PRIMARY,
  title,
  hasArrow = false,
  onClick = () => {},
}: ButtonProps) => {
  const buttonClass = classnames(styles.Button, {
    [styles.primary]: variant === Variant.PRIMARY,
    [styles.secondary]: variant === Variant.SECONDARY,
  });

  return (
    <div className={buttonClass} onClick={onClick}>
      <span className={styles.title}>{title}</span>
      {hasArrow && (
        <img
          className={styles.icon}
          src={variant === Variant.PRIMARY ? arrowEastSmoke : arrowEastWhite}
          alt="icon"
        />
      )}
    </div>
  );
};

export default Button;
