"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function (o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function () { return m[k]; } });
}) : (function (o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function (o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function (o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOne = exports.update = exports.create = exports.get = exports.getPage = void 0;
const pageable_1 = require("../page/pageable");
const sort_1 = require("../page/sort");
const userRepository = __importStar(require("./user.repository"));
const user_repository_1 = require("./user.repository");
function getPage(req, res, next) {
    const pageable = pageable_1.Pageable.from(req.query, new pageable_1.Pageable(0, 20, new sort_1.Sort('id', sort_1.Direction.ASC)));
    userRepository.getPage(pageable)
        .then((page) => res.json(page))
        .catch((e) => handleErrors(e, res, next));
}
exports.getPage = getPage;
function get(req, res, next) {
    const userId = Number(req.params.userId);
    userRepository.getExistingById(userId)
        .then((user) => res.json(user))
        .catch((e) => handleErrors(e, res, next));
}
exports.get = get;
function create(req, res, next) {
    const user = req.body;
    userRepository.save(user)
        .then((updated) => {
            res.status(201);
            res.json(updated);
        })
        .catch((e) => handleErrors(e, res, next));
}
exports.create = create;
function update(req, res, next) {
    const user = req.body;
    userRepository.save(user)
        .then((updated) => res.json(updated))
        .catch((e) => handleErrors(e, res, next));
}
exports.update = update;
function deleteOne(req, res, next) {
    const userId = Number(req.params.userId);
    userRepository.deleteById(userId)
        .then((deleted) => res.status(204))
        .catch((e) => handleErrors(e, res, next));
}
exports.deleteOne = deleteOne;
function handleErrors(e, res, next) {
    if (e instanceof user_repository_1.UserNotFoundException) {
        res.status(404);
        res.json({ error: e.name, status: 404, cause: e.message });
    }
    else {
        next(e);
    }
}
//# sourceMappingURL=user.controller.js.map