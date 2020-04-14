import React from "react";
import { createMemoryHistory } from "history";
import "@testing-library/jest-dom/extend-expect";

import Router from "../components/Router";
import { render, fireEvent, cleanup, screen } from "../utils/test-utils";
import Context from "../__mocks__/context";

import { topics } from "../config";
import LocationPage from "./LocationPage";

afterEach(cleanup);

describe("<LocationPage />", () => {
  window.scrollTo = jest.fn();
  window.history.pushState({}, "Locatie pagina", "/dakkapel-plaatsen/locatie");
  const topicMock = "dakkapel-plaatsen";
  const topic = topics.filter((t) => t.slug === topicMock)[0];
  const addressMock = {
    postalCode: "1055xd",
    houseNumberFull: "19c",
  };

  const Wrapper = () => {
    const history = createMemoryHistory();
    return (
      <Router history={history}>
        <LocationPage />
      </Router>
    );
  };

  const WrapperWithContext = () => {
    return (
      <Context topicMock={topic} addressMock={addressMock}>
        <Wrapper />
      </Context>
    );
  };

  it("renders correctly on first load", () => {
    const { container } = render(<Wrapper />);

    expect(screen.getByText(topic.text.locationIntro + ".")).toBeTruthy();
    expect(screen.getByText("Postcode")).toBeTruthy();
    expect(screen.getByText("Huisnummer")).toBeTruthy();

    const postalCode = container.querySelector('input[name="postalCode"]');
    expect(postalCode).toBeTruthy();
    expect(postalCode.value).toBe("");

    const houseNumberFull = container.querySelector(
      'input[name="houseNumberFull"]'
    );
    expect(houseNumberFull).toBeTruthy();
    expect(houseNumberFull.value).toBe("");
  });

  it("can navigate with prev and next buttons", async () => {
    render(<Wrapper />);

    expect(window.scrollTo).toBeCalledWith(0, 0);
    expect(window.location.pathname).toBe("/dakkapel-plaatsen/locatie");

    const prevButton = screen.getByText("Vorige");
    expect(prevButton).toBeTruthy();
    expect(prevButton.type).toEqual("button");

    const nextButton = screen.getByText("Volgende");
    expect(nextButton).toBeTruthy();
    expect(nextButton.type).toEqual("submit");

    // Navigate to previous page (IntroPage)
    fireEvent.click(prevButton);

    expect(window.scrollTo).toBeCalledWith(0, 0);
    expect(window.location.pathname).toBe("/dakkapel-plaatsen");

    // Navigate to next page (LocationPage)
    fireEvent.click(screen.getByText("Volgende"));

    expect(window.scrollTo).toBeCalledWith(0, 0);
    expect(window.location.pathname).toBe("/dakkapel-plaatsen/locatie");
  });

  it("renders correctly with predefined context", async () => {
    const { container } = render(<WrapperWithContext />);

    // Compare postalCode with context mock
    const postalCode = container.querySelector('input[name="postalCode"]');
    expect(postalCode).toBeTruthy();
    expect(postalCode.value).toBe(addressMock.postalCode);

    // Compare houseNumberFull with context mock
    const houseNumberFull = container.querySelector(
      'input[name="houseNumberFull"]'
    );
    expect(houseNumberFull).toBeTruthy();
    expect(houseNumberFull.value).toBe(addressMock.houseNumberFull);
  });
});
