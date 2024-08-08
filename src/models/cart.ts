import {
    Table,
    Column,
    Model,
    DataType,
    PrimaryKey,
    AutoIncrement,
    ForeignKey,
    BelongsTo,
    HasOne,
    HasMany
  } from "sequelize-typescript";
import { User } from "./user";
import { ProductCart } from "./productCart";
import { Order } from "./order";
  
  @Table({
    tableName: "carts",
    timestamps: true,
  })
  export class Cart extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column({
      type: DataType.INTEGER,
    })
    id!: number;
    
    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    userId!: number;

    @BelongsTo(() => User)
    user!: User;

    @HasOne(() => Order)
    order!: Order
    
    @HasMany(() => ProductCart)
    productCarts!: ProductCart;
  }
  