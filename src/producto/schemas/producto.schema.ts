import { Schema } from "mongoose";

export const ProductoSchema = new Schema({
  nombre: { type: String, required: true },
  fotoUrl: String,
  precio: Number,
  stock: Number,
  createdAt: { type: Date, default: Date.now },
  updateAt: { type: Date, default: null },
});

// // Middleware para actualizar la fecha de actualización antes de cada operación de actualización
// ProductoSchema.pre('update', function (this: Model<Producto>, next) {
//   this.updateAt = new Date();
//   next();
// });
//
// // Middleware para actualizar la fecha de actualización antes de cada operación de findOneAndUpdate
// ProductoSchema.pre('findOneAndUpdate', function (this: Model<Producto>) {
//   this.update({}, { $set: { updateAt: new Date() } });
// });
//
// // Middleware para actualizar la fecha de actualización antes de cada operación de findByIdAndUpdate
// ProductoSchema.pre('findByIdAndUpdate', function (this: Model<Producto>) {
//   this.update({}, { $set: { updateAt: new Date() } });
// });
