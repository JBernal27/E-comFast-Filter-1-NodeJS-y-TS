import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  BelongsTo,
  HasOne,
} from "sequelize-typescript";
import { User } from "./user";
import { Permissions } from "./permissions";

@Table({
  tableName: "roles",
  timestamps: true,
})
export class Role extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
  })
  id!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  name!: string;

  @HasOne(() => User)
  user!: User;

  @HasOne(() => Permissions)
  permissions!: Permissions;
}
