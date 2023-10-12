module.exports = (sequelize, DataTypes) => {
  const TokensModels = sequelize.define(
    "TokensModels",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        alloNull: false,
      },
      token: {
        type: DataTypes.TEXT,
        alloNull: false,
      },
      users_id: {
        type: DataTypes.INTEGER,
        alloNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        alloNull: false,
        field: "created_at",
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: "updated_at",
        alloNull: false,
      },
    },
    {
      tableName: "refresh_token",
      timestamps: true,
    }
  );

  return TokensModels;
};
