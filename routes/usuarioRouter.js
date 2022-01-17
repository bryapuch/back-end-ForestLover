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
const { emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');

const router = Router();

// GET All
router.get('/', usuarioAll);

// GET One
router.get('/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
], usuarioOne);

// POST
router.post('/',[
    check('nickname', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe de ser más de 5 letras').isLength({ min: 5 }),
    check('correo', 'El correo no es válido').isEmail(),
    check('correo').custom(emailExiste),
    validarCampos
], usuarioNew);

// PUT
router.put('/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
],usuarioChange);

// DELETE
router.delete('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
],usuarioDelete);

module.exports = router;