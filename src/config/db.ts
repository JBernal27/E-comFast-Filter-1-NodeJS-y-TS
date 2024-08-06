import { Sequelize } from "sequelize-typescript";
import { User } from "../models/user";
import { Product } from "../models/product";
import { Order } from "../models/order";
import { Cart } from "../models/cart";
import { Permissions } from "../models/permissions";
import { Entity } from "../models/entity";
import { ProductCart } from "../models/productCart";
import { Role } from "../models/role";

const sequelize: Sequelize = new Sequelize({
  dialect: "mysql",
  host: "localhost",
  username: "root",
  password: "Rlwl2023.",
  database: "ecomfast",
  models: [User, Product, Order, Cart, Permissions, Entity, ProductCart, Role],
});

export default sequelize;
