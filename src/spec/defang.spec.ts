import { defang } from "../index";

test("defang", () => {
  expect(defang("example.com")).toBe("example[.]com");
  expect(defang("test.example.com")).toBe("test[.]example[.]com");
  expect(defang("test@example.com")).toBe("test@example[.]com");
  expect(defang("http://example.com")).toBe("hxxp://example[.]com");
  expect(defang("https://example.com")).toBe("hxxps://example[.]com");

  expect(defang("example.none_tld")).toBe("example.none_tld");
});
