"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ProductController_1 = __importDefault(require("../controllers/ProductController"));
const express_1 = require("express");
const router = (0, express_1.Router)();
router
    .get('/products', ProductController_1.default.getAllProducts)
    .post('/products', ProductController_1.default.createProduct)
    .get('/products/:id', ProductController_1.default.getOneProduct)
    .put('/products/:id', ProductController_1.default.editProduct)
    .delete('/products/:id', ProductController_1.default.deleteProduct);
exports.default = router;
//# sourceMappingURL=productsRoute.js.map