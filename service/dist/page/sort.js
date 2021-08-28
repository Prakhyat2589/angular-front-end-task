"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Direction = exports.Sort = void 0;
class Sort {
    constructor(field, direction) {
        this.field = field;
        this.direction = direction;
    }
    static from(s) {
        if (s && typeof s === 'string') {
            const c = s.split(',');
            if (c.length === 2 && c[1].match(/(asc|desc)/i)) {
                const direction = c[1].toLowerCase() === 'asc' ? Direction.ASC : Direction.DESC;
                return new Sort(c[0], direction);
            }
        }
        return null;
    }
}
exports.Sort = Sort;
var Direction;
(function (Direction) {
    Direction[Direction["ASC"] = 0] = "ASC";
    Direction[Direction["DESC"] = 1] = "DESC";
})(Direction = exports.Direction || (exports.Direction = {}));
//# sourceMappingURL=sort.js.map