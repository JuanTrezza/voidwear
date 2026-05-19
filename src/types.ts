export interface Product {
  id: string;
  name: string;
  price: number;
  sku: string;
  image: string;
  category: 'CHAQUETAS' | 'PANTALONES' | 'ACCESORIOS' | 'CALZADO';
  sizes: string[];
  stock: number;
}

export interface CartItem extends Product {
  quantity: number;
  size: string;
  cartId: string;
}
