import { defang } from "../index";

describe("defang", () => {
  test("example.com", () => {
    expect(defang("example.com")).toBe("example[.]com");
  });

  test("test.example.com", () => {
    expect(defang("test.example.com")).toBe("test[.]example[.]com");
  });

  test("test@example.com", () => {
    expect(defang("test@example.com")).toBe("test@example[.]com");
  });

  test("http://example.com", () => {
    expect(defang("http://example.com")).toBe("hxxp://example[.]com");
  });

  test("https://example.com", () => {
    expect(defang("https://example.com")).toBe("hxxps://example[.]com");
  });
});
