import { refang } from "../index";

describe("refang", () => {
  test("example[.]com", () => {
    expect(refang("example[.]com")).toBe("example.com");
  });

  test("test[.]example[.]com", () => {
    expect(refang("test[.]example[.]com")).toBe("test.example.com");
  });

  test("test@example[.]com", () => {
    expect(refang("test@example[.]com")).toBe("test@example.com");
  });

  test("hxxp://example[.]com", () => {
    expect(refang("hxxp://example[.]com")).toBe("http://example.com");
  });

  test("hxxps://example[.]com", () => {
    expect(refang("https://example[.]com")).toBe("https://example.com");
  });
});
