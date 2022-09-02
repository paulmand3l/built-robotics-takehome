import { solveWithHash, solveWithHist } from '../src/App/JumbleSolver/solve';
import { performance } from 'perf_hooks';

const letters = 'abcdefghijklmnopqrstuvwxyz'.split('');

const generateTestWord = (length: number) =>
  new Array(length)
    .fill('')
    .map(() => letters[Math.floor(Math.random() * letters.length)])
    .join('');

const nTrials = 20;
const maxLength = 150;

console.log('Length, Hash time (ms), Hist time (ms)');
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

  console.log(`${length}, ${hashTime / nTrials}, ${histTime / nTrials}`);
}
