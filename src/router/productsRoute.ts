import ProductController from '../controllers/ProductController';
import { Router } from 'express';
const router = Router();

router
	.get('/products', ProductController.getAllProducts)
	.post('/products', ProductController.createProduct)
	.get('/products/:id', ProductController.getOneProduct)
	.put('/products/:id', ProductController.editProduct)
	.delete('/products/:id', ProductController.deleteProduct);

export default router;
