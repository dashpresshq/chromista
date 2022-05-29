import React from 'react';
import { Story } from '@storybook/react';
import { Tabs, IProps } from '.';
import { AppWrapper } from '../../AppWrapper';

export default {
  title: 'Components/Tabs',
  component: Tabs,
  args: {
    contents: [
      {
        label: 'Foo',
        content: <p>Foo Content</p>,
      },
      {
        label: 'Bar',
        content: <p>Bar Content</p>,
      },
      {
        label: 'Baz',
        content: <p>Baz Content</p>,
      },
    ],
  },
};

const Template: Story<IProps> = args => (
  <AppWrapper>
    <Tabs {...args} />
  </AppWrapper>
);

export const Default = Template.bind({});
Default.args = {};