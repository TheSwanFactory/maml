#!/usr/bin/env node
import * as getopts from "getopts";
import * as _ from "lodash";
import { execute } from "../execute";
import { HC } from "../execute/hc";
import { Context, Frame, FrameArray, FrameString, NilContext } from "../frames";
import { HChat } from "./hchat";

const options = getopts(process.argv.slice(2), {
  alias: {
    evaluate: "e",
    help: "h",
    interactive: "i",
  },
});

const hc = new HC();
let evaluated = false;
let output: Frame;

if (options.evaluate) {
  output = hc.evaluate(options.evaluate);
  console.log(output);
  evaluated = true;
}

_.each(options._,  (file) => {
  output = hc.exec_file(file);
  console.log(output);
  evaluated = true;
});

if (options.interactive || !evaluated) {
  const status = HChat.iterate(hc);
}
