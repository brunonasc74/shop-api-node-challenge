import products from './products';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const main = async () => {
	for (let product of products) {
		await prisma.product.create({
			data: product
		});
	}
};

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
