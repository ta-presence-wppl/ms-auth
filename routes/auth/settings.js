const express = require('express');
const router = express.Router();
const UsersControllers = require('../../controllers/users');
const validator = require('./authValidator');
const authChecker = require('../../services/auth_check');
const { filterObj } = require('../../includes/helper');

//Sample Route
/**
 * @swagger
 * /auth:
 *   post:
 *     description: Auth User
 *     responses:
 *       200:
 *          description: Returns one User Specified.
 *          data: Some data user
 *          token: Return token to Verified User
 *     body:
 *          - email
 *          - password
 */

router.get('/', (req, res, next) => {
    res.json({
        message: 'Tes'
    })
});

router.put('/update-user', validator.validate("check_update"), validator.verify, (req, res, next) => {
    const allowed = ['nama', 'email', 'password'];
    const filtered = filterObj(req.body, allowed);
    filtered['id_peg'] = req.user_data.id_peg;

    if(filtered.password){
        new UsersControllers().updateUsers(filtered, true).then(x => {
            res.status(201).send({
                message: 'Sukses Update Data!',
                route: '/auth/update-user'
            })
        }).catch(err => {
            var details = {
                parent: err.parent,
                name: err.name,
                message: err.message
            }
            var error = new Error("Error pada server");
            error.status = 500;
            error.data = {
                date:new Date(),
                route:req.originalUrl,
                details:details
            };
            next(error);
        });
    }else{
        new UsersControllers().updateUsers(filtered, false).then(x => {
            res.status(201).send({
                message: 'Sukses Update Data!',
                route: '/auth/update-user'
            })
        }).catch(err => {
            var details = {
                parent: err.parent,
                name: err.name,
                message: err.message
            }
            var error = new Error("Error pada server");
            error.status = 500;
            error.data = {
                date:new Date(),
                route:req.originalUrl,
                details:details
            };
            next(error);
        });
    }
});
//End

//exports
module.exports = router;