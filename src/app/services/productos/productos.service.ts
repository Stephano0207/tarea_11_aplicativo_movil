import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from 'src/app/models/product.models';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  url:string='http://127.0.0.1:8000/api/productos';
  constructor(private http:HttpClient) { }

  getAll(){
    return this.http.get<Product[]>(this.url);
  }
}
