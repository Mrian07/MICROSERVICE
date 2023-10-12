module.exports = (sequelize, DataTypes) => {
  const MediaModels = sequelize.define(
    "MediaModels",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        alloNull: false,
      },
      image: {
        type: DataTypes.STRING,
        alloNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        field: "created_at",
        alloNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: "updated_at",
        alloNull: false,
      },
    },
    {
      tableName: "media",
    }
  );

  return MediaModels;
};
