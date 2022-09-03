import {
  hashLetters,
  histWord,
  solveWithHash,
  solveWithHist,
} from '../src/App/JumbleSolver/solve';
import { performance } from 'perf_hooks';
import { writeFileSync } from 'fs';
import { join } from 'path';

const letters = 'abcdefghijklmnopqrstuvwxyz'.split('');

const generateTestWord = (length: number) =>
  new Array(length)
    .fill('')
    .map(() => letters[Math.floor(Math.random() * letters.length)])
    .join('');

const testSolutionPerformance = () => {
  const nTrials = 20;
  const maxLength = 100;
  const solutionPerformanceOutputLines = [
    'Input length, Prime factors (ms), Letter histograms (ms)',
  ];

  for (let length = 1; length <= maxLength; length++) {
    let histTime = 0;
    let hashTime = 0;

    for (let trial = 0; trial <= nTrials; trial++) {
      const word = generateTestWord(length);

      let start = performance.now();
      solveWithHash(word);
      hashTime += performance.now() - start;

      start = performance.now();
      solveWithHist(word);
      histTime += performance.now() - start;
    }

    solutionPerformanceOutputLines.push(
      `${length}, ${hashTime / nTrials}, ${histTime / nTrials}`
    );
  }

  writeFileSync(
    join(__dirname, 'solution_performance.txt'),
    solutionPerformanceOutputLines.join('\n')
  );
};

const testPreprocessingPerformance = () => {
  const nTrials = 20;
  const maxLength = 100;
  const reps = 100;
  const preprocessingPerformanceOutputLines = [
    'Input length, Prime products (us), Letter histograms (us)',
  ];

  for (let length = 1; length <= maxLength; length++) {
    let histTime = 0;
    let hashTime = 0;

    for (let trial = 0; trial <= nTrials; trial++) {
      const word = generateTestWord(length);

      let start = performance.now();
      for (let i = 0; i < reps; i++) {
        hashLetters(word);
      }
      hashTime += (performance.now() - start) / reps;

      start = performance.now();
      for (let i = 0; i < reps; i++) {
        histWord(word);
      }
      histTime += (performance.now() - start) / reps;
    }

    preprocessingPerformanceOutputLines.push(
      `${length}, ${(1000 * hashTime) / nTrials}, ${
        (1000 * histTime) / nTrials
      }`
    );
  }

  writeFileSync(
    join(__dirname, 'preprocessing_performance.txt'),
    preprocessingPerformanceOutputLines.join('\n')
  );
};

testSolutionPerformance();
testPreprocessingPerformance();
