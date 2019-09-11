
import { expect } from "chai";
import { } from "mocha";
import { HCEval } from "../../src/execute/hc-eval";
import { HCTest } from "../../src/execute/hc-test";
import * as frame from "../../src/frames";

  describe.only("HCTest", () => {
    let out: frame.FrameArray;
    let test: HCTest;
    let hc_eval: HCEval;
    beforeEach(() => {
      out = new frame.FrameArray([]);
      test = new HCTest(out);
      hc_eval = new HCEval(test);
    });

    it("sets source on out when called with input string", () => {
      hc_eval.call("; .abc");
      const result = test.get(HCEval.SOURCE);
      expect(result.toString()).to.equal("“.abc”");
    });

    it("sets expected on out when called with an output string", () => {
      hc_eval.call("# 123");
      const result = test.get(HCEval.EXPECT);
      expect(result.toString()).to.equal("“123”");
    });

    it("test returns FrameNote.pass if expected == actual", () => {
      const result = test.assertEqual("123", "123", "abc");
      expect(result.toString()).to.equal("$+.test-pass “abc +123”;");
    });

    it("test returns FrameNote.fail if expected != actual", () => {
      const result = test.assertEqual("123", "456", "abc");
      expect(result.toString()).to.equal("$-.test-fail “abc +123 -456”;");
    });

});
