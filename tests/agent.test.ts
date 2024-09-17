import { describe, it, expect } from "@jest/globals";
import { _route } from "../src/agent/graph.js";
describe("Routers", () => {
  it("Test route", async () => {
    const res = _route({ messages: [] });
    expect(res).toEqual("callModel");
  }, 100_000);
});
