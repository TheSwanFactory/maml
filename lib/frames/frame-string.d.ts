import { Context, FrameArray } from "./frame";
export declare class FrameString extends FrameArray {
    static readonly BEGIN_STRING: string;
    static readonly END_STRING: string;
    constructor(JSstring: string, meta?: Context);
    apply(argument: FrameString): this;
    toStringData(): string;
    toString(): string;
}
