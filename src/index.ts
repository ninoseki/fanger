import {
  extractIPv4,
  extractDomain,
  extractURL,
} from "ioc-extractor/dist/aux/extractor";
import escapeStringRegexp from "escape-string-regexp";

function extractNetworkIOCs(text: string): string[] {
  const networks: string[] = [];
  const urls = extractURL(text);
  const domains = extractDomain(text);
  const ipv4s = extractIPv4(text);

  return networks
    .concat(urls)
    .concat(domains)
    .concat(ipv4s);
}

function replaceDots(text: string): string {
  return text.replace(/\./gi, "[.]");
}

function replaceHTTPSchemes(text: string): string {
  return text
    .replace(/http:\/\//gi, "hxxp://")
    .replace(/https:\/\//gi, "hxxps://");
}

export function defang(text: string): string {
  const networkIOCs = extractNetworkIOCs(text);

  for (const ioc of networkIOCs) {
    const escaped = escapeStringRegexp(ioc);
    const regexp = new RegExp(escaped, "g");
    text = text.replace(regexp, replaceHTTPSchemes(replaceDots(ioc)));
  }

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
