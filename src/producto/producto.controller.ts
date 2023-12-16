import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpStatus,
  Query,
  ParseIntPipe,
  Req,
} from "@nestjs/common";
import { ProductoService } from "./producto.service";
import { CreateProductoDto } from "./dto/create-producto.dto";
import { ApiTags } from "@nestjs/swagger";
import { UtilDto } from "../utils/dto/util.dto";

@Controller("producto")
@ApiTags("Producto Controller")
export class ProductoController {
  constructor(private readonly productoService: ProductoService) {}

  @Post()
  async create(@Res() res, @Body() createProductoDto: CreateProductoDto) {
    const producto = await this.productoService.create(createProductoDto);
    return res.status(HttpStatus.OK).json({
      message: "Producto Creado",
      producto: producto,
    });
  }

  @Get()
  async findAll(@Res() res, @Req() req, @Query() util: UtilDto) {
    const defaultOffset = 0;
    const defaultLimit = 5;

    if (!util.offset || util.offset < 0) {
      util.offset = defaultOffset;
    }
    if (!util.limit || util.limit <= 0) {
      util.limit = defaultLimit;
    }
    const paginatedProducto = await this.productoService.findAll(util);
    return res.status(HttpStatus.OK).json({
      count: await this.productoService.countDocuments(),
      next:
        req.protocol +
        "://" +
        req.get("host") +
        req.path +
        `?offset=${+util.offset + +util.limit}&limit=${util.limit}`,
      previous:
        req.protocol + "://" + req.get("host") + req.path ===
        req.protocol + "://" + req.get("host") + req.originalUrl
          ? null
          : req.protocol +
            "://" +
            req.get("host") +
            req.path +
            `?offset=${Math.max(+util.offset - +util.limit, 0)}&limit=${
              util.limit
            }`,
      results: paginatedProducto,
    });
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.productoService.findOne(id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateProductoDto: CreateProductoDto,
  ) {
    return this.productoService.update(id, updateProductoDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.productoService.remove(+id);
  }
}
