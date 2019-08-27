#!/usr/bin/env node
import * as getopts from "getopts";
import * as _ from "lodash";
import { HC } from "../execute/hc-class";
import { Frame } from "../frames";
import { HChat } from "./hchat";

const options = getopts(process.argv.slice(2), {
  alias: {
    evaluate: "e",
    help: "h",
    interactive: "i",
  },
});

const hc = new HC(process.env);
let evaluated = false;
let output: Frame;

if (options.evaluate) {
  output = hc.evaluate(options.evaluate);
  console.log(output.toString());
  evaluated = true;
}

_.each(options._,  (file) => {
  output = hc.exec_file(file);
  console.log(output.toString());
  evaluated = true;
});

if (options.interactive || !evaluated) {
  HChat.iterate(hc);
}
