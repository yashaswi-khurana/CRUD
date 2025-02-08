import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private searchQuery = new BehaviorSubject<string>(''); // Holds the search query
  searchQuery$ = this.searchQuery.asObservable(); // Observable for components to subscribe to

  private products: any[] = []; // Holds the full product list
  private filteredProducts = new BehaviorSubject<any[]>([]); // Holds the filtered products
  filteredProducts$ = this.filteredProducts.asObservable(); // Observable for filtered products

  setProducts(products: any[]): void {
    this.products = products;
    this.filteredProducts.next(products); // Initially set all products
  }

  setSearchQuery(query: string): void {
    this.searchQuery.next(query); // Update the search query
    this.filterProducts(query); // Trigger filtering
  }

  private filterProducts(query: string): void {
    const filtered = this.products.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );
    this.filteredProducts.next(filtered); // Update the filtered products
  }
}
