import React from "react";
export const defaultValues = {
  topic: null,
  config: {
    autofill: {
      flashMessage: true,
      disableInputs: false,
      skipQuestions: false,
      skipRegisterPage: true,
    },
  },
  data: {},
  checker: null,
};
export default React.createContext();
