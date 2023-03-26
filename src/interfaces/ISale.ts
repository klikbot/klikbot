export interface ISale {
    id: number;
	date: Date;
    products: string;
    price: number;
    clientId: number;
    userCellphone: string; 
}

export interface ISaleProduct {
    productId: number;
    quantity: number;
}