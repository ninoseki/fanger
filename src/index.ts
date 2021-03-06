import escapeStringRegexp from "escape-string-regexp";
import { refang as _refang } from "ioc-extractor/dist/aux/auxiliary";
import { extractDomain, extractIPv4 } from "ioc-extractor/dist/aux/extractor";

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

function defangIPs(text: string): string {
  const ipv4s = extractIPv4(text);
  for (const ipv4 of ipv4s) {
    const escaped = escapeStringRegexp(ipv4);
    const regexp = new RegExp(escaped, "g");
    text = text.replace(regexp, replaceDot(ipv4));
  }
  return text;
}

function defangDomains(text: string): string {
  const domains = extractDomain(text).sort().reverse();
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
