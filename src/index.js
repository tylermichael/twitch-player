import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import './assets/index.scss';

// import Perf from 'react-addons-perf';
// Perf.start();

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

// Perf.stop();
// let measurements = Perf.getLastMeasurements();
// Perf.printInclusive(measurements);
// Perf.printExclusive(measurements);
// Perf.printWasted(measurements);