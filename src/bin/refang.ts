#!/usr/bin/env node
import getStdin from "get-stdin";

import { refang } from "../index";

// eslint-disable-next-line @typescript-eslint/no-floating-promises
getStdin().then((str) => {
  const refanged = refang(str);
  process.stdout.write(refanged);
});
