import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Venta } from 'src/app/models/venta.model';

@Injectable({
  providedIn: 'root'
})
export class VentaService {

  url:string='http://127.0.0.1:8000/api/venta';
  constructor(private http:HttpClient) { }

  save(venta:Venta){
return this.http.post(this.url,venta);
  }
}
