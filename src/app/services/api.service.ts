import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private url: string = 'http://localhost:3000/productList/';
  constructor(private http: HttpClient) {}

  postProduct(product: any) {
    return this.http.post<any>(this.url, product);
  }

  getProduct() {
    return this.http.get<any>(this.url);
  }

  putProduct(id: number, product: any) {
    return this.http.put<any>(this.url + id, product);
  }

  deleteProduct(id: number) {
    return this.http.delete<any>(this.url + '/' + id);
  }
}
