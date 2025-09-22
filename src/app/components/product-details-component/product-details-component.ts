import { Component } from '@angular/core';
import { Product } from '../../models/product.model';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product-service';
import { CartService } from '../../services/cart-service';
import { NzCardModule } from 'ng-zorro-antd/card';
import { CommonModule } from '@angular/common';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-product-details-component',
  imports: [
    NzCardModule,
    CommonModule,
    NzListModule,
    NzDividerModule,
    FontAwesomeModule
  ],
  templateUrl: './product-details-component.html',
  styleUrl: './product-details-component.scss'
})
export class ProductDetailsComponent {
  // Icone FontAwesome utilizzate nel template
  faShoppingCart = faShoppingCart;
  faUser = faUser;

  // Prodotto corrente, opzionale perché può non essere ancora caricato
  product?: Product;

  /**
   * Costruttore del componente
   * @param route - ActivatedRoute per leggere i parametri dell'URL
   * @param productService - servizio per recuperare i dettagli del prodotto
   * @param cartService - servizio per gestire il carrello
   */
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
  ) { }

  /**
   * Metodo chiamato all'inizializzazione del componente
   * Recupera l'ID del prodotto dall'URL e carica i dettagli dal servizio
   */
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getProductById(id).subscribe(prod => this.product = prod);
  }

  /**
   * Aggiunge il prodotto corrente al carrello
   * @param product - prodotto da aggiungere
   */
  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }
}
