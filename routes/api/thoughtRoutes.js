const router= require('express').Router();
const {
    getAll,
    getOne,
    newThought,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction
} = require('../../controllers/thoughtController');

router.route('/').get(getAll).post(newThought);
router.route('/:id').get(getOne).put(updateThought).delete(deleteThought);
router.route('/:id/reactions').post(addReaction);
router.route('/:id/reactions/reactionId').delete(removeReaction);

module.exports= router;