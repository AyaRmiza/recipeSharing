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
import { User } from "./user";
import { Ingredient } from "./ingredient";

@Table({
  tableName: "recipes",
})
export class Recipe extends Model<Recipe> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  name!: string;

  @AllowNull(false)
  @Column(DataType.DATE)
  duration!: Date;

  @AllowNull(false)
  @Column(DataType.STRING)
  description!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  urlImg!: string;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  idUser!: number;

  @ForeignKey(() => Ingredient)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  idIngredients!: number;

  @BelongsTo(() => User)
  user!: User;

  @BelongsTo(() => Ingredient)
  ingredient!: Ingredient;
}
