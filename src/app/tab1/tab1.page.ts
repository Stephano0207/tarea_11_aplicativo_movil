import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product.models';
import { CarritoStorageService } from '../services/carrito-storage.service';
import { ProductosService } from '../services/productos/productos.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  public products: Product[]=[];
  public productsFounds: Product[]=[]

  public filter=[
    "Abarrotes",
    "Frutas y Verduras",
    "Limpieza",
    "Farmacia"
  ];


  public productsCar: Product[]=[];

  total: number = 0; // Propiedad para almacenar el total

  async ngOnInit() {
    await this.cargarCarrito();
    this.calculateTotal();
    this.serviceProducto.getAll().subscribe((p)=>{
      console.log(p);
    })

  }

  constructor(
    private serviceCarrito:CarritoStorageService,
    private serviceProducto:ProductosService
  ) {

    this.serviceProducto.getAll().subscribe((p)=>{
      this.products=p;
      this.productsFounds=this.products;

      this.calculateTotal();
    })
    //Abarrotes
    // this.products.push({
    //   id: 1,
    //   name: "Coca Cola",
    //   price: 20,
    //   photo: "https://picsum.photos/200/300?randmom=",
    //   category: "Abarrotes" ,
    //   description: "Sabor Cola",
    //   color:"tertiary",
    //   quantity: 5
    // });
    // this.products.push({
    //   id: 2,
    //   name: "Galletas Oreo",
    //   price: 17,
    //   photo: "https://picsum.photos/200/300?randmom=",
    //   category: "Abarrotes" ,
    //   description: "Sabor Chocolate",
    //   color:"tertiary",
    //   quantity: 5
    // });
    // this.products.push({
    //   id: 3,
    //   name: "Takis Fuego Azul",
    //   price: 20,
    //   photo: "https://picsum.photos/200/300?randmom=",
    //   category: "Abarrotes" ,
    //   description: "Sabor Chile",
    //   color:"tertiary",
    //   quantity: 5
    // });
    // //Limpieza
    // this.products.push({
    //   id: 4,
    //   name: "Pinol",
    //   price: 18,
    //   photo: "https://picsum.photos/200/300?randmom=",
    //   category: "Limpieza",
    //   description: "Limpiador para pisos",
    //   color:"warning",
    //   quantity: 5
    // });
    // this.products.push({
    //   id: 5,
    //   name: "Cloro",
    //   price: 23,
    //   photo: "https://picsum.photos/200/300?randmom=",
    //   category: "Limpieza",
    //   description: "Limpia el 99% de las vacterias",
    //   color:"warning",
    //   quantity: 5
    // });
    // this.products.push({
    //   id: 6,
    //   name: "Pastilla para baño",
    //   price: 18,
    //   photo: "https://picsum.photos/200/300?randmom=",
    //   category: "Limpieza",
    //   description: "Aroma a rosas",
    //   color:"warning",
    //   quantity: 5
    // });
    // //Frutas y Verduras
    // this.products.push({
    //   id: 7,
    //   name: "Ahuacate Hash",
    //   price: 8,
    //   photo: "https://picsum.photos/200/300?randmom=",
    //   category: "Frutas y Verduras",
    //   description: "Muy rico",
    //   color:"secondary",
    //   quantity: 5
    // });
    // this.products.push({
    //   id: 8,
    //   name: "Pepino",
    //   price: 8,
    //   photo: "https://picsum.photos/200/300?randmom=",
    //   category: "Frutas y Verduras",
    //   description: "Ps ta chido",
    //   color:"secondary",
    //   quantity: 5
    // });
    // this.products.push({
    //   id: 9,
    //   name: "Lmon",
    //   price: 8,
    //   photo: "https://picsum.photos/200/300?randmom=",
    //   category: "Frutas y Verduras",
    //   description: "Chido y jugoso",
    //   color:"secondary",
    //   quantity: 5
    // });
    // //Farmacia
    // this.products.push({
    //   id: 10,
    //   name: "Paracetamol",
    //   price: 20,
    //   photo: "https://picsum.photos/200/300?randmom=",
    //   category: "Farmacia",
    //   description: "Te alivias porque te alivias",
    //   color:"danger",
    //   quantity: 5
    // });
    // this.products.push({
    //   id: 11,
    //   name: "Alcohol 96%",
    //   price: 20,
    //   photo: "https://picsum.photos/200/300?randmom=",
    //   category: "Farmacia",
    //   description: "OJO no se toma",
    //   color:"danger",
    //   quantity: 5
    // });
    // this.products.push({
    //   id: 12,
    //   name: "Agua Oxigenada",
    //   price: 20,
    //   photo: "https://picsum.photos/200/300?randmom=",
    //   category: "Farmacia",
    //   description: "Como agua pero oxigenada",
    //   color:"danger",
    //   quantity: 5
    // });

    this.productsFounds=this.products;

    this.calculateTotal();

  }


  async cargarCarrito() {

    this.productsCar= await this.serviceCarrito.obtenerCarrito();
    console.log('Productos cargados en cargarCarrito:', this.productsCar);
  }

  public filterProducts():void{
    console.log(this.filter);
    this.productsFounds=this.products.filter(
      item => {
        return this.filter.includes(item.category);
      }
    );
  }

   async setCar(product: Product) {
    const existingProduct = this.productsCar.find((p) => p.id === product.id);

    if (existingProduct) {
      // El producto ya existe en el carrito, aumenta la cantidad
      existingProduct.quantity++;
       this.serviceCarrito.editarContacto(existingProduct.id,existingProduct);
    } else {
      // El producto no está en el carrito, agrégalo con cantidad 1
      this.serviceCarrito.agregarProducto(product);
      product.quantity = 1;
      this.productsCar.push(product);
    }
    this.calculateTotal();
  }

  async removeProduct(product:Product){
    this.serviceCarrito.eliminarProducto(product.id);
    this.cargarCarrito();
  }



  calculateTotal() {
    return this.total = this.productsCar.reduce((acc, product) => acc + product.price * product.quantity, 0);
  }

}
