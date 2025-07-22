import { Sequelize, DataTypes, Model, Optional } from "sequelize";

// Définir les attributs de ton modèle
interface CommentAttributes {
  comment_id: number;
  user_id?: number;
  tournament_id: number;
  content: string;
  created_at?: Date;
}

// Pour les attributs optionnels à la création
interface CommentCreationAttributes
  extends Optional<CommentAttributes, "comment_id" | "created_at"> {}

class Comment
  extends Model<CommentAttributes, CommentCreationAttributes>
  implements CommentAttributes
{
  public comment_id!: number;
  public user_id?: number;
  public tournament_id!: number;
  public content!: string;
  public created_at?: Date;

  // Méthode d'association
  public static associate(models: any) {
    Comment.belongsTo(models.User, { foreignKey: "user_id" });
    Comment.belongsTo(models.Tournament, { foreignKey: "tournament_id" });
  }
}

export default (sequelize: Sequelize) => {
  Comment.init(
    {
      comment_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      tournament_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      tableName: "comments",
      timestamps: false,
    }
  );

  return Comment;
};
