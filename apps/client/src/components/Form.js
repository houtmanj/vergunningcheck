import React from "react";
import styled from "@datapunt/asc-core";
import { useHistory } from "react-router-dom";

const StyledForm = styled.form`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

const Form = ({ children, onSubmit, action, ...rest }) => {
  const history = useHistory();

  return (
    <StyledForm
      onSubmit={e => {
        e.preventDefault();
        if (onSubmit) {
          onSubmit(e);
        }
        if (action) {
          history.push(action);
        }
      }}
      {...rest}
    >
      {children}
    </StyledForm>
  );
};

export default Form;
