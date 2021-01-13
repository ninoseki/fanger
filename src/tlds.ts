import { getTLDRegExpString } from "ioc-extractor/dist/aux/tlds";

const tldRegexString = getTLDRegExpString();

export const tlds: string[] = tldRegexString.split("|");
