import "@testing-library/jest-dom";
import * as React from "react";
import { act, render, screen, waitFor } from "@testing-library/react";
import App from "src/App";

test("FHMApp is rendering", async () => {
  const testMessage = "FHMApp";
  act(() => {
    render(<App />);
  });
  await waitFor(() => {
    expect(screen.queryByText(testMessage)).toBeInTheDocument();
  });
});
