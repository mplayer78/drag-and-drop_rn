import React from "react";
import renderer from "react-test-renderer";

import App from "./App";

describe("<App/>", () => {
  it("Adds 2 and 2", () => {
    const x = 2 + 2;
    expect(x).toEqual(4);
  });
});
