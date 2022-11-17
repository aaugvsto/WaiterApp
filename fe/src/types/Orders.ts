export interface Order {
  __id: string;
  table: string;
  status: 'WAITING' | 'IN_PRODUCTION' | 'DONE';
  products: {
    __id: string;
    quantity: number;
    product: {
      name: string;
      imagePath: string;
      price: number
    }
  }[]
}
