import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';

export const authInterceptor: HttpInterceptorFn = (request, next) => {
    const storageService = inject(StorageService);
    const token = storageService.getItem('token')
  
    if (token) {
      const authRequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
      return next(authRequest);
    }
  
    return next(request);
  };
  