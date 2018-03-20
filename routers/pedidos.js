var express = require('express');
var router = express.Router();

var Producto = require('../models/producto');
var Pedido = require('../models/pedido');
var Usuario = require('../models/usuario');


router.route('/pedidos')
    //Get all productos (accessed at POST /api/productos)
    .get(function (req, res) {
        Pedido.find({}).populate({
            path: 'productos.producto',
            model: 'Producto'
        }).exec(function (err, pedidos) {
            if (err)
                res.send(err);
            res.send(pedidos);
        });
    });

router.route('/pedidos/:pedido_id')
    .get((req, res) => {
        const pedido_id = req.params.pedido_id;

        Pedido.findById(pedido_id, function (err, pedido) {
            if (err)
                return res.send(err.message);
            if (!pedido)
                return res.status(404).send({ message: "pedido no encontrado" });

            pedido.populate("productos.producto", (err, pedido) => {
                if (err)
                    return res.send(err.message);
                return res.send(pedido);
            });
        })
    })
    .delete((req, res) => {
        const pedido_id = req.params.pedido_id;

        Pedido.deleteOne({ _id: pedido_id }, function (err) {
            if (err)
                return res.send(err.message);

            res.json({ message: 'pedido borrado' });
        })
    });

router.route('/pedidos/productos/:cantidad/:producto_id')
    //create a pedido (accessed at POST /api/pedido)
    .post(function (req, res) {
        //var producto = new Producto(); 
        var pedido = new Pedido();
        Producto.findById(req.params.producto_id, function (err, producto) {
            if (err)
                return res.send(err);

            pedido.productos = [{
                producto: producto._id.toString(),
                cantidad: req.params.cantidad
            }];

            //save the producto
            pedido.save(function (err, ped) {
                if (err)
                    return res.send(err);
                return res.json({ message: 'Producto agregado al pedido ', pedido_id: ped._id.toString() });
            });
        });

    });

router.route('/pedidos/:pedido_id/productos/:producto_id')
    .delete(function (req, res) {
        Pedido.findById(req.params.pedido_id, (err, pedido) => {
            if (err) return res.send(err);

            if (!pedido) return res.send({ message: "Pedido no encontrado." });

            pedido.productos = pedido.productos.filter(prod => !prod.producto.equals(req.params.producto_id));

            pedido.save((err) => {
                if (err) return res.send(err);
                res.json({ message: "producto borrado del pedido" });
            });
        });
    });

router.route('/pedidos/:pedido_id/productos/:cantidad/:producto_id')
    .put(function (req, res) {

        const pedido_id = req.params.pedido_id;
        const producto_id = req.params.producto_id;
        const cantidad = req.params.cantidad

        Pedido.findById(pedido_id, function (err, pedido) {
            if (err) return res.send(err);

            Producto.findById(producto_id, function (err, producto) {

                if (err) return res.send(err)

                if (!producto) return res.send({ message: "Producto no encontrado." });

                pedido.productos = [...pedido.productos, { producto: producto_id, cantidad }];

                pedido.save(function (err) {
                    if (err) {
                        res.send(err.message);
                    } else {
                        res.json({ message: 'Producto agregado al pedido ' });
                    }
                });
            });
        });
    });

module.exports = router;