import { extractIPv4, extractDomain } from "ioc-extractor/dist/aux/extractor";
import escapeStringRegexp from "escape-string-regexp";
import tlds from "tlds";

function replaceDot(text: string): string {
  return text.replace(/\./i, "[.]");
}

function replaceDotBeforeTLD(text: string): string {
  const parts: string[] = text.split(".");
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
  const domains = extractDomain(text);
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
  text = refang(text);
  text = defangHTTPSchemes(text);
  text = defangIPs(text);
  text = defangDomains(text);
  return text;
}

export function refang(text: string): string {
  return text
    .replace(/\[\.\]/gi, ".")
    .replace(/\[\./gi, ".")
    .replace(/\.\]/gi, ".")
    .replace(/\(\.\)/gi, ".")
    .replace(/\(\./gi, ".")
    .replace(/\.\)/gi, ".")
    .replace(/\[:/gi, ":")
    .replace(/:\]/gi, ":")
    .replace(/\\\./gi, ".")
    .replace(/\[\/\]/gi, "/")
    .replace(/hxxp/gi, "http")
    .replace(/\[(at|@)\]/gi, "@")
    .replace(/\((at|@)\)/gi, "@")
    .replace(/(\[|\()dot(\]|\))/gi, ".");
}
