const parseDate = require("../parseDate");

describe("Parse Date Func", () => {
  test("input is a number > 0, output not null && date + (value - 2)", () => {
    // Setup
    const number = 100;
    const resultCompare = new Date(1900, 0, number - 1);
    // Run
    const result = parseDate(number);
    // Assert
    expect(result).not.toBeNull();
    expect(result).toMatchObject(resultCompare);
  });

  test("input is a number <= 0", () => {
    // Setup
    const number = -1000;
    const resultCompare = new Date(1899, 11, 30 + number);
    // Run
    const result = parseDate(number);
    // Assert
    expect(result).not.toBeNull();
    expect(result).toMatchObject(resultCompare);
  });

  test("input is a string", () => {
    // Setup
    const str = "Friday, February"; // "Friday, July" // "Yesterday" // " "
    // Run
    const result = parseDate(str, "dd/MMMM/yyyy", new Date()); // * Invalid Date
    // Assert
    expect(result.toString()).toBe("Invalid Date");
  });

  test("input is a string date", () => {
    // Setup
    const strDate = "2020/19/02"; // "2020-19-02" // null // undefined
    // Run
    const result = parseDate(strDate); // * Invalid Date
    // Assert
    expect(result.toString()).toBe("Invalid Date");
  });
});
