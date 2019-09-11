import { Frame, FrameNote } from "../frames";
export declare type Counts = {
    [key: string]: number;
};
export declare class HCTest extends Frame {
    protected out: Frame;
    n: Counts;
    constructor(out: Frame);
    call(argument: Frame, parameter?: Frame): Frame;
    assertEqual(expected: string, actual: string, source: string): FrameNote;
}
