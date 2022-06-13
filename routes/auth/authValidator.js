const { query, body, validationResult, param, header, oneOf } = require('express-validator');

exports.validate = (method) => {
    switch (method) {
        case 'check_auth': {
            return [
                body('email', 'email harus diinput').notEmpty(),
                body('password', 'password harus diinput').notEmpty(),
            ]
        }
        case 'check_register': {
            return [
                body('email', 'email harus diinput').notEmpty(),
                body('password', 'password harus diinput').notEmpty(),
                body('id_atasan', 'id_atasan harus diinput').notEmpty(),
                body('no_telp', 'no_telp harus diinput').notEmpty(),
                body('kode_jabatan', 'kode_jabatan harus diinput').notEmpty(),
            ]
        }
        case 'check_update': {
            return [
                body('email', 'email -or').optional(),
                body('password', 'password -or').optional(),
                body('no_telp', 'no_telp -or').optional(),
            ]
        }
    }
}

exports.verify = (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(422).json({
                errors: errors.array()
            })
            return;
        } else {
            return next();
        }
    } catch (err) {
        return next(err);
    }
}