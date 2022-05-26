const { Op, Model, QueryTypes, DataTypes, Sequelize } = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_CONN);
const initModels = require('../models/init-models');
var models = initModels(sequelize);


class UsersControllers {
    createUsers(data) {
        return models.pegawai.create({
            ...data
        })
    }

    getUsers = (user) => {
        return new Promise((resolve, reject) => {
            try {
                models.pegawai.findOne({
                    attributes: {
                        exclude: ['id_peg']
                    },
                    where: {
                        email: user.email // user email
                    }
                }).then(async (response) => {
                    if (!response) {
                        resolve(false);
                    } else {
                        if (!response.validPassword(user.password)) {
                            resolve(false);
                        } else {
                            delete response.dataValues.password
                            resolve(response.dataValues)
                        }
                    }
                })
            } catch (error) {
                const response = {
                    status: 500,
                    data: {},
                    error: {
                        message: "user match failed"
                    }
                };
                reject(response);
            }
        })
    }
}

module.exports = UsersControllers;