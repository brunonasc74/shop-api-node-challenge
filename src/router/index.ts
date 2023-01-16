import { Application } from 'express';
import products from './productsRoute';
import notFound from './notFoundRoute';

export default (app: Application) => {
	app.use(products);
	app.use(notFound);
};
