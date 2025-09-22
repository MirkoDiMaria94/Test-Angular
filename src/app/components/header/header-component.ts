import { Component } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CartService } from '../../services/cart-service';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faShoppingCart, faBoxOpen } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header-component',
  imports: [
    NzLayoutModule,
    NzMenuModule,
    NzBadgeModule,
    CommonModule,
    RouterModule,
    NzIconModule,
    FontAwesomeModule
  ],
  templateUrl: './header-component.html',
  styleUrl: './header-component.scss'
})
export class HeaderComponent {
  // Icone FontAwesome utilizzate nel template
  faShoppingCart = faShoppingCart;
  faBoxOpen = faBoxOpen;

  // Observable che tiene traccia del numero di prodotti nel carrello
  cartCount$: Observable<number>;

  /**
   * Costruttore del componente
   * @param cartService - Servizio per gestire il carrello
   * Inizializza l'observable `cartCount$` per contare i prodotti nel carrello.
   */
  constructor(private cartService: CartService) {
    this.cartCount$ = this.cartService.cartItems$.pipe(
      map(cart => {
        return cart.reduce((total, item) => total + (item.quantity ?? 1), 0);
      })
    );
  }
}
