import Product from "../../type/product";

/** Class representing a product. */
export default class ProductEntity {
	id: string;
	name: string;
	price: number;
	amount: number;
	imgURL: string;

	/**
	 * Create a product.
	 * @param {number} data - The data contains of object product.
	 */

	constructor(data: Product) {
		this.id = data.id;
		this.name = data.name;
		this.price = data.price;
		this.amount = data.amount;
		this.imgURL = data.imgURL;
	}
}
