import { refang } from "@/index";

describe("refang", () => {
  it.each([
    ["example[.]com", "example.com"],
    ["test[.]example[.]com", "test.example.com"],
    ["test@example[.]com", "test@example.com"],
    ["https://example[.]com", "https://example.com"],
  ])("should replace [.] by .", (string, expected) => {
    expect(refang(string)).toBe(expected);
  });

  it.each([["example{.}com", "example.com"]])(
    "should replace {.} by .",
    (string, expected) => {
      expect(refang(string)).toBe(expected);
    },
  );

  it.each([
    ["example . com", "example.com"],
    ["test . example . com", "test.example.com"],
  ])("should replace ' . ' by .", (string, expected) => {
    expect(refang(string)).toBe(expected);
  });

  it.each([
    ["hxxp://example[.]com", "http://example.com"],
    ["hxxps://example[.]com", "https://example.com"],
  ])("should replace hxxp:// by http://", (string, expected) => {
    expect(refang(string)).toBe(expected);
  });

  it.each([
    ["example.com", "example.com"],
    ["hxxp", "hxxp"],
    ["hxxps", "hxxps"],
  ])("should replace nothing", (string, expected) => {
    expect(refang(string)).toBe(expected);
  });
});
