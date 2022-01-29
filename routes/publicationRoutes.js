const {Router} = require('express');
const {validarjwt}=require('../middlewares/validar-jwt')
const {uploadPostImage}=require('../middlewares/uploadPostImage')
const {uploadPostCoverImage}=require('../controllers/uploadController')

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
router.get('/:id',validarjwt,publicationOne);

// POST
router.post('/',validarjwt,publicationNew);

// PUT
router.put('/:id',validarjwt,publicationChange);

// DELETE
router.delete('/:id',validarjwt, publicationDelete);
router.patch('/create-post/cover-image/:id',validarjwt,uploadPostImage.single('image'),uploadPostCoverImage)

module.exports = router;