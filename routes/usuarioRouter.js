const {Router} = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');

const { 
    usuarioAll, 
    usuarioOne, 
    usuarioNew, 
    usuarioChange, 
    usuarioDelete 
} = require('../controllers/usuariosController');

const router = Router();

// GET All
router.get('/', usuarioAll);

// GET One
router.get('/:id', usuarioOne);

// POST
router.post('/',[
    check('nickname', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe de ser más de 5 letras').isLength({ min: 5 }),
    check('correo', 'El correo no es válido').isEmail(),
    validarCampos
], usuarioNew);

// PUT
router.put('/:id',usuarioChange);

// DELETE
router.delete('/:id', usuarioDelete);

module.exports = router;