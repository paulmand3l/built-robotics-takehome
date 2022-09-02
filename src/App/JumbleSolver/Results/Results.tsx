import React, { CSSProperties, useCallback } from 'react';
import { FixedSizeList as List } from 'react-window';
import styles from './Results.module.css';

const ROW_HEIGHT = 24;

type ResultsProps = {
  words: string[];
};

type RowProps = {
  index: number;
  style: CSSProperties;
};

const Results = (props: ResultsProps) => {
  const Row = useCallback(
    ({ index, style }: RowProps) => {
      const word = props.words[index];
      return (
        <span className={styles.word} style={style} key={word}>
          {word}
        </span>
      );
    },
    [props.words]
  );

  return (
    <List
      className={styles.Results}
      height={240}
      width="100%"
      itemSize={ROW_HEIGHT}
      itemCount={props.words.length}
    >
      {Row}
    </List>
  );
};

export default Results;
