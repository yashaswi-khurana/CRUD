import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { UpdateFormService } from '../../core/services/update-form.service';
import { ProductsService } from '../../core/services/products.service';

@Component({
  selector: 'app-update-product-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './update-product-form.component.html',
  styleUrls: ['./update-product-form.component.css'],
})
export class UpdateProductFormComponent implements OnInit {
  updateProduct: FormGroup;
  product: any = {};
  id!: number;
  productService = inject(ProductsService);

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private update: UpdateFormService,
    private router: Router
  ) {
    this.updateProduct = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      qty: [null, [Validators.required, Validators.min(0)]],
      price: [null, [Validators.required, Validators.min(0)]],
    });


    this.update.data$.subscribe((data) => {
      if (data) {
        this.product = data;
        console.log('Received Product Data:', this.product);

        this.updateProduct.patchValue({
          name: this.product.name,
          description: this.product.description,
          qty: this.product.qty,
          price: this.product.price,
        });
      }
    });
  }

  ngOnInit(): void {

    this.route.params.subscribe((params) => {
      this.id = +params['id'];
      console.log('Product ID:', this.id);
    });
  }

  onSubmit() {
    if (this.updateProduct.valid) {
      const updatedProduct = {
        ...this.updateProduct.value,
        id: this.id, 
      };


      this.productService.updateProduct(updatedProduct).subscribe(
        (response) => {
          console.log('Product Updated Successfully:', response);
          this.router.navigate(['']);
        },
        (error) => {
          console.error('Error Updating Product:', error);
        }
      );
    } else {
      console.error('Form is invalid');
    }
  }
}
