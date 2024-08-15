import {
  Table,
  Model,
  Column,
  DataType,
  AutoIncrement,
  PrimaryKey,
  AllowNull,
  Default,
} from "sequelize-typescript";
import { ROLES } from "../helpers/constants";

@Table({
  tableName: "users",
})
export class User extends Model<User> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  name!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  email!: string;

  @AllowNull(false)
  @Default(false)
  @Column(DataType.BOOLEAN)
  isActive!: boolean;


  @AllowNull(false)
  @Column(DataType.STRING)
  password!: string;

  @AllowNull(false)
  @Column({
    type: DataType.ENUM(...Object.values(ROLES)),
  })
  role!: ROLES;
}
