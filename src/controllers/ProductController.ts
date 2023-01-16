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
				success: 'product created',
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
}

export default ProductController;
