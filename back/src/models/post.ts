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
import { User } from "./user";
import { Comment } from "./comment";
import { Recipe } from "./recipe";

@Table({
  tableName: "posts",
})
export class Post extends Model<Post> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  title!: string;

  @AllowNull(false)
  @Column(DataType.TEXT)
  description!: string;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  idUser!: number;

  @BelongsTo(() => User)
  user!: User;

  @HasMany(() => Comment)
  comments!: Comment[];

  @HasMany(() => Recipe)
  recipes!: Recipe[];
}
