const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Vote = sequelize.define(
    "Vote",
    {
      vote_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: { type: DataTypes.INTEGER },
      participant_id: { type: DataTypes.INTEGER, allowNull: false },
      value: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: { isIn: [[1, -1]] },
      },
      created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    },
    {
      tableName: "votes",
      timestamps: false,
    }
  );

  Vote.associate = (models) => {
    Vote.belongsTo(models.User, { foreignKey: "user_id" });
    Vote.belongsTo(models.Participant, { foreignKey: "participant_id" });
  };

  return Vote;
};
