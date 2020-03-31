import React from "react";
export const defaultValues = {
  topic: null,
  config: {
    autofill: {
      flashMessage: true,
      disableInputs: true,
      skipQuestions: true,
      skipRegisterPage: true
    }
  },
  data: {},
  checker: null
};
export default React.createContext();
