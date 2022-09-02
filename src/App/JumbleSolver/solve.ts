import wordlist from './wordlist.json';
import deburr from 'lodash.deburr';

/********* Common Methods **********/

/**
 * Converts a word to a deburred, trimmed, lowercase version of itself
 * Throws if result has any non-lowercase-letter characters
 * @param {string} word - The word to cleaned
 * @returns {string} The deburred, trimmed, lowercased version of the word
 */
const cleanWord = (word: string): string =>
  assertAlpha(deburr(word).toLowerCase().trim());

/**
 * Throws if input string contains any non-lowercase-letter characters
 * @param {string} str - The string to test
 */
const assertAlpha = (str: string) => {
  if (str.match(/[^a-z]/g)) {
    throw new Error(
      'Jumble must be all lower case letters with no spaces or punctuation'
    );
  }
  return str;
};

/********* Hashing Strategy **********
 * This strategy leverages prime factorization to compare
 * the input word with the test word. I compute hashes for
 * each word based on the product of prime numbers corresponding
 * to the characters in the word.
 *   E.g. "cab" => 5 * 2 * 3 = 30
 * By then checking divisibility, I can test whether one hash
 * represents a subset of the characters in another hash
 *   E.g. "ba" => 3 * 2 = 6, since 30 is divisible by 6,
 *     "ba" must be a subset of "cab"
 * These numbers can get quite large, but javascript provides
 * the BigInt type to deal with arbitrariy-precision integers.
 *************************************/

const first26Primes = [
  2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71,
  73, 79, 83, 89, 97, 101,
].map(BigInt);

// Pre-cache 0 to avoid allocation in the inner loop
const big0 = BigInt(0);

/**
 * This function gets the prime number corresponding to a single character
 * @example
 * // returns 2n
 * getPrimeForChar('a');
 * @param {string} c - A character to get a prime number for
 * @returns {bigint} The prime number as a BigInt
 */
const getPrimeForChar = (c: string): bigint =>
  first26Primes[c.toLowerCase().charCodeAt(0) - 97];

/**
 * This function generates a prime hash for a given word
 * The prime hash is the product of the primes corresponding
 * to the characters in the word.
 * @example
 * // returns 30n
 * hashWord('cab');
 * @param {string} word - A word to hash
 * @returns {bigint} The hash
 */
const hashWord = (word: string): bigint =>
  word
    .split('')
    .map(getPrimeForChar)
    .reduce((prev, next) => prev * next, BigInt(1));

// Pre-compute these for performance so we don't have to
// re-do this work every time we want to solve a new jumble
const hashes = wordlist.map((word) => hashWord(cleanWord(word)));

/**
 * Solves a word jumble using the hashing strategy described above
 * @param {string} input - The string of characters to test
 * @returns {string[]} All the words in the corpus that can be made with only characters from the input string
 */
export const solveWithHash = (rawInput: string) => {
  const input = cleanWord(rawInput);
  const inputHash = hashWord(input);

  return wordlist.filter(
    (word, i) =>
      word.length <= input.length &&
      (hashes[i] === inputHash || inputHash % hashes[i] === big0)
  );
};

/********* Letter Counting Strategy **********
 * This strategy leverages letter counts to compare the input
 * word with the test word. I create lookup tables (plain objects)
 * for each word that map each letter in the word to the number
 * of times the letter appears in the word
 *   E.g. "cab" => { a: 1, b: 1, c: 1}
 * To test, I compare the values in the two lookup tables for each
 * letter in the word under test
 *   E.g. "ba" => { a: 1, b: 1 }, since the number of a's and b's
 *     in this lookup table is less than the number of a's and b's
 *     in the lookup table for "cab", "ba" must be a subset of "cab"
 *************************************/

/**
 * Make a letter count histogram for the given word
 * @example
 * // Returns {a: 1, b: 1, c: 1}
 * histWord("cab")
 * @param {string} word - The word to make a letter histogram of
 * @returns - The letter histogram
 */
const histWord = (word: string) => {
  const histogram: { [key: string]: number } = {};
  let len = word.length;
  while (len--) {
    histogram[word.charAt(len)] = (histogram[word.charAt(len)] || 0) + 1;
  }
  return histogram;
};

// Pre-compute these for performance so we don't have to
// re-do this work every time we want to solve a new jumble
const histograms = wordlist.map((word) => histWord(cleanWord(word)));

/**
 * Solves a word jumble using the letter histogram strategy described above
 * @param {string} input - The string of characters to test
 * @returns {string[]} All the words in the corpus that can be made with only characters from the input string
 */
export const solveWithHist = (rawInput: string) => {
  const input = cleanWord(rawInput);
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

/**
 * Solves a jumble by finding all the words in the corpus that can
 * be formed from a given string of letters.
 *
 * Based on performance testing, uses the hashing strategy for input strings
 * shorter than 120 characters and the letter histograms strategy for input
 * strings longer than 120 characters.
 *
 * @param {string} rawJumble - The string of letters to solve for
 * @returns {string[]} - The list of words in the corpus that can be formed
 *  from the input string of letters
 */
export const solveJumble = (rawJumble: string) => {
  const jumble = cleanWord(rawJumble);
  return jumble.length < 120 ? solveWithHash(jumble) : solveWithHist(jumble);
};
