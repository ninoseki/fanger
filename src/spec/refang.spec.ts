import { refang } from "../index";

test("refang", () => {
  expect(refang("example[.]com")).toBe("example.com");
  expect(refang("test[.]example[.]com")).toBe("test.example.com");
  expect(refang("test@example[.]com")).toBe("test@example.com");
  expect(refang("hxxp://example[.]com")).toBe("http://example.com");
  expect(refang("https://example[.]com")).toBe("https://example.com");

  expect(refang("example.com")).toBe("example.com");

  expect(refang("hxxp")).toBe("hxxp");

  expect(refang("example . com")).toBe("example.com");
});
