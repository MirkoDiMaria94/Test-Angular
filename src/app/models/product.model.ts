import { Review } from "./review.model";

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  quantity: number;
  reviews?: Review[];
}