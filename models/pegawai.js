const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = function (sequelize, DataTypes) {
  var pegawaiSchema = sequelize.define('pegawai', {
    id_peg: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    nama: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    tgl_lahir: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: "pegawai_email_key"
    },
    no_telp: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: "pegawai_no_telp_key"
    },
    kode_jabatan: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      references: {
        model: 'jabatan',
        key: 'kode_jabatan'
      }
    },
    // salt: {
    //   type: DataTypes.STRING,
    //   get() {
    //     return () => this.getDataValue('salt')
    //   }
    // }
  }, {
    sequelize,
    tableName: 'pegawai',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pegawai_email_key",
        unique: true,
        fields: [
          { name: "email" },
        ]
      },
      {
        name: "pegawai_no_telp_key",
        unique: true,
        fields: [
          { name: "no_telp" },
        ]
      },
      {
        name: "pegawai_pkey",
        unique: true,
        fields: [
          { name: "id_peg" },
        ]
      },
    ],
    hooks: {
      beforeCreate: async function(user) {
        const salt = await bcrypt.genSalt(10, 'a'); //whatever number you want
        user.password = await bcrypt.hash(user.password, salt);
      },
      beforeUpdate: async function(user) {
        console.warn(user.password)
        if (user.password) {
          const salt = await bcrypt.genSalt(10, 'a');
          user.password = await bcrypt.hash(user.password, salt);
        }
      },
    },
  });
  
  pegawaiSchema.prototype.validPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
  }

  return pegawaiSchema;
};
