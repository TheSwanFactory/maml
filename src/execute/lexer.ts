import * as _ from "lodash";
import { Context, Frame, FrameGroup, FrameString, NilContext } from "../frames";
import { ICurryFunction } from "../ops";
import { Parser } from "./parser";
import { syntax } from "./syntax";

export type LexOptions = { [key: string]: any; };

export class FrameStatement {

}
class LexTerminal extends Frame {
  constructor(protected options: LexOptions) {
    super(NilContext);
    this.callme = true;
  }

  public apply(argument: Frame, parameter: Frame) {
    const source = argument as Lexer;
    const options = parameter as LexOptions;
    return source.finish(options);
  }
}

export class Lexer extends Frame {
  constructor(out: Frame) {
    syntax[Lexer.kOUT] = out;
    super(syntax);
  }

  public lex_string(input: string) {
    const source = new FrameString(input);
    return this.lex(source);
  }

  public lex(source: FrameString) {
    return source.reduce(this);
  }

  public fold(argument: Frame) {
    const out = this.get(Frame.kOUT);
    this.set(Frame.kOUT, out.call(argument));
  }

  public finish(options: LexOptions) {
    return Frame.nil;
  }
}

const parameter: LexOptions = {
  pop: FrameGroup,
  push: FrameGroup,
  wrap: FrameStatement,
};
