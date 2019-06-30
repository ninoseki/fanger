function replaceDots(text: string): string {
  return text.replace(/\./gi, "[.]");
}

function replaceHTTPSchemes(text: string): string {
  return text
    .replace(/http:\/\//gi, "hxxp://")
    .replace(/https:\/\//gi, "hxxps://");
}

export function defang(text: string): string {
  return replaceHTTPSchemes(replaceDots(text));
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
