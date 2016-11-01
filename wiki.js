module.exports = function(sequelize, DataTypes) {
  return sequelize.define('wiki', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull:true,
    },
    year: {
      type: DataTypes.STRING,
      allowNull:true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    link: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    timestamps: false,
    freezeTableName: true
  });
};