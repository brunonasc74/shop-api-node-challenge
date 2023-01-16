import { Request, Response } from 'express';
import * as yup from 'yup';
import validateRequest from '../utility/yupValidation';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

class ProductController {
	// @desc   Return all products
	// @route  GET /products
	static async getAllProducts(_: unknown, res: Response) {
		try {
			const allProducts = await prisma.product.findMany({
				where: { deleted_at: null }
			});
			res.status(200).send(allProducts);
		} catch (err: any) {
			res.status(400).send(err.message);
		}
	}

	// @desc   Create a new product
	// @route  POST /products
	static async createProduct(req: Request, res: Response) {
		try {
			const validatedData = await validateRequest(req);
			const newProduct = validatedData;
			await prisma.product.create({ data: newProduct });
			const theProduct = await prisma.product.findMany({ take: -1 });

			res.status(201).send({
				success: 'Product created',
				productInfo: theProduct
			});
		} catch (err: any) {
			if (err instanceof yup.ValidationError) {
				const errorMessage = err.inner.map((err) => err.message).join(', ');
				res.status(400).send({ validationFailed: errorMessage });
			} else {
				res.status(400).send(err.message);
			}
		}
	}

	// @desc   Return selected product
	// @route  GET /products/:id
	static async getOneProduct(req: Request, res: Response) {
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
		} catch (err: any) {
			res.status(400).send(err.message);
		}
	}

	// @desc   Edit selected product
	// @route  PUT /products/:id
	static async editProduct(req: Request, res: Response) {
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
			const validatedData = await validateRequest(req);
			const newInfo = validatedData;
			const isEqual = Object.entries(newInfo).every(
				([key, value]) => selectedProduct[key] === value
			);
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
		} catch (err: any) {
			if (err instanceof yup.ValidationError) {
				const errorMessage = err.inner.map((err) => err.message).join(', ');
				res.status(400).send({ validationFailed: errorMessage });
			} else {
				res.status(400).send(err.message);
			}
		}
	}

	// @desc   Delete selected product
	// @route  DELETE /products/:id
	static async deleteProduct(req: Request, res: Response) {
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
		} catch (err: any) {
			res.status(400).send(err.message);
		}
	}
}

export default ProductController;
