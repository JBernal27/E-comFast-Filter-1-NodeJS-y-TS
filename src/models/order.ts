import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  BelongsTo,
  ForeignKey,
  HasOne,
} from "sequelize-typescript";
import { ProductCart } from "./productCart";
import { User } from "./user";

@Table({
  tableName: "orders",
  timestamps: true,
})
export class Order extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
  })
  id!: number;

  @Column({
    type: DataType.DECIMAL,
    allowNull: false,
  })
  total!: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId!: number;

  @BelongsTo(() => User)
  user!: User;

  @ForeignKey(() => ProductCart)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  productCardId!: number;

  @BelongsTo(() => ProductCart)
  productCard!: ProductCart;
}
