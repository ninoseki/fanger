import { defang } from "../index";

test("defang", () => {
  expect(defang("1.1.1.1")).toBe("1[.]1.1.1");

  expect(defang("example.com")).toBe("example[.]com");
  expect(defang("test.example.com")).toBe("test.example[.]com");
  expect(defang("test@example.com")).toBe("test@example[.]com");
  expect(defang("http://example.com")).toBe("hxxp://example[.]com");
  expect(defang("https://example.com")).toBe("hxxps://example[.]com");

  expect(defang("hoge.example.com")).toBe("hoge.example[.]com");
  expect(defang("apple.com.example.com")).toBe("apple[.]com.example[.]com");
  expect(defang("https://apple.com.example.com")).toBe(
    "hxxps://apple[.]com.example[.]com"
  );
  expect(defang("http://1.1.1.1")).toBe("hxxp://1[.]1.1.1");

  expect(defang("example.none_tld")).toBe("example.none_tld");
});
