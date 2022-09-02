import React from 'react';
import styles from './TextInput.module.scss';

interface TextInputProps extends React.ComponentPropsWithoutRef<'input'> {};

const TextInput: React.FC<TextInputProps> = (props) => {
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
