const {Router} = require('express');

const { 
    usuarioAll, 
    usuarioOne, 
    usuarioNew, 
    usuarioChange, 
    usuarioDelete 
} = require('../controllers/usuariosController');

const router = Router();

// GET All
router.get('/',usuarioAll);

// GET One
router.get('/:id',usuarioOne);

// POST
router.post('/',usuarioNew);

// PUT
router.put('/:id',usuarioChange);

// DELETE
router.delete('/:id', usuarioDelete);

module.exports = router;