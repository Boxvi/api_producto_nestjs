import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductoModule } from './producto/producto.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ProductoModule,
    MongooseModule.forRoot('mongodb+srv://Boxvi:canapesca@productoscluster.xzwlqto.mongodb.net/test'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

