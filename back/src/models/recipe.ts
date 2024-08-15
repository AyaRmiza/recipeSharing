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
  HasMany,
} from "sequelize-typescript";
import { Post } from "./post";
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

  @ForeignKey(() => Post)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  idPost!: number;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  idUser!: number;

  @BelongsTo(() => Post)
  post!: Post;

  @BelongsTo(() => User)
  user!: User;

  @HasMany(() => Ingredient)
  ingredients!: Ingredient[];
}
