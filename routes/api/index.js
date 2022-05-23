const router = require('./thoughtRoutes');
const thoughts= require('./thoughtRoutes');
const users= require('./userRoutes');

router.use('/', '/api');
router.use('/thought', thoughts);
router.use('user', users);

module.exports= router;