import { JwtModuleOptions } from "@nestjs/jwt";
import { TypeOrmModuleOptions } from "@nestjs/typeorm"
require('dotenv').config();

const DB_CONFIG: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  autoLoadEntities: true,
}
const JWT_CONFIG: JwtModuleOptions = {
  secret: process.env.JWT_KEY,
  signOptions: { expiresIn: process.env.JWT_EXPIRED },
  global: true
}

const MONGO_CONFIG="mongodb://127.0.0.1:27017/inventario"

export { DB_CONFIG, JWT_CONFIG,MONGO_CONFIG }