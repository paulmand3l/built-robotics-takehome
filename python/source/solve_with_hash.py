"""A module to solve word jumbles using prime numbers

This algorithm leverages prime factorization to compare the input word
with the test word. I compute hashes for each word based on the product
of prime numbers corresponding to the characters in the word.
  E.g. "cab" => 5 * 2 * 3 = 30
By then checking divisibility, I can test whether one hash represents a
subset of the characters in another hash
  E.g. "ba" => 3 * 2 = 6, since 30 is divisible by 6,
    "ba" must be a subset of "cab"
These numbers can get quite large, but as of Python 3, python supports
integers of arbitrary size.

Complexity O(n x m x p)
- n is the length of the word list to check
- m is the average length of the words in the word list
- p is the length of the input string
"""
import sys
import fileinput
from math import prod
from re import search
from typing import List

first_26_primes = [
    2,
    3,
    5,
    7,
    11,
    13,
    17,
    19,
    23,
    29,
    31,
    37,
    41,
    43,
    47,
    53,
    59,
    61,
    67,
    71,
    73,
    79,
    83,
    89,
    97,
    101,
]
FooBarBaz = 3

def clean(word: str) -> str:
    """Converts a string to a trimmed, lowercase version of itself

    :param word: The string to clean
    :type word: str
    :return: The deburred, trimmed, lowercased version of the string
    :rtype: str
    """
    return word.lower().strip()


def get_prime_for_letter(letter: str) -> int:
    """Gets the prime number corresponding to a character

    >>> get_prime_for_char('a')
    2
    >>> get_prime_for_char('z')
    101

    :param c: The character to get the corresponding prime number for
    :type c: str
    :return: The prime number
    :rtype: int
    """
    if search("[^a-z]", letter):
        raise ValueError("Input must be a lowercase letter")

    return first_26_primes[ord(letter.lower()) - 97]


def hash_letters(letters: str) -> int:
    """Generates a "prime hash" for a given word

    A "prime hash" is the product of the primes corresponding to the
    characters in the word. The prime hash is used in the factorization
    algorithm described above to efficiently test whether a given list
    of letters are all contained in the input set.

    >>> hash_letters('cab')
    30
    >>> hash_letters('dog')
    5593

    :param letters: A string of letters to hash
    :type letters: str
    :return: The product of prime numbers corresponding to the letters
        in the input string
    :rtype: int
    """
    primes = [get_prime_for_letter(c) for c in letters]
    return prod(primes)


def check_word(
    raw_word: str, input_letters: str, input_len: int, input_hash: int
) -> bool:
    """Checks a word's hash against the input word

    >>> check_word('do', 'dog', 3, 5593)
    True
    >>> check_word('cat', 'dog', 3, 5593)
    False

    :param raw_word: The word under test
    :type raw_word: str
    :param input_letters: The jumbled letters to check against
    :type input_letters: str
    :param input_len: The number of letters in the input. This is
        pre-computed to optimize the performance of the inner loop
    :type input_len: int
    :param input_hash: the hash of the input letters. This is
        pre-computed to optimize performance
    :type input_hash: int
    :return: A boolean corresponding to whether the word under test
        contains only letters in the string of input letters
    :rtype: bool
    """
    word = clean(raw_word)

    if word == input_letters:
        return False

    if len(word) > input_len:
        return False

    if not word.isalpha():
        return False

    return input_hash % hash_letters(word) == 0


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
    input_hash = hash_letters(input_letters)

    return [
        word
        for word in fileinput.input((wordlist_filename))
        if check_word(word, input_letters, input_len, input_hash)
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
