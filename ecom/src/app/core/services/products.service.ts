import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { Product } from '../../shared/models/product-interface';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private apiUrl = environment.apiURL;

  constructor(private http: HttpClient) {}

  public getProduct(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  public deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  public addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }

  public updateProduct(product: Product): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${product.id}`, product);
  }
}
