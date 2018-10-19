import { Injectable } from '@angular/core';
import { Http,Headers, RequestOptions } from '@angular/http';
//import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';






@Injectable({
  providedIn: 'root'
})
export class AuthService {

  domain="http://localhost:8080";
  authToken;
  user;
  options;

  constructor(
    private http:Http,
    public jwtHelper: JwtHelperService

  ) { }

createAuthenticationHeaders(){
  this.loadToken();
  this.options=new RequestOptions({
    headers:new Headers({
      'Content-Type':'application/json',
      'authorization':this.authToken
    })
  });
}

loadToken(){
  this.authToken=localStorage.getItem('token');
}

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

      logout(){
        this.authToken=null;
        this.user=null;
        localStorage.clear();
      }

      storeUserData(token,user){
        localStorage.setItem('token',token);
        localStorage.setItem('user',JSON.stringify(user));
        this.authToken=token;
        this.user=user;

      }

      getProfile(){
        this.createAuthenticationHeaders();
        return this.http.get(this.domain + '/authentication/profile',this.options).pipe(map(res=>res.json()));
      }

      getToken() {
              return localStorage.getItem('token');
          }



      isLoggedIn() {
              const token = this.getToken();
              if (!token) {
                  return false;
              }

              const helper = new JwtHelperService();

              try {
                  return !helper.isTokenExpired(token);
              } catch (error) {
                  return false;
              }
          }



}
