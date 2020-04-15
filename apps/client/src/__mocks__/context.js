import { useContext } from "react";
import Context from "../context";
import { topics } from "../config";

export default ({ children, topicMock = "dakraam-plaatsen" }) => {
  const context = useContext(Context);
  context.topic = topics.find((t) => t.slug === topicMock);
  return children;
};
