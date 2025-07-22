import { Sequelize, DataTypes, Model, Optional } from "sequelize";

interface UserAttributes {
  user_id?: number;
  username: string;
  email: string;
  password: string;
  created_at?: Date;
  role: string;
}

interface UserCreationAtributes
  extends Optional<UserAttributes, "user_id" | "created_at"> {}

class User
  extends Model<UserAttributes, UserCreationAtributes>
  implements UserAttributes
{
  public user_id?: number;
  public username!: string;
  public email!: string;
  public password!: string;
  public created_at?: Date;
  public role!: string;

  public static associate(models: any) {
    User.hasMany(models.Tournament, { foreignKey: "created_by" });
    User.hasMany(models.Comment, { foreignKey: "user_id" });
    User.hasMany(models.Vote, { foreignKey: "user_id" });
  }
}

export default (sequelize: Sequelize) => {
  User.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      username: { type: DataTypes.STRING(50), allowNull: false },
      email: { type: DataTypes.STRING(100), allowNull: false },
      password: { type: DataTypes.STRING(255), allowNull: false },
      created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      role: { type: DataTypes.ENUM("admin", "user"), defaultValue: "user" },
    },
    {
      sequelize,
      tableName: "users",
      timestamps: false,
      indexes: [
        // { unique: true, fields: ["username"] },
        { unique: true, fields: ["email"] },
      ],
    }
  );

  return User;
};
