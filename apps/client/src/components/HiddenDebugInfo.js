import React from "react";

export default ({ children, title }) => (
  <div
    className="hiddendebuginfo"
    style={{ display: "none", background: "#eee", padding: "1em" }}
  >
    <p style={{ fontWeight: "bold", fontSize: "1.2em" }}>{title}</p>
    {children}
  </div>
);
