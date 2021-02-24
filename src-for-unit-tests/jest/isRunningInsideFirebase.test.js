const isRunningInsideFirebase = require("../isRunningInsideFirebase");

describe("Check Firebase Running", () => {
  test("should return false", () => {
    expect(isRunningInsideFirebase()).toBe(false);
  });
});
