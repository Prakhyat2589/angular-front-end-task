"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.close = exports.query = exports.exec = exports.init = void 0;
const fs_1 = __importDefault(require("fs"));
const sqlite3_1 = require("sqlite3");
const sqlite3 = sqlite3_1.verbose();
const db = new sqlite3.Database(':memory:');
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        return readFixture(__dirname + '/data/fixture.sql').then((sql) => runScript(sql));
    });
}
exports.init = init;
function readFixture(file) {
    return new Promise((resolve) => {
        fs_1.default.readFile(file, (e, data) => {
            if (e) {
                throw e;
            }
            resolve(data.toString());
        });
    });
}
function runScript(sql) {
    return new Promise((resolve) => {
        db.exec(sql, (e) => {
            if (e) {
                throw e;
            }
            resolve();
        });
    });
}
function exec(sql, params) {
    return new Promise((resolve) => {
        db.run(sql, params, function (e) {
            if (e) {
                throw e;
            }
            resolve(this);
        });
    });
}
exports.exec = exec;
function query(sql, params) {
    return new Promise((resolve) => {
        db.all(sql, params, (e, rows) => {
            if (e) {
                throw e;
            }
            resolve(rows);
        });
    });
}
exports.query = query;
function close() {
    db.close();
}
exports.close = close;
//# sourceMappingURL=db.js.map