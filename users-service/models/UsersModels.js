module.exports = (sequelize, DataTypes) => {
  const UsersModels = sequelize.define(
    "UsersModels",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        alloNull: false,
      },
      name: {
        type: DataTypes.STRING,
        alloNull: false,
      },
      email: {
        type: DataTypes.STRING,
        alloNull: false,
        uniqui: true,
      },
      password: {
        type: DataTypes.STRING,
        alloNull: false,
      },
      profession: {
        type: DataTypes.STRING,
        alloNull: true,
      },
      avatar: {
        type: DataTypes.STRING,
        alloNull: true,
      },
      role: {
        type: DataTypes.ENUM,
        values: ["admin", "student"],
        defaulValue: "student",
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
      tableName: "users",
      timestamps: true,
    }
  );

  return UsersModels;
};
