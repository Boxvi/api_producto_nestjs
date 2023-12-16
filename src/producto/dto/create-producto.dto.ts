import { ApiProperty } from "@nestjs/swagger";

export class CreateProductoDto {
  @ApiProperty()
  readonly nombre: string;

  @ApiProperty()
  readonly fotoUrl: string;

  @ApiProperty()
  readonly precio: number;
  @ApiProperty()
  readonly stock: number;
}

export class ProductoDto {
  nombre: string;
  fotoUrl: string;
  precio: number;
  stock: number;
  total: number;
  createdAt: string;
  updateAt: string;

  constructor(producto: any) {
    this.nombre = producto.nombre;
    this.precio = producto.precio;
    this.stock = producto.stock;
    this.fotoUrl = producto.fotoUrl;
    this.total = producto.precio * producto.stock;
    this.createdAt = producto.createdAt;
    this.updateAt = producto.updateAt;
  }
}
