import { defang } from "../index";

describe("defang", () => {
  it.each([
    ["1.1.1.1", "1[.]1.1.1"],
    ["127.0.0.1", "127[.]0.0.1"],
  ])("should replace the first dot", (string, expected) => {
    expect(defang(string)).toBe(expected);
  });

  it.each([
    ["example.com", "example[.]com"],
    ["test.example.com", "test.example[.]com"],
    ["test@example.com", "test@example[.]com"],
    ["test@example.com", "test@example[.]com"],
    ["hoge.example.com", "hoge.example[.]com"],
    ["apple.com.example.com", "apple[.]com.example[.]com"],
    ["test.co.jp.example.com", "test[.]co[.]jp.example[.]com"],
    ["example.none_tld", "example.none_tld"],
  ])("should replace the dot before TLD", (string, expected) => {
    expect(defang(string)).toBe(expected);
  });

  it.each([
    ["http://example.com", "hxxp://example[.]com"],
    ["https://example.com", "hxxps://example[.]com"],
    ["https://apple.com.example.com", "hxxps://apple[.]com.example[.]com"],
    ["http://1.1.1.1", "hxxp://1[.]1.1.1"],
  ])("should replace http schemes", (string, expected) => {
    expect(defang(string)).toBe(expected);
  });

  it.each([["1[.]1.1.1", "1[.]1.1.1"]])(
    "should replace nothing when it is already defanged",
    (string, expected) => {
      expect(defang(string)).toBe(expected);
    }
  );

  it.each([
    ["1[.]1[.]1.1", "1[.]1.1.1"],
    ["test[] 1[.]1[.]1.1", "test[] 1[.]1.1.1"],
    ["test[.] 1[.]1[.]1.1", "test[.] 1[.]1.1.1"],
    ["test[.]com 1[.]1[.]1.1", "test[.]com 1[.]1.1.1"],
  ])(
    "should adjust format even if it is already defanged",
    (string, expected) => {
      expect(defang(string)).toBe(expected);
    }
  );
});
