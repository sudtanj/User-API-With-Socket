import { DataSource, DataSourceOptions } from 'typeorm';
import { UsersEntity } from "./users/users.entity";
import { UsersCollection1672019747541 } from "./migrations/1672019747541-UsersCollection";

export const dataSourceOptions: DataSourceOptions = {
 type: "mongodb",
 url: process.env.MONGODB_URL,
 database: process.env.DATABASE_NAME,
 entities: [UsersEntity],
 migrations: [
  UsersCollection1672019747541
 ],
 useNewUrlParser: true,
 logging: true,
};

export const appDataSource = new DataSource(dataSourceOptions);
