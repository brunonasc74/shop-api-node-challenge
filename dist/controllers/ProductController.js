"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const yup = __importStar(require("yup"));
const yupValidation_1 = __importDefault(require("../utility/yupValidation"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class ProductController {
    // @desc   Return all products
    // @route  GET /products
    static async getAllProducts(_, res) {
        try {
            const allProducts = await prisma.product.findMany({
                where: { deleted_at: null }
            });
            res.status(200).send(allProducts);
        }
        catch (err) {
            res.status(400).send(err.message);
        }
    }
    // @desc   Create a new product
    // @route  POST /products
    static async createProduct(req, res) {
        try {
            const validatedData = await (0, yupValidation_1.default)(req);
            const newProduct = validatedData;
            await prisma.product.create({ data: newProduct });
            const theProduct = await prisma.product.findMany({ take: -1 });
            res.status(201).send({
                success: 'Product created',
                productInfo: theProduct
            });
        }
        catch (err) {
            if (err instanceof yup.ValidationError) {
                const errorMessage = err.inner.map((err) => err.message).join(', ');
                res.status(400).send({ validationFailed: errorMessage });
            }
            else {
                res.status(400).send(err.message);
            }
        }
    }
    // @desc   Return selected product
    // @route  GET /products/:id
    static async getOneProduct(req, res) {
        const { id } = req.params;
        try {
            const selectedProduct = await prisma.product.findUnique({
                where: { id: +id }
            });
            if (!selectedProduct)
                return res
                    .status(404)
                    .send({ error: `Product of id ${id} does not exist` });
            res.status(200).send(selectedProduct);
        }
        catch (err) {
            res.status(400).send(err.message);
        }
    }
    // @desc   Edit selected product
    // @route  PUT /products/:id
    static async editProduct(req, res) {
        const { id } = req.params;
        try {
            const selectedProduct = await prisma.product.findUnique({
                where: { id: +id }
            });
            if (!selectedProduct) {
                return res
                    .status(404)
                    .send({ error: `Product of id ${id} does not exist` });
            }
            const validatedData = await (0, yupValidation_1.default)(req);
            const newInfo = validatedData;
            const isEqual = Object.entries(newInfo).every(([key, value]) => selectedProduct[key] === value);
            if (selectedProduct.deleted_at !== null)
                return res.status(400).send({
                    error: `It was not possible to update product of id ${id}, it has already been deleted`,
                    deletedProduct: selectedProduct
                });
            if (isEqual)
                return res.status(200).send({
                    warning: `Product of id ${id} was not updated, the values are the same`,
                    productInfo: selectedProduct
                });
            const updatedProduct = await prisma.product.update({
                where: { id: +id },
                data: newInfo
            });
            res.status(200).send({
                success: `Product of id ${id} updated`,
                updatedProductInfo: updatedProduct
            });
        }
        catch (err) {
            if (err instanceof yup.ValidationError) {
                const errorMessage = err.inner.map((err) => err.message).join(', ');
                res.status(400).send({ validationFailed: errorMessage });
            }
            else {
                res.status(400).send(err.message);
            }
        }
    }
    // @desc   Delete selected product
    // @route  DELETE /products/:id
    static async deleteProduct(req, res) {
        const { id } = req.params;
        try {
            const selectedProduct = await prisma.product.findUnique({
                where: { id: +id }
            });
            if (!selectedProduct)
                return res
                    .status(404)
                    .send({ error: `Product of id ${id} does not exist` });
            if (selectedProduct.deleted_at !== null)
                return res.status(400).send({
                    error: `Product of id ${id} has already been deleted`,
                    deletedProduct: selectedProduct
                });
            await prisma.product.update({
                where: { id: +id },
                data: { deleted_at: new Date() }
            });
            const recordedProduct = await prisma.product.findUnique({
                where: { id: +id }
            });
            return res.status(200).send({
                success: `Product of id ${id} deleted`,
                deletedProductInfo: recordedProduct
            });
        }
        catch (err) {
            res.status(400).send(err.message);
        }
    }
}
exports.default = ProductController;
//# sourceMappingURL=ProductController.js.map