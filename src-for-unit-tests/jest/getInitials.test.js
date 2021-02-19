import getInitials from "../getInitials";

describe("getInitials Func", () => {
  test("input null || undefined || ' ' ", () => {
    // Setup
    const perSon = { name: undefined };
    // Run
    const result = getInitials(perSon);
    // Assert
    expect(result).toBeUndefined();
  });

  test("input string length = 1", () => {
    // Setup
    const perSon = { name: " b " };
    // Run
    const result = getInitials(perSon);
    // Assert
    expect(result).not.toBeNull();
    expect(result).toBe("B"); // perSon.name.trim().split(" ").shift().charAt(0).toUpperCase()
  });

  test("input string length >= 2", () => {
    // Setup
    const perSon = { name: " Nguyen Huu Ton    !-" };
    // Run
    const result = getInitials(perSon);
    // Assert
    expect(result).not.toBeNull();
    expect(result).toBe("N!");
  });
});
