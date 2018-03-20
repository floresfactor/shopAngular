var express = require('express');
var router = express.Router();

var Producto = require('../models/producto');
var Pedido = require('../models/pedido');
var Usuario = require('../models/usuario');

// more routes for our API will happen here
router.route('/productos')
    //Get all productos (accessed at POST /api/productos)
    .get(function (req, res) {
        Producto.find(function (err, productos) {
            if (err)
                return res.send(err);

            return res.json(productos);
        });
    });



//create a producto (accessed at POST /api/productos)
router.route('/productos').post(function (req, res) {
    var producto = new Producto(); // create a new instance of the producto model
    producto.nombre = req.body.nombre; // set the productos name (comes from the request)
    producto.precio = req.body.precio;

    //save the producto and check for errors
    producto.save(function (err) {
        if (err)
            return res.send(err);
        return res.json({ message: 'producto creado' });
    });
})

router.route('/productos/:producto_id')
    //get the producto with that id 
    .get(function (req, res) {
        Producto.findById(req.params.producto_id, function (err, productos) {
            if (err)
                return res.send(err);
            return res.json(productos);
        });

    })
    .put(function (req, res) {
        Producto.findById(req.params.producto_id, function (err, producto) {
            if (err)
                return res.send(err);
                
            producto.nombre = req.body.nombre; //dato a actualizar
            producto.precio = req.body.precio; //dato a actualizar

            //save the producto
            producto.save(function (err) {
                if (err)
                    return res.send(err);
                return res.json({ message: 'Producto actualizado' });
            });
        });
    })
    //delete the bear with this
    .delete(function (req, res) {
        Producto.remove({
            _id: req.params.producto_id
        }, function (err, bear) {
            if (err)
                return res.send(err);
            return res.json({ message: 'se borro el id = ' + req.params.producto_id });
        });
    });

module.exports = router;