import React from "react";
import { render } from "../utils/test-utils";
import { MemoryRouter } from "react-router-dom";
import withOloRedirect from "./withOloRedirect";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"), // use actual for all non-hook parts
  useParams: () => ({
    slug: "with-redirect"
  })
  // useRouteMatch: () => ({ url: '/company/company-id1/team/team-id1' }),
}));

require("../config").topics = [
  { slug: "with-redirect", redirectToOlo: true },
  { slug: "without-redirect" }
];

const TestPage = () => <div>some page</div>;
const WrappedTestPage = withOloRedirect(TestPage);

describe("TestPage", () => {
  it("renders text", () => {
    const { container } = render(<TestPage />);
    expect(container).toHaveTextContent("some page");
  });
});

describe("withOloRedirect", () => {
  beforeEach(() => {
    console.log("before test");
  });

  it("redirects when needed", () => {
    const { container } = render(
      <MemoryRouter params={{ slug: "with-redirect" }}>
        <WrappedTestPage />
      </MemoryRouter>
    );

    // XXX Check which component is rendered instead of testing the RedirectPage
    expect(container).toHaveTextContent("Wij sturen u automatisch door");
  });

  it("doesn't redirect when needed", () => {
    const { container } = render(
      <MemoryRouter params={{ slug: "without-redirect" }}>
        <WrappedTestPage />
      </MemoryRouter>
    );

    expect(container).toHaveTextContent("some page");
  });
});
