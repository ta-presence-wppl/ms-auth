const express = require('express');
const router = express.Router();

//Define Root Auth
const routerAuth = require('./auth/auth');

//Define API /auth
router.use('/auth', (req, res, next) => {
    next();
}, routerAuth);

//Sample Route
/**
  * @swagger
  * /:
  *   get:
  *     description: Returns the homepage
  *     responses:
  *       200:
  *         description: hello world
  */
router.get('/', (req, res, next) => {
    res.send({
        message: 'Service Auth',
        url: req.originalUrl
    })
});
//End Sample

//exports
module.exports = router;