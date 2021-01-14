#!/usr/bin/env node
import getStdin from "get-stdin";

import { defang } from "../index";

// eslint-disable-next-line @typescript-eslint/no-floating-promises
getStdin().then((str) => {
  const defanged = defang(str);
  process.stdout.write(defanged);
});
