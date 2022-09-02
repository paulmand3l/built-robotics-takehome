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

## Solution

## Performance

## Development

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

In building this project I aimed for speed over efficiency, and so made heavy use of my [react component generator](https://marketplace.visualstudio.com/items?itemName=CraftyAsTheFox.NewReactComponentMenuItem). I also used this project as an excuse to update the react component generator with some new features (including functional components, typescript, and scss support), which is why you might see a few inconsistencies with the component boilerplate.

Since this is based on CRA, the standard CRA scripts are available:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Deployment

This project has been integrated into the [Vercel hosting platform](https://vercel.com/), so updates are automatically deployed anytime I push to the `main` branch.
