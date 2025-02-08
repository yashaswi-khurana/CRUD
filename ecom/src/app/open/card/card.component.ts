import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UpdateFormService } from '../../core/services/update-form.service';
import { ProductsService } from '../../core/services/products.service';
import { AuthService } from '../../core/services/auth.service';
import { AddCardComponent } from '../add-card/add-card.component';

@Component({
  selector: 'app-card',
  standalone: true, // Mark as standalone
  imports: [CommonModule, AddCardComponent], // Import dependencies
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent {
  title = 'products';
  product: any[] = [];
  productService = inject(ProductsService);
  authService = inject(AuthService);

  constructor(private router: Router, private update: UpdateFormService) {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProduct().subscribe((product) => {
      this.product = product;
    });
  }

  onDelete(id: number) {
    this.productService.deleteProduct(id).subscribe(() => {
      this.product = this.product.filter((product) => product.id !== id);
      console.log('Product deleted. Remaining products:', this.product);
    });
  }

  onUpdate(itemId: number) {
    this.router.navigate([`/update-product/${itemId}`]);
    const productIndex = this.product.findIndex((product) => product.id === itemId);
    this.update.sendData(this.product[productIndex]);
  }

  // addCart(itemId: number, qty: number) {
  //   const productIndex = this.product.findIndex((product) => product.id === itemId);

  //   if (productIndex !== -1) {
  //     const selectedProduct = this.product[productIndex];

  //     if (selectedProduct.qty >= qty && selectedProduct.qty > 0) {
  //       selectedProduct.qty -=1;
  //       console.log(
  //         `Added ${qty} of product ID: ${itemId} to the cart. Remaining quantity: ${selectedProduct.qty}`
  //       );
  //     }
  //   }
  // }
}