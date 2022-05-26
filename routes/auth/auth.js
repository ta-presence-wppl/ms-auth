const express = require('express');
const router = express.Router();
const UsersControllers = require('../../controllers/users');
const validator = require('./authValidator');
const authChecker = require('../../services/auth_check');

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
router.post('/', validator.validate("check_auth"), validator.verify, (req, res, next) => {
    new UsersControllers().getUsers({
        email: req.body.email,
        password: req.body.password
    }).then(x => {
        if(x){
            res.send({
                message: 'Service Auth',
                route: '/auth/',
                data: x,
                token: authChecker.generateToken(x)
            })
        }else{
            res.status(401).send({
                message: 'Email atau Password Salah!'
            })
        }
    }).catch(err => {
        var details = {
            parent: err.parent,
            name: err.name,
            message: err.message
        }
        next(err);
    });
});

router.post('/create-user', validator.validate("check_auth"), validator.verify, (req, res, next) => {
    new UsersControllers().createUsers(req.body).then(x => {
        res.send({
            message: 'Service Auth',
            route: '/auth/create-user',
            data: x
        })
    }).catch(err => {
        console.log(err)
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
});
//End Sample

//exports
module.exports = router;