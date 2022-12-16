/* eslint-disable react/function-component-definition */
import React from "react";
import { Story } from "@storybook/react";
import { IProps, Presentation } from "./Presentation";
import { AppWrapper } from "../../../AppWrapper";

export default {
  title: "Components/FormFileInput",
  component: Presentation,
  args: {
    onClear: () => {},
    dropZoneProps: {
      getRootProps: () => {},
      getInputProps: () => {},
    },
  },
};

const Template: Story<IProps> = (args) => (
  <AppWrapper>
    <Presentation {...args} />
  </AppWrapper>
);

export const Default = Template.bind({});
Default.args = {};

export const Progress = Template.bind({});
Progress.args = {
  progress: 45,
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};

export const WithValue = Template.bind({});
WithValue.args = {
  value: "some-file.png",
};

export const WithError = Template.bind({});
WithError.args = {
  error: "Something bad happened",
};

export const Invalid = Template.bind({});
Invalid.args = {
  formClassName: "invalid",
};
