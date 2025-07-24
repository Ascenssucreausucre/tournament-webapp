import { Sequelize, DataTypes, Model, Optional } from "sequelize";

interface TournamentAttributes {
  tournament_id?: number;
  name: string;
  description: string;
  creator?: number;
  created_at?: Date;
  is_open?: Boolean;
  clicks?: number;
  likes?: number;
  is_public?: Boolean;
  max_participants?: number;
}

interface TournamentCreationAttributes
  extends Optional<
    TournamentAttributes,
    | "tournament_id"
    | "created_at"
    | "is_open"
    | "clicks"
    | "likes"
    | "is_public"
    | "max_participants"
  > {}

class Tournament
  extends Model<TournamentAttributes, TournamentCreationAttributes>
  implements TournamentAttributes
{
  public tournament_id?: number;
  public name!: string;
  public description!: string;
  public creator!: number;
  public created_at?: Date;
  public is_open?: Boolean;
  public clicks?: number;
  public likes?: number;
  public is_public?: Boolean;
  public max_participants?: number;

  public static associate(models: any) {
    {
      Tournament.belongsTo(models.User, { foreignKey: "creator" });
      Tournament.hasMany(models.Participant, { foreignKey: "tournament_id" });
      Tournament.hasMany(models.Comment, { foreignKey: "tournament_id" });
      Tournament.hasOne(models.TournamentStatistic, {
        foreignKey: "tournament_id",
      });
    }
  }
}

export default (sequelize: Sequelize) => {
  Tournament.init(
    {
      tournament_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: { type: DataTypes.STRING(100), allowNull: false },
      description: { type: DataTypes.TEXT, allowNull: false },
      creator: { type: DataTypes.INTEGER, allowNull: false },
      created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      is_open: { type: DataTypes.BOOLEAN, defaultValue: true },
      clicks: { type: DataTypes.INTEGER, defaultValue: 0 },
      likes: { type: DataTypes.INTEGER, defaultValue: 0 },
      is_public: { type: DataTypes.BOOLEAN, defaultValue: true },
      max_participants: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 16,
      },
    },
    {
      sequelize,
      tableName: "tournaments",
      timestamps: false,
    }
  );

  return Tournament;
};
