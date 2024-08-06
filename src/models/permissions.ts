import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { Role } from "./role";
import { Entity } from "./entity";

@Table({
  tableName: "permissions",
  timestamps: true,
})
export class Permissions extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
  })
  id!: number;

  @Column({
    type: DataType.BOOLEAN,
  })
  canCreate!: boolean;

  @Column({
    type: DataType.BOOLEAN,
  })
  canUpdate!: boolean;

  @Column({
    type: DataType.BOOLEAN,
  })
  canDelete!: boolean;

  @Column({
    type: DataType.BOOLEAN,
  })
  canGet!: boolean;

  @ForeignKey(() => Role)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  roleId!: number;

  @BelongsTo(() => Role)
  role!: Role;

  @ForeignKey(() => Entity)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  entityId!: number;

  @BelongsTo(() => Entity)
  entity!: Entity;
}
