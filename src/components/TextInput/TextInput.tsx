import React from 'react';
import styles from './TextInput.module.scss';

const TextInput = (props: React.ComponentPropsWithoutRef<'input'>) => {
  return (
    <input
      {...props}
      type="text"
      className={styles.TextInput}
      spellCheck={false}
    ></input>
  );
};

export default TextInput;
