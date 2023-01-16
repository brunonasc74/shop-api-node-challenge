interface Product {
	name: string;
	category: string;
	status: string;
	quantity: number;
}

const products: Product[] = [
	{
		name: 'Product-1',
		category: 'Category of Product-1',
		status: 'ACTIVE',
		quantity: 10
	},
	{
		name: 'product-2',
		category: 'Category of Product-2',
		status: 'INACTIVE',
		quantity: 5
	},
	{
		name: 'product-3',
		category: 'Category of Product-3',
		status: 'INACTIVE',
		quantity: 6
	},
	{
		name: 'product-4',
		category: 'Category of Product-4',
		status: 'ACTIVE',
		quantity: 20
	}
];

export default products;
