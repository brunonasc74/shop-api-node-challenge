import { Request, Response } from 'express';
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
}

export default ProductController;
