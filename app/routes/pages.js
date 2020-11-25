// ===== Pages
// import all modules
const express								= require('express');

// import all controllers
const appController					= require('../controllers/appController');

// init router
const router								= express.Router();

router.get('/', appController.home);
router.post('/produk', appController.addProduct);
router.get('/produk', appController.getProducts);
router.delete('/produk/:id', appController.removeProduct);
router.get('/produk/:id', appController.getProductById);
router.put('/produk', appController.editProduct);

module.exports							= router;
