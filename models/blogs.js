'use strict';
module.exports = function(sequelize, DataTypes) {
  var blogs = sequelize.define('blogs', {
    title: DataTypes.STRING,
    text: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return blogs;
};
