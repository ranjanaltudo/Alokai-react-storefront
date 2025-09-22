export interface Product {
  name: string;
  img: string;
  isSale: boolean;
  size: '5.5' | '6.0' | '6.5';
  color: 'Red' | 'Green' | 'Blue';
  price: number;
}
