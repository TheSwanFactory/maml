import * as _ from "lodash";
import { Frame } from "./frame";
import { FrameQuote } from "./frame-atom";
import { FrameSymbol } from "./frame-symbol";
import { Context, NilContext } from "./meta-frame";

const reducer = (current: Frame, char: string) => {
  const symbol = FrameSymbol.for(char);
  return current.call(symbol);
};

export class FrameString extends FrameQuote {
  public static readonly STRING_BEGIN = "“";
  public static readonly STRING_END = "”";

  constructor(protected data: string, meta: Context = NilContext) {
    super(meta);
  }

  public apply(argument: FrameString) {
    return new FrameString(this.data + argument.data);
  }

  public string_prefix() { return FrameString.STRING_BEGIN; };

  public string_suffix() { return FrameString.STRING_END; };

  public reduce(starter: Frame) {
    const final = _.reduce(this.data, reducer, starter) as Frame;
    const result = final.call(FrameSymbol.end());
    return result;
  }

  protected toData() { return this.data; }

};
