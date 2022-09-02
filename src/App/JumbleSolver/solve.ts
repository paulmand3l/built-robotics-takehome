import wordlist from './wordlist.json';

const first26Primes = [
  2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71,
  73, 79, 83, 89, 97, 101, 103,
].map(BigInt);
const big0 = BigInt(0);

const getPrimeForChar = (c: string): bigint =>
  first26Primes[c.toLowerCase().charCodeAt(0) - 97];

const cleanWord = (word: string): string => word.toLowerCase().trim();

const hashWord = (word: string) =>
  word
    .split('')
    .map(getPrimeForChar)
    .reduce((prev, next) => prev * next, BigInt(1));

const histWord = (word: string) => {
  const histogram: { [key: string]: number } = {};
  let len = word.length;
  while (len--) {
    histogram[word.charAt(len)] = (histogram[word.charAt(len)] || 0) + 1;
  }
  return histogram;
};

const hashes = wordlist.map((word) => hashWord(cleanWord(word)));
export const solveWithHash = (input: string) => {
  const inputHash = hashWord(input);

  return wordlist.filter(
    (word, i) =>
      word.length <= input.length &&
      (hashes[i] === inputHash || inputHash % hashes[i] === big0)
  );
};

const histograms = wordlist.map((word) => histWord(cleanWord(word)));
export const solveWithHist = (input: string) => {
  const inputHist = histWord(input);

  return wordlist.filter((word, i) => {
    let testLength = word.length;
    if (testLength > input.length) return false;
    const testHist = histograms[i];
    while (testLength--) {
      if (testHist[word[testLength]] > (inputHist[word[testLength]] || 0)) {
        return false;
      }
    }
    return true;
  });
};

export const solveJumble = (rawInput: string) => {
  const inputWord = cleanWord(rawInput);

  const result =
    inputWord.length < 120
      ? solveWithHash(inputWord)
      : solveWithHist(inputWord);

  return result;
  // return result.sort((a, b) => {
  //   if (a.length > b.length) return -1;
  //   if (b.length > a.length) return 1;
  //   return a < b ? -1 : 1;
  // });
};
