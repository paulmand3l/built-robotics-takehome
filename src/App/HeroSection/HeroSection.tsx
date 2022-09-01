import Section from 'components/Section';
import React from 'react';
import jobsiteBackground from 'images/job_site_background.webp';
import styles from './HeroSection.module.css';

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
        Enter any scramble of letters to see what words can be made from the
        selected corpus with those letters.
      </h3>
    </Section>
  );
};

export default HeroSection;
