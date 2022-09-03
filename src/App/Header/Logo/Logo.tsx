import React, { useState } from 'react';
import logo from './assets/built_by_paul.svg';
import styles from './Logo.module.scss';

interface LogoProps extends React.ComponentPropsWithoutRef<'img'> {}

const Logo = (props: LogoProps) => {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [z, setZ] = useState(1);
  const [r, setR] = useState(0);

  const handleClick = () => {
    setX(x + Math.floor(Math.random() * 20) - 10);
    setY(y + Math.floor(Math.random() * 20) - 10);
    setR(r + Math.floor(Math.random() * 20) - 10);
    setZ(z * 0.98);
  };

  const transformStyle = {
    transform: `translateX(${x}px) translateY(${y}px) rotate(${r}deg) scale(${z})`,
  };

  return (
    <img
      style={transformStyle}
      className={styles.logo}
      src={logo}
      alt="built robotics logo"
      onClick={handleClick}
      {...props}
    />
  );
};

export default Logo;
