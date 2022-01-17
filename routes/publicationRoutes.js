const {Router} = require('express');

const { 
    publicacionAll,
    publicacionOne,
    publicacionChange,
    publicacionNew,
    publicacionDelete
} = require('../controllers/publicationController');

const router = Router();

// GET All
router.get('/',publicacionAll);

// GET One
router.get('/:id',publicacionOne);

// POST
router.post('/',publicacionChange);

// PUT
router.put('/:id',publicacionNew);

// DELETE
router.delete('/:id', publicacionDelete);

module.exports = router;