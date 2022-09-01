import React from 'react';
import styles from './Section.module.css';

type SectionProps = {
  fullBleed?: boolean;
  backgroundImage: string;
  backgroundColor?: string;
  children: JSX.Element | JSX.Element[] | string | number;
};

const Section = (props: SectionProps) => {
  const sectionStyle = {
    backgroundImage: `url(${props.backgroundImage})`,
    backgroundColor: props.backgroundColor || 'inherit',
    backgroundSize: 'cover',
  };

  return (
    <section className={styles.Section} style={sectionStyle}>
      <div className={styles.content}>{props.children}</div>
    </section>
  );
};

export default Section;
