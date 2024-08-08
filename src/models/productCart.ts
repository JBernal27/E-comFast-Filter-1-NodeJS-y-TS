import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  ForeignKey,
  HasMany,
  BelongsTo,
} from "sequelize-typescript";
import { Cart } from "./cart";
import { Product } from "./product";
import { Order } from "./order";

@Table({
  tableName: "productCart",
  timestamps: true,
})
export class ProductCart extends Model {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  quantity!: number;

  @ForeignKey(() => Product)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  productId!: number;

  @BelongsTo(() => Product)
  products!: Product;

  @ForeignKey(() => Cart)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  cartId!: number;

  @BelongsTo(() => Cart)
  carts!: Product[];
}
