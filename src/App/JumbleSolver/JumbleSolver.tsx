import TextInput from 'components/TextInput';
import React, { ChangeEvent, useState } from 'react';
import deburr from 'lodash.deburr';
import styles from './JumbleSolver.module.scss';
import { solveJumble } from './solve';

type JumbleSolverProps = {};

const JumbleSolver = (props: JumbleSolverProps) => {
  const [input, setInput] = useState('');
  const [words, setWords] = useState<string[]>([]);
  const [duration, setDuration] = useState(0);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const cleanInput = deburr(e.currentTarget.value)
      .toUpperCase()
      .replace(/[^A-Z]/g, '');

    setInput(cleanInput);

    if (cleanInput.length === 0) {
      setWords([]);
      setDuration(0);
      return;
    }

    const start = Date.now();
    const words = solveJumble(cleanInput);
    const delta = Date.now() - start;
    console.log(`Solved ${cleanInput} in ${delta}ms`);
    setDuration(Date.now() - start);
    setWords(words);
  };

  return (
    <div className={styles.JumbleSolver}>
      <TextInput value={input} onChange={handleChange} />

      {words.length ? (
        <div className={styles.output}>
          <div className={styles.solutions}>
            {words.slice(0, 10).map((word) => (
              <span className={styles.word} key={word}>
                {word}
              </span>
            ))}
          </div>
          <div className={styles.performance}>
            {words.length.toLocaleString('en-US')} words found in {duration}ms
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default JumbleSolver;
