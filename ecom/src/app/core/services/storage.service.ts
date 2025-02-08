import { Injectable,Inject,PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }
  getItem(token: string): string | null {
    if(isPlatformBrowser(this.platformId)){
      return localStorage.getItem(token);
    }
    return null;
  }
}
