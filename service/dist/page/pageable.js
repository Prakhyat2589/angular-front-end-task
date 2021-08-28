"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pageable = void 0;
const sort_1 = require("./sort");
class Pageable {
    constructor(page, size, sort) {
        this.page = page;
        this.size = size;
        this.sort = sort;
    }
    static from(obj, def) {
        const page = Number(obj.page) || def.page;
        const size = Number(obj.size) || def.size;
        const sort = sort_1.Sort.from(obj.sort) || def.sort;
        return new Pageable(page, size, sort);
    }
}
exports.Pageable = Pageable;
//# sourceMappingURL=pageable.js.map