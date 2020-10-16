const { Router } = require('express');
const express = require('express');
const multer = require('multer');
const path = require('path');

// import all routers;
const productRouter = require('./product.js');
const categoryRouter = require('./category.js');
const userRouter = require('./user.js')
const orderRouter = require('./order.js')
const carritoRouter = require('./carrito.js');

const router = Router();

// load each router on a route
// i.e: router.use('/auth', authRouter);
// router.use('/auth', authRouter);

//Como va  almacenar los archivos multer
const storage = multer.diskStorage({
    destination: path.join(__dirname, '../public/uploads'),
    filename: (req, file, cb) => {
        cb(null, file.originalname); 
    }
})

//En donde va a colocar los archivos multer
router.use(multer({
    storage,
    dest: path.join(__dirname, '../public/uploads'),
    limits: { fileSize: 10000000 }
}).single('image'));

// Static files
// Permite que podamos acceder a esta ruta publica
router.use(express.static(path.join(__dirname, '../public')))

router.use('/', productRouter, categoryRouter, userRouter, orderRouter);

router.use('/', productRouter, categoryRouter, userRouter, orderRouter, carritoRouter);

module.exports = router;
