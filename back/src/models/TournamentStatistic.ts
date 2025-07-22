import { Sequelize, DataTypes, Model, Optional } from "sequelize";

interface TournamentStatisticAttributes {
  stat_id?: number;
  tournament_id: number;
  participant_stats: JSON;
  winner_id: number;
  created_at?: Date;
}

interface TournamentStatisticCreationAttributes
  extends Optional<TournamentStatisticAttributes, "stat_id" | "created_at"> {}

class TournamentStatistic
  extends Model<
    TournamentStatisticAttributes,
    TournamentStatisticCreationAttributes
  >
  implements TournamentStatisticAttributes
{
  public stat_id?: number;
  public tournament_id!: number;
  public participant_stats!: JSON;
  public winner_id!: number;
  public created_at?: Date;

  public static assoctiate(models: any) {
    TournamentStatistic.belongsTo(models.Tournament, {
      foreignKey: "tournament_id",
    });
  }
}

export default (sequelize: Sequelize) => {
  TournamentStatistic.init(
    {
      stat_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      tournament_id: { type: DataTypes.INTEGER, allowNull: false },
      participant_stats: { type: DataTypes.JSON, allowNull: false },
      winner_id: { type: DataTypes.INTEGER },
      created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    },
    {
      sequelize,
      tableName: "tournament_statistics",
      timestamps: false,
    }
  );

  return TournamentStatistic;
};
