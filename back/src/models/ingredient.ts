import {
  Table,
  Model,
  Column,
  DataType,
  AutoIncrement,
  PrimaryKey,
  AllowNull,
} from "sequelize-typescript";
import { UNITS } from "../helpers/constants";

@Table({
  tableName: "ingredients",
})
export class Ingredient extends Model<Ingredient> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  name!: string;

  @AllowNull(false)
  @Column(DataType.FLOAT)
  quantity!: number;

  @AllowNull(false)
  @Column({
    type: DataType.ENUM(...Object.values(UNITS)),
  })
  unit!: UNITS;
}
