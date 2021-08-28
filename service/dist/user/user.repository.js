"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserNotFoundException = exports.save = exports.deleteById = exports.getExistingById = exports.getById = exports.getPage = void 0;
const db = __importStar(require("../db"));
const page_1 = require("../page/page");
const sort_1 = require("../page/sort");
function getPage(pageable) {
    return __awaiter(this, void 0, void 0, function* () {
        const offset = pageable.page * pageable.size;
        const sortDir = pageable.sort.direction === sort_1.Direction.ASC ? 'ASC' : 'DESC';
        const orderBy = pageable.sort.field + ' ' + sortDir;
        const sql = 'SELECT id, birth_date birthDate, first_name firstName, last_name lastName, gender, created ' +
            'FROM `user` ORDER BY ' + orderBy + ' LIMIT ? OFFSET ?';
        return db.query(sql, [pageable.size, offset])
            .then((users) => __awaiter(this, void 0, void 0, function* () {
            const total = yield countAll();
            return new page_1.Page(users, pageable.page, pageable.size, total);
        }));
    });
}
exports.getPage = getPage;
function countAll() {
    const sql = 'SELECT COUNT(*) c FROM `user`';
    return db.query(sql).then((r) => r.length === 1 ? r[0].c : null);
}
function getById(userId) {
    const sql = 'SELECT id, birth_date birthDate, first_name firstName, last_name lastName, gender, created ' +
        'FROM `user` WHERE id = ?';
    return db.query(sql, [userId])
        .then((users) => users.length === 0 ? null : users[0]);
}
exports.getById = getById;
function getExistingById(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield getById(userId);
        if (user === null) {
            throw new UserNotFoundException(`User id=${userId} was not found`);
        }
        else {
            return user;
        }
    });
}
exports.getExistingById = getExistingById;
function deleteById(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield getExistingById(userId);
        const sql = 'DELETE FROM `user` WHERE `user`.id == ?';
        return db.exec(sql, [userId])
            .then(() => user);
    });
}
exports.deleteById = deleteById;
function save(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const existing = user.id ? yield getById(user.id) : null;
        if (existing === null) {
            return create(user);
        }
        else {
            return update(user);
        }
    });
}
exports.save = save;
function create(user) {
    const sql = 'INSERT INTO `user` (id, birth_date, first_name, last_name, gender, created) VALUES (?, ?, ?, ?, ?, ?)';
    return db.exec(sql, Object.values(user))
        .then((r) => getExistingById(r.lastID));
}
function update(user) {
    const sql = 'UPDATE `user` SET id = ?, birth_date = ?, first_name = ?, last_name = ?, gender = ?, created = ? ' +
        'WHERE id = ?';
    return db.exec(sql, Object.values(user).concat(user.id))
        .then(() => user);
}
class UserNotFoundException extends Error {
    constructor() {
        super(...arguments);
        this.name = 'UserNotFoundException';
    }
}
exports.UserNotFoundException = UserNotFoundException;
//# sourceMappingURL=user.repository.js.map