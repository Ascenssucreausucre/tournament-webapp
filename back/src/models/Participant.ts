import { Model, DataTypes, Sequelize, Optional } from "sequelize";

interface ParticipantAttributes {
  participant_id: number;
  name: string;
  image_url: string;
  tournament_id?: number;
  created_by: number;
}

interface ParticipantCreationAttributes
  extends Optional<ParticipantAttributes, "tournament_id"> {}

class Participant
  extends Model<ParticipantAttributes, ParticipantCreationAttributes>
  implements ParticipantAttributes
{
  public participant_id!: number;
  public name!: string;
  public image_url!: string;
  public tournament_id?: number;
  public created_by!: number;

  public static associate(models: any) {
    Participant.belongsTo(models.Tournament, { foreignKey: "tournament_id" });
    Participant.hasMany(models.Vote, { foreignKey: "participant_id" });
  }
}

export default (sequelize: Sequelize) => {
  Participant.init(
    {
      participant_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: { type: DataTypes.STRING(100), allowNull: false },
      image_url: { type: DataTypes.STRING(255) },
      tournament_id: { type: DataTypes.INTEGER, allowNull: false },
      created_by: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      sequelize,
      tableName: "participants",
      timestamps: false,
    }
  );

  return Participant;
};
