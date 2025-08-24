import escapeStringRegexp from "escape-string-regexp";
import { extractIPv4s, refang } from "ioc-extractor";
import { extractDomains } from "ioc-extractor";
import { getTLDs } from "ioc-extractor/dist/aux/tlds";

const tlds = getTLDs();

export { refang };

function replaceDot(text: string): string {
  const refanged = refang(text);
  return refanged.replace(/\./, "[.]");
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
  const chunks = text.split(" ");

  const convertedChunks = chunks.map((chunk) => {
    const refanged = refang(chunk);
    const ipv4s = extractIPv4s(refanged);
    if (ipv4s.length === 1) {
      return replaceDot(refanged);
    }

    return chunk;
  });

  return convertedChunks.join(" ");
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
  text = defangIPs(text);
  text = defangDomains(text);
  text = defangHTTPSchemes(text);

  return text;
}
