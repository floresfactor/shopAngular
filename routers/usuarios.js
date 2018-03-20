var express = require('express');
var router = express.Router();

var Producto = require('../models/producto');
var Pedido = require('../models/pedido');
var Usuario = require('../models/usuario');

router.route('/usuarios').get(function (req, res) {
    Usuario.find()
        .populate({
            path: "pedidos",
            populate: {
                path:
                    "productos.producto"
            }
        })
        .exec((err, usuarios) => {
            if (err)
                return res.send(err);
            if (!usuarios)
                return res.status(404).json({ message: "No se encontraron usuarios" });
            return res.json(usuarios);
        });
});

router.route('/usuarios').post(function (req, res) {
    var usuario = new Usuario();
    usuario.nombre = req.body.nombre;
    usuario.apellido = req.body.apellido;
    usuario.domicilio = req.body.domicilio;

    //save the producto and check for errors
    usuario.save(function (err) {
        if (err)
            return res.send(err);
        res.json({ message: 'usuario creado' });
    });
})

router.route('/usuarios/:usuario_id')
    .get((req, res) => {
        Usuario.findById(req.params.usuario_id, (err, usuario) => {
            if (err)
                return res.send(err);
            if (!usuario)
                return res.status(404).json({ message: "no se encontro el usuario" });

            usuario.populate({
                path: "pedidos",
                populate: {
                    path: "productos.producto"
                }
            }, (err, usu) => {
                if (err)
                    return res.send(err);
                return res.json(usu);
            });
        });
    })
    .put(function (req, res) {
        Usuario.findById(req.params.usuario_id, function (err, usuario) {
            if (err)
                return res.send(err);
            usuario.nombre = req.body.nombre; //dato a actualizar
            usuario.apellido = req.body.apellido; //dato a actualizar
            usuario.domicilio = req.body.domicilio; //dato a actualizar

            //save the producto
            usuario.save(function (err) {
                if (err)
                    return res.send(err);
                res.json({ message: 'Usuario actualizado' });
            });
        });
    })
    //delete the bear with this
    .delete(function (req, res) {
        Usuario.remove({
            _id: req.params.usuario_id
        }, function (err, usuario) {
            if (err)
                return res.send(err);
            res.json({ message: 'se borro el usuario: ' + req.params.usuario_id });
        });
    });

router.route('/usuarios/:usuario_id/pedidos/:pedido_id')
    // Agrega el pedido al usuario
    .post(function (req, res) {
        const usuario_id = req.params.usuario_id;
        const pedido_id = req.params.pedido_id;

        Usuario.findById(usuario_id, function (err, usuario) {
            if (err)
                return res.send(err);
            if (!usuario)
                return res.status(404).send({ message: "usuario no encontrado" });

            Pedido.findById(pedido_id, (err, pedido) => {
                if (err)
                    return res.send(err);
                if (!pedido)
                    return res.status(404).send({ message: "pedido no encontrado" });

                usuario.pedidos.push(pedido_id);

                usuario.save((err) => {
                    if (err)
                        return res.send(err);
                    return res.send({ message: "pedido agregado" });
                })
            });
        });
    }).delete((req, res) => {
        const usuario_id = req.params.usuario_id;
        const pedido_id = req.params.pedido_id;

        Usuario.findById(usuario_id, function (err, usuario) {
            if (err)
                return res.send(err);
            if (!usuario)
                return res.status(404).send({ message: "usuario no encontrado" });

            usuario.pedidos = usuario.pedidos.find(pedidoID => !pedidoID.equals(pedido_id));

            usuario.save((err) => {
                if (err)
                    return res.send(err);
                return res.send({ message: "pedido borrado del usuario" });
            })
        });
    });

module.exports = router;