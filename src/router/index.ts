import { Application } from 'express';
import products from './productsRoute';

export default (app: Application) => {
	app.use(products);
};
