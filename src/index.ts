import { IOCExtractor } from "ioc-extractor";
import escapeStringRegexp from "escape-string-regexp";

function extractNetworkIOCs(text: string): string[] {
  const ioc = IOCExtractor.getIOC(text);
  const networks: string[] = [];
  return networks
    .concat(ioc.urls)
    .concat(ioc.domains)
    .concat(ioc.ipv4s);
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
