import ProductController from '../controllers/ProductController';
import { Router } from 'express';
const router = Router();

router
	.get('/products', ProductController.getAllProducts)
	.post('/products')
	.get('/products/:id')
	.put('/products/:id')
	.delete('/products/:id');

export default router;
