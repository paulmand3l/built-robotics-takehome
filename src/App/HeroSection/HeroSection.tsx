import Section from 'components/Section';
import React from 'react';
import jobsiteBackground from 'images/job_site_background.webp';
import styles from './HeroSection.module.css';
import JumbleSolver from 'App/JumbleSolver';

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
        <a href="http://www.mieliestronk.com/corncob_lowercase.txt">
          this corpus
        </a>{' '}
        can be made with only letters from the input word.
      </h3>
      <JumbleSolver />
    </Section>
  );
};

export default HeroSection;
