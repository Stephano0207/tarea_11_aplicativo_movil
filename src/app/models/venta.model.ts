import { Details_Venta } from "./details_venta.model";

export interface Venta{
  fecha_emision:Date;
  total:number;
  details_venta:Details_Venta[];
}
