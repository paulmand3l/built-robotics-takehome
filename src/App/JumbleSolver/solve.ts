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

const hashes = wordlist.map((word) => hashWord(cleanWord(word)));

export const solveJumble = (rawInput: string) => {
  const inputWord = cleanWord(rawInput);
  const inputHash = hashWord(inputWord);

  return wordlist
    .filter(
      (word, i) =>
        word.length <= inputWord.length &&
        (hashes[i] === inputHash || inputHash % hashes[i] === big0)
    )
    .sort((a, b) => {
      if (a.length > b.length) return -1;
      if (b.length > a.length) return 1;
      return a < b ? -1 : 1;
    });
};
