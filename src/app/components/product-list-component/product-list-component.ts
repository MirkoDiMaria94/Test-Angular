import { Component } from '@angular/core';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product-service';
import { CartService } from '../../services/cart-service';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzCardModule } from 'ng-zorro-antd/card';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faShoppingCart, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-product-list-component',
  imports: [
    NzGridModule,
    NzCardModule,
    CommonModule,
    RouterModule,
    FontAwesomeModule,
  ],
  templateUrl: './product-list-component.html',
  styleUrl: './product-list-component.scss'
})
export class ProductListComponent {
  // Icone FontAwesome utilizzate nel template
  faShoppingCart = faShoppingCart;
  faInfoCircle = faInfoCircle;

  // Array dei prodotti da mostrare nella lista
  products: Product[] = [];

  /**
   * Costruttore del componente
   * @param productService - servizio per ottenere i prodotti
   * @param cartService - servizio per gestire il carrello
   * @param router - Router per la navigazione tra pagine
   */
  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private router: Router
  ) { }

  /**
   * Metodo chiamato all'inizializzazione del componente
   * Recupera la lista dei prodotti dal ProductService
   */
  ngOnInit(): void {
    this.productService.getProducts().subscribe(data => this.products = data);
  }

  /**
   * Aggiunge un prodotto al carrello
   * @param product prodotto da aggiungere
   */
  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }

  /**
   * Naviga alla pagina dei dettagli di un prodotto
   * @param productId ID del prodotto da visualizzare
   */
  goToDetails(productId: number | string) {
    this.router.navigate(['/products', productId]);
  }
}
