import { Component, inject, NgModule} from '@angular/core';
import { HeaderComponent } from './open/header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductsService } from './core/services/products.service';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent,FormsModule,ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ecomm';

  product: any[] = [];

  productService = inject(ProductsService);

  constructor(){
    this.productService.getProduct().subscribe(product=>{

      this.product=product;
      // console.log()
    });
  }
}
