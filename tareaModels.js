const {  DataTypes } = require('sequelize');



const {sequelize} = require('./database.js');


const ap_comision21647a = sequelize.define('ap_comision21647a', {

    tematica: {
      type: DataTypes.STRING,
      
    },
    descripcion: {
      type: DataTypes.STRING
 
    },

    imagen: {
        type: DataTypes.STRING
         
      },

      fecha: {
        type: DataTypes.DATE
   
      }

  }, {
    timestamps: true,
    tableName: 'ap_comision21647a',
   
  });
  


  module.exports = ap_comision21647a;