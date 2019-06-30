#!/usr/bin/env node
import getStdin from "get-stdin";

import { refang } from "../index";

getStdin().then(str => {
  const refanged = refang(str);
  process.stdout.write(refanged);
});
