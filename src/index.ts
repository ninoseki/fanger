import escapeStringRegexp from "escape-string-regexp";
import { refang as _refang } from "ioc-extractor";
import { extractDomains } from "ioc-extractor";
import { dedup, sortByValue } from "ioc-extractor/dist/src/aux/auxiliary";

import { tlds } from "./tlds";

export function refang(text: string): string {
  return _refang(text);
}

function replaceDot(text: string): string {
  const refanged = refang(text);
  return refanged.replace(/\./i, "[.]");
}

function replaceDotBeforeTLD(text: string): string {
  const refanged = refang(text);
  const parts: string[] = refanged.split(".");
  let replaced: string[] = [];

  for (const part of parts) {
    const prefix = tlds.includes(part) ? "[.]" : ".";
    replaced = replaced.concat([prefix, part]);
  }
  replaced.shift();

  return replaced.join("");
}

function matchesWithRegExp(s: string, regexp: RegExp): string[] {
  // eslint-disable-next-line @typescript-eslint/prefer-regexp-exec
  const matched = s.match(regexp);
  return matched === null ? [] : sortByValue(dedup(matched));
}

const getIPv4RegExpString = (): string => {
  return "(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\[?\\.]?){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)";
};

const getIPv4RegExp = (): RegExp => {
  const ipv4 = getIPv4RegExpString();
  return new RegExp(ipv4, "gi");
};

function extractIPv4s(s: string): string[] {
  const regexp = getIPv4RegExp();
  return matchesWithRegExp(s, regexp);
}

function defangIPs(text: string): string {
  const ipv4s = extractIPv4s(text);

  for (const ipv4 of ipv4s) {
    const escaped = escapeStringRegexp(ipv4);
    const regexp = new RegExp(escaped, "g");
    text = text.replace(regexp, replaceDot(ipv4));
  }
  return text;
}

function defangDomains(text: string): string {
  const domains = extractDomains(text).sort().reverse();
  for (const domain of domains) {
    const escaped = escapeStringRegexp(domain);
    const regexp = new RegExp(escaped, "g");
    text = text.replace(regexp, replaceDotBeforeTLD(domain));
  }
  return text;
}

function defangHTTPSchemes(text: string): string {
  return text
    .replace(/http:\/\//gi, "hxxp://")
    .replace(/https:\/\//gi, "hxxps://");
}

export function defang(text: string): string {
  text = defangHTTPSchemes(text);
  text = defangIPs(text);
  text = defangDomains(text);
  return text;
}
