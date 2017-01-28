import * as _ from "lodash";
import { Context, Frame, FrameArray, FrameLazy, FrameString, FrameSymbol, Void } from "../frames";
import { Lex, LexComment, LexSpace, LexString } from "./lex";

const lex_routes = {
  " ": new LexSpace(),
  "#": new LexComment(),
  "“": new LexString(),
};

class EvalPipe extends Frame {
  constructor(out: Frame, meta: Context = Void) {
    meta[Lex.kOUT] = out;
    super(meta);
  }
}

class ParsePipe extends Frame {
  constructor(out: Frame, meta: Context = Void) {
    meta[Lex.kOUT] = out;
    super(meta);
  }
}

class LexPipe extends Frame {
  constructor(out: Frame, meta: Context = Void) {
    meta[Lex.kOUT] = out;
    super(meta);
  }
}

const piper = (input: string, context = Void): Frame => {
  const source = new FrameString(input);
  const result = new FrameArray([], context); // store the result
  const evaluator = new EvalPipe(result); // evaluate expressions in context
  const parser = new ParsePipe(evaluator); // assemble tokens into expressions
  const lexer = new LexPipe(parser, lex_routes); // convert string into tokens

  const status = source.reduce(lexer);
  if (status !== lexer) {
    console.error(`\n* pipe returned ${status}`);
  }
  return result;
};

export const framify = (input: string, context = Void): Frame => {
  const env = new Frame(context);
  const codify = new FrameLazy([]);
  const expr = pipe(input, codify);
  return expr.call(env);
};

export const framify_new = (input: string, context = Void): Frame => {
  const result = new FrameArray([], context);
  const parser = new ParsePipe(result);
  const status = pipe(input, parser);
  console.error(`\n* framify_new.pipe returned ${status}`);
  const expr = result.at(0);
  return expr.call(result);
};

const pipe = (input: string, out: Frame): Frame => {
  const output = new FrameArray([]);
  const router = new LexPipe(output, lex_routes);

  const status: Frame = _.reduce(input, pipeline, router);
  if (status !== router) {
    console.error(`\n* pipe returned ${status}`);
  }
  return out.call(output);
};

const pipeline = (current: Frame, char: string): Frame => {
  const frameChar = FrameSymbol.for(char);
  // console.error(`* pipeline ${current}.call(${frameChar})`);
  const next = current.call(frameChar);
  // console.error(`** -> ${next}`);
  return next;
};
