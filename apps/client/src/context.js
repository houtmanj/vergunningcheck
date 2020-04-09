import React from "react";
export const defaultValues = {
  topic: null,
  config: {
    autofill: {
      flashMessage: true,
      disableInputs: true, // no user-overrides implemented yet
      skipQuestions: false,
      skipRegisterPage: true,
    },
  },
  data: {},
  checker: null,
};
export default React.createContext();
