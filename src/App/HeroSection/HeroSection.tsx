import Section from 'components/Section';
import React from 'react';
import jobsiteBackground from 'images/job_site_background.webp';
import styles from './HeroSection.module.css';
import JumbleSolver from 'App/JumbleSolver';
import Button from 'components/Button';

type HeroSectionProps = {};

const HeroSection = (props: HeroSectionProps) => {
  return (
    <Section
      fullBleed={true}
      backgroundImage={jobsiteBackground}
      backgroundColor="#e8eef2"
    >
      <h1 className={styles.title}>Solve the Jumble</h1>
      <h3 className={styles.subtitle}>
        Enter a word to see what words from{' '}
        <a href="https://github.com/paulmand3l/built-robotics-takehome/blob/main/src/App/JumbleSolver/wordlist.json">
          this corpus
        </a>{' '}
        can be made with only the letters in the input word.
      </h3>
      <JumbleSolver />
      <Button
        title="How it works"
        onClick={() => {
          window.open(
            'https://github.com/paulmand3l/built-robotics-takehome/blob/main/src/App/JumbleSolver/solve.ts'
          );
        }}
      />
    </Section>
  );
};

export default HeroSection;
