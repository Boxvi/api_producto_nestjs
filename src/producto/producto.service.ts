import {
  Inject,
  Injectable,
  NotFoundException,
  Query,
  Req,
  RequestMethod,
} from "@nestjs/common";
import { CreateProductoDto, ProductoDto } from "./dto/create-producto.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Producto } from "./interface/producto.interface";
import { UtilDto } from "../utils/dto/util.dto";
import { REQUEST } from "@nestjs/core";

@Injectable()
export class ProductoService {
  constructor(
    @InjectModel("Producto") private readonly productoModel: Model<Producto>,
    @Inject(REQUEST) private request: Request,
  ) {}

  async create(createProductoDto: CreateProductoDto) {
    const producto = new this.productoModel(createProductoDto);
    return await producto.save();
  }

  async findAll(util?: UtilDto) {

    // const protocol = this.request.protocol; // http o https
    // const host = this.request.get("host");

    const productos = await this.productoModel
      .find()
      .skip(util.offset)
      .limit(util.limit)
      .exec();
    const productosConUrl = productos.map((producto) => ({
      nombre: producto.nombre,
      url: `https://api-producto-nestjs.onrender.com/api/v2/producto/${producto._id}`, // Asumiendo que `_id` es el campo de identificación único de MongoDB
    }));
    return productosConUrl;
  }

  async findOne(id: string) {
    const producto = await this.productoModel.findById(id);
    if (!producto) {
      throw new NotFoundException(`Producto con _id ${id} no encontrado`);
    }
    return new ProductoDto(producto);
  }

  async update(id: string, updateProductoDto: CreateProductoDto) {
    return this.productoModel.findByIdAndUpdate(
      id,
      {
        ...updateProductoDto,
        updateAt: new Date(),
      },
      { new: true },
    );
  }

  async remove(id: number) {
    return this.productoModel.findByIdAndDelete(id);
  }

  async countDocuments() {
    return this.productoModel.countDocuments();
  }
}
