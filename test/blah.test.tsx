import React from 'react';
import * as ReactDOM from 'react-dom';
import { USL } from '../stories/Example.stories.js';

describe('Thing', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<USL />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
