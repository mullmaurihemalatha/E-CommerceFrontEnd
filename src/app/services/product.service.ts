import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Product } from '../models/product';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = environment.API_URL;
  private product;

  constructor(private http: HttpClient) { }

  getAll() {
      let user=JSON.parse(localStorage.getItem('currentUser'));
      const  headers = new  HttpHeaders().set("x-auth-token", user.token);

      return this.http.get<Product[]>(`${this.apiUrl}/products`,{headers});
  }

  getSearch(obj) {
      let user=JSON.parse(localStorage.getItem('currentUser'));
      const  headers = new  HttpHeaders().set("x-auth-token", user.token);

      return this.http.get<Product[]>(`${this.apiUrl}/products/search?`+"q="+obj.q,{headers});
  }

  addtoCart(obj) {
      let user=JSON.parse(localStorage.getItem('currentUser'));
      const  headers = new  HttpHeaders().set("x-auth-token", user.token);
      console.log(user.token);
      return this.http.post<any[]>(`${this.apiUrl}/products/addtocart`,obj,{headers});
  }

  getCart(){
    let user=JSON.parse(localStorage.getItem('currentUser'));
    const  headers = new  HttpHeaders().set("x-auth-token", user.token);
    return this.http.get<Product[]>(`${this.apiUrl}/products/getcart`,{headers});
  }
  getCats(){
    let user=JSON.parse(localStorage.getItem('currentUser'));
    const  headers = new  HttpHeaders().set("x-auth-token", user.token);
    return this.http.get<Category[]>(`${this.apiUrl}/categories/getcats`,{headers});
  }
}
