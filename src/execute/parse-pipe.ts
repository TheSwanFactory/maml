import { Context, Frame, FrameArray, FrameExpr, FrameSymbol } from "../frames";
import { Terminal } from "./terminals";

export class ParsePipe extends FrameArray {

  protected factory: any;
  protected collector: Array<Frame>;

  constructor(out: Frame, factory: any) {
    const meta: Context = {};
    meta[ParsePipe.kOUT] = out;
    meta[Frame.kEND] = Terminal.end();
    super([], meta);
    this.factory = factory;
    this.collector = [];
  }
  public next(header: boolean): Frame {
    if (this.length() === 0) {
      return this;
    }
    const term = this.asArray();
    const expr = new FrameExpr(term);
    if (header) {
      expr.is.header = true;
    }
    this.reset();
    this.collector.push(expr);
    return this;
  }

  public push(factory: any): Frame {
    const child = new ParsePipe(this, factory);
    return child;
  }

  public pop(factory: any): Frame {
    const parent = this.get(ParsePipe.kOUT) as ParsePipe;
    if (parent.factory !== factory) {
      // throw error
    }
    return parent;
  }

  public finish(terminal: any): Frame {
    const out = this.get(Frame.kOUT);
    const result = this.makeFrame();
    out.call(result);
    out.call(terminal);
    this.reset();
    return result;
  }

  protected makeFrame() {
    const group = new this.factory(this.collector);
    return group;
  }
}
