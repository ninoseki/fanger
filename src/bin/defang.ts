#!/usr/bin/env node
import getStdin from "get-stdin";

import { defang } from "../index";

getStdin().then((str) => {
  const defanged = defang(str);
  process.stdout.write(defanged);
});
