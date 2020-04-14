import { useContext } from "react";
import Context from "../context";
import { topics } from "../config";

export default ({ children, topicMock = "dakraam-plaatsen", addressMock }) => {
  const context = useContext(Context);
  context.topic = topics.find((t) => t.slug === topicMock);
  if (addressMock) {
    context.address = addressMock;
  }
  return children;
};
