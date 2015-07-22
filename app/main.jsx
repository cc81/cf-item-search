"use strict";
import './style/vendor/normalize.css';
import './style/vendor/skeleton.css';
import './style/main.css';

import 'font-awesome-webpack';

import React from 'react';
import App from './components/app';

main();

function main() {
  var app = document.createElement('div');
  document.body.appendChild(app);

  React.render(<App />, app);
}
