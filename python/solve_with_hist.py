""" A script to solve word jumbles using letter histograms

This algorithm compares letter counts in the input word with the test
word. It uses a dict for each word that maps each letter in the word
to the number of times the letter appears.

E.g. "cab" => { a: 1, b: 1, c: 1}

To test against the input I compare the values in the two lookup tables
for each letter in the word under test

E.g. "ba" => { a: 1, b: 1 }, since the number of a's and b's in this
lookup table is less than the number of a's and b's in the lookup
table for "cab", "ba" must be a subset of "cab"

Complexity O(n x m)
- n is the length of the word list to check
- m is the average length of the words in the word list
"""
import sys
import fileinput
from re import search
from collections import defaultdict
from typing import List, DefaultDict


def clean(word: str) -> str:
    """Converts a string to a trimmed, lowercase version of itself

    :param word: The string to clean
    :type word: str
    :return: The deburred, trimmed, lowercased version of the string
    :rtype: str
    """
    return word.lower().strip()


def count_letters(letters: str) -> DefaultDict[str, int]:
    """Counts the number of times each letter appears in the input

    >>> count_letters('dog')
    { 'd': 1, 'g': 1, 'o': 1 }
    >>> count_letters('aaa')
    { 'a': 3 }

    :param letters: The letters to count
    :type letters: str
    :return: A dict with letter counts
    :rtype: dict
    """
    histogram: DefaultDict[str, int] = defaultdict(int)

    for c in list(letters):
        histogram[c] += 1

    return histogram


def check_word(
    raw_word: str,
    input_letters: str,
    input_len: int,
    input_hist: DefaultDict[str, int],
) -> bool:
    """Checks a word's histogram against the input histogram

    >>> check_word('do', 'dog', 3, {'d': 1, 'g': 1, 'o': 1})
    True
    >>> check_word('cat', 'dog', 3, {'d': 1, 'g': 1, 'o': 1})
    False

    :param raw_word: The word under test
    :type raw_word: str
    :param input_letters: The jumbled letters to check against
    :type input_letters: str
    :param input_len: The number of letters in the input. This is
        pre-computed to optimize the performance of the inner loop
    :type input_len: int
    :param input_hist: the histogram of the input letters. This is
        pre-computed to optimize performance
    :type input_hist: dict
    :return: A boolean corresponding to whether the word under test
        contains only letters in the string of input letters
    :rtype: bool
    """
    word = clean(raw_word)

    if word == input_letters:
        return False

    if not word.isalpha():
        return False

    if len(word) > input_len:
        return False

    test_hist = count_letters(word)

    for c in list(word):
        if test_hist[c] > input_hist[c]:
            return False

    return True


def solve_jumble(raw_input: str, wordlist_filename: str) -> List[str]:
    """Solves a jumble using the hashing strategy

    >>> solve_jumble('dog', 'word_list.txt')
    ['do', 'go', 'god']

    :param raw_input: The string of characters to test
    :type raw_input: str
    :param wordlist_filename: The filename from which to read the word
        list to test against
    :type wordlist_filename: str
    :return: All the words in the word list that can be made using only
        letters from the input string
    :rtype: list of str
    """
    input_letters = clean(raw_input)

    if search("[^a-z]", input_letters):
        raise ValueError("Input must be only letters")

    input_len = len(input_letters)
    input_histogram = count_letters(input_letters)

    return [
        word
        for word in fileinput.input((wordlist_filename))
        if check_word(word, input_letters, input_len, input_histogram)
    ]


def main():
    """Runs the jumble solver from the command line

    Usage: python solve_with_hash.py [wordlist_filename] input_letters

    If wordlist_filename is committed, it will default to 'word_list.txt'
    """
    if len(sys.argv) < 3:
        wordlist_filename = "word_list.txt"
        raw_input = sys.argv[1]
    else:
        wordlist_filename = sys.argv[1]
        raw_input = sys.argv[2]

    solution = solve_jumble(raw_input, wordlist_filename)

    for word in solution:
        print(word)


if __name__ == "__main__":
    main()
