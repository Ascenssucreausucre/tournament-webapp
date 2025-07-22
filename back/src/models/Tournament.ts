import { Sequelize, DataTypes, Model, Optional } from "sequelize";

interface TournamentAttributes {
  tournament_id?: number;
  name: string;
  description: string;
  created_by?: number;
  created_at?: Date;
  is_open?: Boolean;
  completion_count?: number;
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
    | "completion_count"
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
  public created_by!: number;
  public created_at?: Date;
  public is_open?: Boolean;
  public completion_count?: number;
  public clicks?: number;
  public likes?: number;
  public is_public?: Boolean;
  public max_participants?: number;

  public static associate(models: any) {
    {
      Tournament.belongsTo(models.User, { foreignKey: "created_by" });
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
      created_by: { type: DataTypes.INTEGER, allowNull: false },
      created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      is_open: { type: DataTypes.BOOLEAN, defaultValue: true },
      completion_count: { type: DataTypes.INTEGER, defaultValue: 0 },
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
