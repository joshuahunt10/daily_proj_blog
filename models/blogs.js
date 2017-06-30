'use strict';
module.exports = function(sequelize, DataTypes) {
  var blogs = sequelize.define('blogs', {
    title:{
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Put in a glorious title!'
        }
      }
    },
    text:{
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'You need some content in your body!'
        }
      }
    }



  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return blogs;
};
