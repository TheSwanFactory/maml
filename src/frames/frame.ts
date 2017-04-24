import * as _ from "lodash";

export type Context = { [key: string]: Frame; };
export interface IKeyValuePair extends ReadonlyArray<string | Frame > { 0: string; 1: Frame; }
export const NilContext: Context = {};

export class Frame {
  public static readonly kOUT = ">>";
  public static readonly kEND = "$$";
  public static readonly BEGIN_EXPR = "(";
  public static readonly END_EXPR = ")";
  public static readonly nil = new Frame(NilContext, true);
  public static readonly missing: Frame = new Frame({
    missing: Frame.nil,
  });
  public static globals = Frame.missing;

  public up: Frame;
  public callme: boolean;
  constructor(private meta = NilContext, isNil = false) {
    this.up = Frame.missing;
    this.callme = false;
    if (isNil) {
      this.called_by = (context: Frame, parameter: Frame) => {
        return context;
      };
    }
  }

  public string_open() { return Frame.BEGIN_EXPR; };
  public string_close() { return Frame.END_EXPR; };

  public get_here(key: string, origin: Frame = this): Frame {
    const result = this.meta[key];
    if (result != null) { return result; };
    return Frame.missing;
  }

  public get(key: string, origin: Frame = this): Frame {
    const result = this.get_here(key, origin);
    if (result !== Frame.missing) { return result; };

    let source = this.up || Frame.globals;
    if (source === Frame.missing) {
      if (Frame.globals === Frame.missing) { return Frame.missing; };
      source = Frame.globals;
    }
    return source.get(key, origin);
  }

  public set(key: string, value: Frame): Frame {
    if (this.meta === NilContext) {
      this.meta = {};
    }
    this.meta[key] = value;
    return this;
  }

  public at(index: number) {
    return Frame.nil;
  }

  public in(contexts = [Frame.nil]): Frame {
    return this;
  }

  public apply(argument: Frame, parameter: Frame) {
    return argument;
  }

  public called_by(context: Frame, parameter: Frame) {
    return context.apply(this, parameter);
  }

  public call(argument: Frame, parameter = Frame.nil) {
    return argument.called_by(this, parameter);
  }

  public meta_copy(): Context {
    return _.clone(this.meta);
  }

  public meta_keys() {
    return _.keys(this.meta);
  }

  public meta_length() {
    return this.meta_keys().length;
  }

  public meta_pairs(): Array<IKeyValuePair> {
    return _.map(this.meta, (value, key): IKeyValuePair => {
      return [key, value];
    });
  }

  public meta_string() {
    return this.meta_pairs().map(([key, value]) => {
      return `.${key} ${value};`;
    }).join(" ");
  }

  public toString() {
    return this.string_open() + this.meta_string() + this.string_close();
  }

  public asArray(): Array<Frame> {
    return _.castArray(this);
  }

  public isVoid() {
    return false;
  }
};
