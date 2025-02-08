import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductsService } from '../../core/services/products.service';

@Component({
  selector: 'app-add-product-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-product-form.component.html',
  styleUrls: ['./add-product-form.component.css'],
})
export class AddProductFormComponent {
  addProduct: FormGroup;
  productService = inject(ProductsService);

  constructor(private fb: FormBuilder) {
    this.addProduct = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      qty: ['', [Validators.required, Validators.min(1)]],
      price: ['', [Validators.required, Validators.min(0.01)]],
    });
  }

  onSubmit() {
    if (this.addProduct.valid) {
      const newProduct = this.addProduct.value;
      console.log('Adding Product:', newProduct);

      this.productService.addProduct(newProduct).subscribe(
        (response) => {
          console.log('Product Added Successfully:', response);
          this.addProduct.reset();
        },
        (error) => {
          console.error('Error Adding Product:', error);
        }
      );
    } else {
      console.error('Form is invalid');
    }
  }
}
