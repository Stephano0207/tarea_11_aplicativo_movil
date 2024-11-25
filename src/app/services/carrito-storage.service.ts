import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Product } from '../models/product.models';
@Injectable({
  providedIn: 'root'
})
export class CarritoStorageService {

  private _storage: Storage | null = null;
  private name_key:string ='carrito';

  constructor(private storage: Storage) {
    this.init();
  }
  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this._storage = storage;
    // this._storage.get(this.name_key);
    console.log('Ionic Storage inicializado');
  }

  async ngOnInit() {
    // If using a custom driver:
    // await this.storage.defineDriver(MyCustomDriver)
    await this.storage.create();
  }

  async obtenerCarrito():Promise<Product[]>{
    if(!this._storage){
        await this.init();
    }
    const carrito = (await this._storage?.get(this.name_key)) || [];
    console.log('Carrito desde Storage:', carrito);
    return carrito;
  }

  async agregarProducto( producto: Product) {
    const carrito = await this.obtenerCarrito();
    carrito.push(producto);
    await this._storage?.set(this.name_key, carrito);
  }

    // Eliminar un contacto
    async eliminarProducto(id: number) {
      const carrito = await this.obtenerCarrito();
      const carritoFiltrado = carrito.filter((c) => c.id !== id);
      await this._storage?.set(this.name_key, carritoFiltrado);
    }

      // Editar un contacto existente
  async editarContacto(id: number, productoActualizado: Product) {
    const carrito = await this.obtenerCarrito();
    const index = carrito.findIndex((c) => c.id === id);
    if (index !== -1) {
      carrito[index] = productoActualizado;
      await this._storage?.set(this.name_key, carrito);
    }
  }
}
