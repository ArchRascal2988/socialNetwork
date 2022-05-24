const router= require('express').Router();
const {
    getAll,
    getOne,
    newUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
} = require('../../controllers/userController');

router.route('/').get(getAll).post(newUser);
router.route('/:id').get(getOne).put(updateUser).delete(deleteUser);
router.route('/:id/friends/:friendId').put(addFriend).delete(removeFriend);

module.exports= router;