import { Frame, FrameArray } from "../frames";
export declare class ParsePipe extends FrameArray {
    collector: Array<Frame>;
    protected factory: any;
    constructor(out: Frame, factory: any);
    next(statement?: boolean): Frame;
    push(factory: any): Frame;
    pop(factory: any): Frame;
    finish(terminal: any): Frame;
    protected makeFrame(): any;
}
