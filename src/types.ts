export interface Product {
  id: string;
  name: string;
  price: number;
  sku: string;
  image: string;
  category: 'CHAQUETAS' | 'PANTALONES' | 'ACCESORIOS' | 'CALZADO';
}

export interface CartItem extends Product {
  quantity: number;
}
