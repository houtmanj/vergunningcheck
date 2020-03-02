import React from "react";

export default ({ children }) => (
  <div className="hiddendebuginfo" style={{ display: "none" }}>
    {children}
  </div>
);
