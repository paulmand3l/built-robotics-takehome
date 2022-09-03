import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import 'styles/reset.scss';
import 'styles/fonts.scss';
import 'styles/styles.scss';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

console.log(' ');
console.log('~~ Hi! ~~');
console.log('Thanks for taking a look behind the curtain');
console.log(
  'You can see the full code hosted here: https://github.com/paulmand3l/built-robotics-takehome'
);
console.log(
  'And this is the file that does the heavy lifting when actually solving the jumbles: https://github.com/paulmand3l/built-robotics-takehome/blob/main/src/App/JumbleSolver/solve.ts'
);
console.log(' ');
console.log(
  "When the hashing algorithm is used, you'll see the generated hashes here; hopefully that will give you a better sense for how it works."
);
console.log(' ');
console.log(
  "PS - if you haven't already, you should try clicking on the 'Built by Paul' logo!"
);
