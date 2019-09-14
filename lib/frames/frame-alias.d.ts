import { Frame } from "./frame";
import { FrameAtom } from "./frame-atom";
import { FrameNote } from "./frame-note";
import { FrameSymbol } from "./frame-symbol";
export declare class FrameAlias extends FrameAtom {
    static readonly ALIAS_BEGIN = "@";
    protected data: FrameSymbol;
    constructor(source: string, meta?: import("./meta-frame").Context);
    in(contexts?: Frame[]): FrameSymbol | FrameNote;
    string_prefix(): string;
    canInclude(char: string): boolean;
    protected toData(): FrameSymbol;
    protected find(context: Frame, key: string): Frame;
}