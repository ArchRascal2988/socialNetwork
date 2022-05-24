const router = require('express').Router();
const api= require('./api/index');

router.use('/', api);

module.exports= router;