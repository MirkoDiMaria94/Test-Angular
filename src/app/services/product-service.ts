import { map, Observable } from "rxjs";
import { Product } from "../models/product.model";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient) { }

  /**ENDPOINTS */
  private readonly PRODUCTS_LIST_URL = 'assets/mock/products.json';
  private readonly PRODUCTS_DETAILS_URL = 'assets/mock/products-details.json';

  /**
   * Restituisce l'elenco di tutti i prodotti.
   * Simula una chiamata API leggendo "products.json".
   * @returns Observable di array di Product
   */
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.PRODUCTS_LIST_URL);
  }

  /**
   * Restituisce i dettagli di un singolo prodotto filtrando un file JSON unico.
   * Simula una chiamata API leggendo "products-details.json" e filtrando per ID.
   * @param id ID del prodotto
   * @returns Observable di Product
   */
  getProductById(id: number): Observable<Product | undefined> {
    return this.http.get<Product[]>(this.PRODUCTS_DETAILS_URL).pipe(
      map(products => products.find(p => p.id === id))
    );
  }

}
