import { Injectable } from '@angular/core';
import { Http,Headers, RequestOptions } from '@angular/http';
//import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  domain="http://localhost:8080";
  authToken;
  user;

  constructor(
    private http:Http
  ) { }

  registerUser(user){
    return this.http.post(this.domain + '/authentication/register',user).pipe(map(res=> res.json()));
  }


    checkUsername(username){
      return this.http.get(this.domain + '/authentication/checkUsername/' + username).pipe(map(res=> res.json()));
    }


      checkEmail(email){
        return this.http.get(this.domain + '/authentication/checkEmail/' + email).pipe(map(res=> res.json()));
      }

      login(user){
        return this.http.post(this.domain + '/authentication/login',user).pipe(map(res=> res.json()));
      }

      storeUserData(token,user){
        localStorage.setItem('token',token);
        localStorage.setItem('user',JSON.stringify(user));
        this.authToken=token;
        this.user=user;

      }
}
