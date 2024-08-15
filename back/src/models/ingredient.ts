import {
  Table,
  Model,
  Column,
  DataType,
  AutoIncrement,
  PrimaryKey,
  AllowNull,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { Recipe } from "./recipe";
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
    allowNull: false,
  })
  unit!: UNITS;

  @ForeignKey(() => Recipe)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  idRecipe!: number;

  @BelongsTo(() => Recipe)
  recipe!: Recipe;
}
