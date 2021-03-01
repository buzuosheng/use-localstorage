import React from 'react';
import App from '../example/index';

export default {
  title: 'app',
  component: App,
};

const template = (args) => {
  return <App {...args} />;
};

export const Test = template.bind({});

Test.args = {
  value: '',
  time: 10000,
};
