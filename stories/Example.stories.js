import React from 'react';
import App from '../components/App';

export default {
  title: 'Example/App',
  component: App,
};

const template = (args) => {
  return <App {...args} />;
};

export const USL = template.bind({});

USL.args = {
  value: '1',
  options: {
    prefix: 'prefix',
    age: '5s'
  }
};

export const zh = template.bind({})
zh.args = {
  value: 'zh',
  options: {
    prefix: 'this',
    age: '10s'
  }
}

export const empty = template.bind({})