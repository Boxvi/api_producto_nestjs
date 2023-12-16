export interface Producto extends Document {
  readonly nombre: string;
  readonly fotoUrl: string;
  readonly precio: number;
  readonly stock: number;
  readonly createdAt?: Date;
  readonly updateAt?: Date;
}
