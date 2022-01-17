const {Router} = require('express');

const { 
    publicationAll,
    publicationOne,
    publicationChange,
    publicationNew,
    publicationDelete
} = require('../controllers/publicationController');

const router = Router();

// GET All
router.get('/', publicationAll );

// GET One
router.get('/:id',publicationOne);

// POST
router.post('/',publicationChange);

// PUT
router.put('/:id',publicationNew);

// DELETE
router.delete('/:id', publicationDelete);

module.exports = router;