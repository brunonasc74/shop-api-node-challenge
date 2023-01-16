"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const productsRoute_1 = __importDefault(require("./productsRoute"));
const notFoundRoute_1 = __importDefault(require("./notFoundRoute"));
exports.default = (app) => {
    app.use(productsRoute_1.default);
    app.use(notFoundRoute_1.default);
};
//# sourceMappingURL=index.js.map