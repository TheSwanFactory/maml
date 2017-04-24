import { Frame } from "./frame";
import { FrameComment } from "./frame-comment";
import { FrameList } from "./frame-list";
import { Context, NilContext } from "./meta-frame";

export class FrameExpr extends FrameList {
  constructor(data: Array<Frame>, meta = NilContext) {
    super(data, meta);
    data.forEach((item) => { item.up = this; });
  }

  public in(contexts = [Frame.nil]) {
    contexts.push(this);
    return this.data.reduce((sum: Frame, item: Frame) => {
      const value = item.in(contexts);
      if (value.isVoid()) {
        return sum;
      }
      return sum.call(value);
    }, Frame.nil);
  }

  public call(argument: Frame, parameter = Frame.nil) {
    return this.in([argument, parameter]);
  };

  public toStringDataArray(): string[] {
    const array = super.toStringDataArray();
    return [array.join(" ")];
  }
};
