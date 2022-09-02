import React from 'react';
import Header from './Header';
import HeroSection from './HeroSection';
import styles from './App.module.css';
import Footer from './Footer';

type AppProps = {};

const App = (props: AppProps) => {
  return (
    <div className={styles.App}>
      <Header />
      <div className={styles.content}>
        <HeroSection />
      </div>
      <Footer />
    </div>
  );
};

export default App;
