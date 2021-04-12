import { ApplicationInsights } from '@microsoft/applicationinsights-web';
import 'array-flat-polyfill';
import React from 'react';
import ReactDOM, { render } from 'react-dom';
import App from './App';
import './index.css';

if (process.env.NODE_ENV === 'development') {
  const axe = require('@axe-core/react');
  axe(React, ReactDOM, 3000);
}

if (process.env.REACT_APP_INSIGHTS_INSTRUMENTATION_KEY) {
  const appInsights = new ApplicationInsights({
    config: {
      instrumentationKey: process.env.REACT_APP_INSIGHTS_INSTRUMENTATION_KEY,
    },
  });
  appInsights.loadAppInsights();
  appInsights.trackPageView();
}

render(<App />, document.getElementById('root'));
