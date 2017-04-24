
import { expect } from "chai";
import {} from "mocha";
import { EvalPipe } from "../../src/execute/eval-pipe";
import * as lex from "../../src/execute/lex-pipe";
import * as parse from "../../src/execute/parse-pipe";
import * as frame from "../../src/frames";

describe("EvalPipe", () => {
  const strA = new frame.FrameString("A");
  const strB = new frame.FrameString("B");
  const expr = new frame.FrameExpr([strA, strB]);
  const out: frame.FrameArray;
  const pipe: EvalPipe;

  beforeEach(() => {
    out = new frame.FrameArray([]);
    pipe = new EvalPipe(out);
  });

  it("is exported", () => {
    expect(EvalPipe).to.be.ok;
  });

  it("is constructed from an out parameter", () => {
    expect(pipe).to.be.ok;
  });

  it("evaluates arguments", () => {
    const result = pipe.call(expr);
    expect(result.toString()).to.equal("“AB”");
  });

  it("stores result in out", () => {
    expect(out.size()).to.equal(0);
    const result = pipe.call(expr);
    expect(out.size()).to.equal(1);
    expect(out.at(0)).to.equal(result);
  });
});
