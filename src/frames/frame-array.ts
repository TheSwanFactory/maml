import { Frame, FrameList, Void } from "./frame";

export class FrameArray extends FrameList {
  public static readonly BEGIN_ARRAY = "[";
  public static readonly END_ARRAY = "]";

  constructor(data: Array<Frame>, meta = Void) {
    super(data, meta);
  }

  public string_open() { return FrameArray.BEGIN_ARRAY; };
  public string_close() { return FrameArray.END_ARRAY; };

  public in(context = Frame.nil): Frame {
    return new FrameArray(this.data.map((f) => { return f.in(context); }));
  }

  public at(index: number) {
    return this.data[index];
  }
}