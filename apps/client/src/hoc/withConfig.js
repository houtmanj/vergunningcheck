import React, { useContext } from "react";
import Context from "../context";

const withConfig = Component => () => {
  const { config } = useContext(Context);

  return <Component config={config} />;
};

export default withConfig;
