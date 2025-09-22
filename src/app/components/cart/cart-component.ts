import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../models/product.model';
import { CartService } from '../../services/cart-service';
import { NzTableModule } from 'ng-zorro-antd/table';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-cart-component',
  imports: [
    NzTableModule,
    CommonModule,
    FontAwesomeModule
  ],
  templateUrl: './cart-component.html',
  styleUrls: ['./cart-component.scss']
})
export class CartComponent {

  // Icona FontAwesome utilizzata nel template
  faTrash = faTrash;

  // Observable che contiene i prodotti presenti nel carrello
  cart$: Observable<Product[]>;

  /**
   * Costruttore del componente
   * @param cartService Servizio per gestire il carrello
   */
  constructor(private cartService: CartService) {
    this.cart$ = this.cartService.cartItems$;
  }

  /**
   * Rimuove un prodotto dal carrello tramite il suo ID
   * @param id ID del prodotto da rimuovere
   */
  removeFromCart(id: number) {
    this.cartService.removeFromCart(id);
  }

  /**
   * Calcola il totale dei prezzi dei prodotti presenti nel carrello
   * @returns Somma dei prezzi
   */
  getTotal() {
    return this.cartService.getTotal()
  }
}
