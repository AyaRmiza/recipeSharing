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
import { Post } from "./post";

@Table({
  tableName: "comments",
})
export class Comment extends Model<Comment> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @AllowNull(false)
  @Column(DataType.TEXT)
  content!: string;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  idUser!: number;

  @ForeignKey(() => Post)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  idPost!: number;

  @BelongsTo(() => User)
  user!: User;

  @BelongsTo(() => Post)
  post!: Post;
}
