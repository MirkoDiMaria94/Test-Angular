import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../models/product.model';

/**
 * Servizio per gestire lo stato del carrello.
 * Utilizza un BehaviorSubject per rendere il carrello reattivo e condiviso tra i componenti.
 */
@Injectable({
  providedIn: 'root'
})
export class CartService {

  /** BehaviorSubject che contiene l'array dei prodotti nel carrello con quantità */
  private cartItems = new BehaviorSubject<(Product)[]>([]);

  /** Observable pubblico del carrello per sottoscriversi ai cambiamenti */
  cartItems$: Observable<(Product)[]> = this.cartItems.asObservable();


  /**
   * Aggiunge un prodotto al carrello.
   * Se il prodotto esiste già, incrementa la quantità.
   * @param product prodotto da aggiungere
   */
  addToCart(product: Product): void {
    const current = this.cartItems.getValue();
    const index = current.findIndex(p => p.id === product.id);

    if (index > -1) {
      current[index].quantity += 1;
    } else {
      current.push({ ...product, quantity: 1 });
    }

    this.cartItems.next([...current]);
  }

  /**
   * Rimuove una singola unità di un prodotto dal carrello.
   * Se la quantità è 1, rimuove completamente il prodotto.
   * @param productId ID del prodotto da rimuovere
   */
  removeFromCart(productId: number): void {
    const current = this.cartItems.getValue();
    const index = current.findIndex(p => p.id === productId);

    if (index > -1) {
      if (current[index].quantity > 1) {
        current[index].quantity -= 1;
      } else {
        current.splice(index, 1);
      }
      this.cartItems.next([...current]);
    }
  }

  /**
   * Svuota completamente il carrello.
   */
  clearCart(): void {
    this.cartItems.next([]);
  }

  /**
   * Calcola il totale dei prodotti nel carrello
   * moltiplicando prezzo × quantità.
   */
  getTotal(): number {
    const current = this.cartItems.getValue();
    return current.reduce((total, item) => total + item.price * item.quantity, 0);
  }
}
