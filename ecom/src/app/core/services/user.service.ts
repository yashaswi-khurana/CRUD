import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../shared/models/user-interface';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.userURL + '/register';
  private loginUrl = environment.userURL + '/login';

  constructor(private http: HttpClient) { }

  public registerUser(user: User): Observable<User> {
    localStorage.setItem('token',user.token);
    console.log(user.token);
    return this.http.post<User>(this.apiUrl, user);
  }

  public loginUser(user: User): Observable<User> {
    localStorage.setItem('token',user.token)
    console.log(user.token);
    return this.http.post<User>(this.loginUrl, user);
  }

}