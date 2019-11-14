"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const frame_atom_1 = require("./frame-atom");
const meta_frame_1 = require("./meta-frame");
class FrameBytes extends frame_atom_1.FrameQuote {
    constructor(values, meta = meta_frame_1.NilContext) {
        super(meta);
        this.data = new Uint8Array(values);
        this.length = values.length;
    }
    string_prefix() { return FrameBytes.BYTES_BEGIN; }
    ;
    string_suffix() { return FrameBytes.BYTES_END; }
    ;
    toStringData() {
        return this.string_prefix() + this.length + this.string_suffix() + this.toData();
    }
    toData() {
        let s = "";
        this.data.forEach((value) => {
            s = s + String.fromCharCode(value);
        });
        return s;
    }
}
exports.FrameBytes = FrameBytes;
FrameBytes.BYTES_BEGIN = "\\";
FrameBytes.BYTES_END = "\\";
;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWUtYnl0ZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvZnJhbWVzL2ZyYW1lLWJ5dGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsNkNBQTBDO0FBQzFDLDZDQUFtRDtBQUVuRCxNQUFhLFVBQVcsU0FBUSx1QkFBVTtJQU94QyxZQUFZLE1BQWdCLEVBQUUsT0FBZ0IsdUJBQVU7UUFDdEQsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ1osSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNuQyxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUM7SUFDOUIsQ0FBQztJQUVNLGFBQWEsS0FBSyxPQUFPLFVBQVUsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO0lBQUEsQ0FBQztJQUVuRCxhQUFhLEtBQUssT0FBTyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztJQUFBLENBQUM7SUFFakQsWUFBWTtRQUNqQixPQUFPLElBQUksQ0FBQyxhQUFhLEVBQUUsR0FBRyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxhQUFhLEVBQUUsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDbkYsQ0FBQztJQUVTLE1BQU07UUFDZCxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDWCxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO1lBQzFCLENBQUMsR0FBRyxDQUFDLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUNwQyxDQUFDLENBQUMsQ0FBQztRQUNILE9BQU8sQ0FBQyxDQUFDO0lBQ1gsQ0FBQzs7QUEzQkgsZ0NBNkJDO0FBNUJ3QixzQkFBVyxHQUFHLElBQUksQ0FBQztBQUNuQixvQkFBUyxHQUFHLElBQUksQ0FBQztBQTJCekMsQ0FBQyJ9