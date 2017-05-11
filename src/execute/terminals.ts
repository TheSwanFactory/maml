import { Context, Frame, FrameString, FrameSymbol, NilContext } from "../frames";
import { ICurryFunction } from "../ops";
import { Lex } from "./lex";
import { LexPipe } from "./lex-pipe";

export class Terminal extends Frame {
  public static end() { return new Terminal(terminate); };

  constructor(protected data: ICurryFunction) {
    super(NilContext);
    this.callme = true;
  }

  public apply(argument: Frame, parameter: Frame) {
    return this.data(argument, parameter);
  }

  protected toData(): any { return this.data; }
}

export const terminals: Context = {
};

const perform = (actions: Context) => {
  return (source: Frame, parameter: Frame) => {
    return (source as LexPipe).perform(actions);
  };
};

const performTerminate = perform({finish: Frame.nil});

const terminate: ICurryFunction = (source: Frame, parameter: Frame) => {
  return (source as LexPipe).finish(parameter);
};

terminals[Frame.kEND] = Terminal.end();
terminals["\n"] = new Terminal(perform({next: Frame.nil}));
terminals["("] = new Terminal(perform({push: Frame.nil}));
terminals[")"] = new Terminal(perform({pop: Frame.nil}));
