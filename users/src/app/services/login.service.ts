import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient, private router:Router) { }

  private apiUrl = 'http://localhost:3000/auth/login';

  login(credentials:{email:string,password:string}): Observable<any> {
    return this.http.post(this.apiUrl,credentials);
  }

  logout(): void {
    localStorage.clear(); // or removeItem('authToken')
    this.router.navigate(['/login']);
  }

}
