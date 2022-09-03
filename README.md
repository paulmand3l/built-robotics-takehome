## Overview

This repository was created in response to a take home coding challenge from [Built Robotics](https://www.builtrobotics.com/).

The original challenge was to write a python script to solve [word jumbles](https://en.wikipedia.org/wiki/Jumble). A word jumble is a puzzle where you try to find all the words that can be created with a subset of a set of given letters. E.g. if given the letters "bat", the solution would be ['at', 'tab'].

There are a variety of different specific rules you can apply to word jumbles, but this solution takes the "classic" approach:
- Input strings don't need to be valid words and can just be a series of letters
- Input strings can be upper case, lower case, and include "burred" letters (e.g. é), but may not contain spaces or punctuation
- "Burred" letters in the input will be "deburred" to their ascii equivalent (e.g. é -> e)
- The solution should not include the input word
- Solution words can only use each letter in the input word once (e.g. 'madam' is not a valid solution for 'mad', but 'book' is a valid solution to 'boko')

I originally sketched out [solutions in repl.it](https://replit.com/@PaulMandel/VioletredTanUpgrade#main.py) but since I was getting [sub-1-second solution performance](https://www.nngroup.com/articles/response-times-3-important-limits/) and I'm more of a designer anyway, I decided to take things a step further. I ported the solutions over into javascript and made a little react app to host the solution on the web, wrapped in a nice interface very heavily inspired by Built's website.

![mockups](https://user-images.githubusercontent.com/382427/188241350-2fcbbfe0-060e-4caa-9500-73fe1c01e31d.png)

It's fully responsive and has been tested across a variety of screen sizes and resolutions.

## Solution(s)

To actually solve the word jumble, I tried two approaches. I initially sketched these out in python on [repl.it](https://replit.com/@PaulMandel/VioletredTanUpgrade#main.py) to get a baseline performance comparison and get a feel for the algorithms. The three algorithms I tried are as follows:

1. Prime factorization

This strategy leverages prime factorization to compare the input word with the test word. I compute hashes for each word based on the product of prime numbers corresponding to the characters in the word.
  E.g. "cab" => 5 * 2 * 3 = 30
By then checking divisibility, I can test whether one hash represents a subset of the characters in another hash
  E.g. "ba" => 3 * 2 = 6, since 30 is divisible by 6, "ba" must be a subset of "cab"
These numbers can get quite large, but as of python 3, chrome 67 and safari 14, both python and javascript provide support for arbitrarily large integers.

A documented python version of this approach is available [here](https://gist.github.com/paulmand3l/36ecbbd3c13075a71928450d253c26fd)

2. Word histograms

This strategy leverages letter counts to compare the input word with the test word. I create lookup tables (plain objects) for each word that map each letter in the word to the number of times the letter appears in the word
  E.g. "cab" => { a: 1, b: 1, c: 1}
To test, I compare the values in the two lookup tables for each letter in the word under test
  E.g. "ba" => { a: 1, b: 1 }, since the number of a's and b's in this lookup table is less than the number of a's and b's in the lookup table for "cab", "ba" must be a subset of "cab"

A documented python version of this approach is availalbe [here](https://gist.github.com/paulmand3l/633066481d5578f957fa83b44554a20a)

## Performance & Complexity

The three input parameters we need to consider for complexity analysis are the:
1. The length of the word list (the given corpus is ~50k words)
2. The length of the words in the word list (the given corpus has a max word length of 22 characters)
3. THe length of the input string (since duplicate letters are allowed, this is potentially very long!)

Both algorithms work in two parts: pre-processing the input and word list into comparable entities, then looping through each word in the word list and comparing it to the input. Let's look at these two parts separately:

### Preprocessing

Both algorithms pre-process the word list into comparable entities (computing the product of primes for the "hashing" algorithm and computing the letter histograms for the "histogram" algorithm. I've written this as a separate step so that it can be done offline. In "production", this preprocessing step happens once on page load and the results are stored so ensuing comparisons can avoid re-processing the word list each time.

![preprocessing_performance](https://user-images.githubusercontent.com/382427/188246652-6f7ee637-6643-44db-a8bf-cc400c2bd440.png)

Generating the hashes and histograms are both O(n) with input string length.

### Solving

![solution_performance](https://user-images.githubusercontent.com/382427/188245221-a98183de-0f53-41b3-b6e9-b3f6cc584397.png)

The solve step consists of a single round of comparing the input to each word in the list. This implies that for a given input, both algorithms are O(n) with the length of the word list (assuming the different word lists don't have significantly longer or shorter words).

Both algorithms also offer early exits if the word under test is longer than the input string (which would imply that it necessarily includes letters that aren't in the input string), significantly boosting performance for short input strings.

However, the algorithms differ in complexity relative to the input string. The histogram algorithm only needs to check the letters in the word under test, so it is O(n) with the length of the word under test but O(1) with the length of the input string. Since the hashing algorithm must compute remainders against the hash of the full input string, it scales as O(n * m) of the length of the word under test and the length of the input string.

That said, as you can see above, for shorter input strings the hashing algorithm is emperically about 20% faster (at least in Node.js v16.17.0 running on my my 2013 15" Macbook Pro), so in production the solver uses the hashing algorithms for inputs up to 120 characters and the histogram algorithm for inputs 120 characters or longer.

## Development

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

In building this project I aimed for speed over efficiency, and so made heavy use of my [react component generator](https://marketplace.visualstudio.com/items?itemName=CraftyAsTheFox.NewReactComponentMenuItem). I also used this project as an excuse to update the react component generator with some new features (including functional components, typescript, and scss support), which is why you might see a few inconsistencies with the component boilerplate.

Since this is based on CRA, the standard CRA scripts are available:
- `yarn start` starts the development server at [http://localhost:3000](http://localhost:3000)
- `yarn build` builds a distributable version of the code
- `yarn test` runs the [suite of tests I wrote for the solver](https://github.com/paulmand3l/built-robotics-takehome/blob/main/src/App/JumbleSolver/solve.test.ts)

I also added an additional command:
- `yarn perf` runs the performance tests on the hashing functions and solvers and outputs the results to text files for further analysis.

## Deployment

This project has been integrated into the [Vercel hosting platform](https://vercel.com/), so updates are automatically deployed anytime I push to the `main` branch.
