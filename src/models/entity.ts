import {
    Table,
    Column,
    Model,
    DataType,
    PrimaryKey,
    AutoIncrement,
    HasOne,
  } from "sequelize-typescript";
import { Permissions } from "./permissions";
  
  @Table({
    tableName: "entity",
    timestamps: true,
  })
  export class Entity extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column({
      type: DataType.INTEGER,
    })
    id!: number;
  
    @Column({
      type: DataType.STRING,
      allowNull: false,
    })
    name!: string;

    @HasOne(() => Permissions)
    permissions!: Permissions;
  }
  