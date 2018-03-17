// BASE SETUP
// =============================================================================

// call the packages we need
var express = require('express');        // call express
var app = express();                 // define our app using express
var bodyParser = require('body-parser');
var Producto = require('./models/producto');
var Pedido = require('./models/pedido');
var Usuario = require('./models/usuario');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var mongoose = require('mongoose');
mongoose.connect('mongodb://jose:qwertyuiop@ds215709.mlab.com:15709/tienda'); // connect to our database

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function (req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function (req, res) {
    res.json({ message: 'API ok! vamos bien...' });
});

// more routes for our API will happen here
router.route('/productos')

    //create a producto (accessed at POST /api/productos)
    .post(function (req, res) {
        var producto = new Producto(); // create a new instance of the producto model
        producto.nombre = req.body.nombre; // set the productos name (comes from the request)
        producto.precio = req.body.precio;

        //save the producto and check for errors
        producto.save(function (err) {
            if (err)
                res.send(err);
            res.json({ message: 'producto creado' });
        });
    })

    //Get all productos (accessed at POST /api/productos)
    .get(function (req, res) {
        Producto.find(function (err, productos) {
            if (err)
                res.send(err);


            res.json(productos);

        });
    });

// more routes for our API will happen here
router.route('/usuarios')

    //create a producto (accessed at POST /api/productos)
    .post(function (req, res) {
        var usuario = new Usuario(); // create a new instance of the producto model
        usuario.nombre = req.body.nombre; // set the productos name (comes from the request)
        usuario.apellido = req.body.apellido; // set the productos name (comes from the request)
        usuario.domicilio = req.body.domicilio; // set the productos name (comes from the request)

        //save the producto and check for errors
        usuario.save(function (err) {
            if (err)
                res.send(err);
            res.json({ message: 'usuario creado' });
        });
    })

    //Get all productos (accessed at POST /api/productos)
    .get(function (req, res) {
        Usuario.find(function (err, usuarios) {
            if (err)
                res.send(err);
            res.json(usuarios);
        });
    });




router.route('/pedidos/productos/:producto_id')

    //create a pedido (accessed at POST /api/pedido)
    .post(function (req, res) {
        //var producto = new Producto(); 
        var pedido = new Pedido();
        Producto.findById(req.params.producto_id, function (err, productos) {
            if (err)
                res.send(err);
            pedido.total = req.body.total; //dato a actualizar
            pedido.producto = productos;

            //save the producto
            pedido.save(function (err) {
                if (err)
                    res.send(err);
                res.json({ message: 'Producto agregado al pedido ' });
            });
        });

    });

router.route('/pedidos/:pedido_id/productos/:producto_id')
    .put(function (req, res) {
        const pedido_id = req.params.pedido_id;
        const producto_id = req.params.producto_id;

        Pedido.findById(pedido_id, function (err, pedido) {
            if (err) {
                res.send(err);
            } else {


                pedido.producto = [...pedido.producto, producto_id];

                pedido.save(function (err) {
                    if (err) {
                        res.send(err.message);
                    } else {
                        res.json({ message: 'Producto agregado al pedido ' });
                    }
                });
            }
        });
    });



// more routes for our API will happen here
router.route('/pedidos')
    //Get all productos (accessed at POST /api/productos)
    .get(function (req, res) {
        Pedido.find({}).populate({
            path: 'producto',
            model: 'Producto'
        }).exec(function (err, pedidos) {
            if (err)
                res.send(err);
            res.send(pedidos);
        });
    });


/*router.route('/pedidos/:pedido_id')
.put(function(req,res){
    Pedido.findById(req.params.producto_id, function(err, productos){
        if(err)
            res.send(err);
        producto.nombre = req.body.nombre; //dato a actualizar
        producto.precio = req.body.precio; //dato a actualizar

        //save the producto
            pedido.save(function(err){
                if(err)
                    res.send(err);
                res.json({message: 'Producto actualizado'});
        });
    });
})
//delete the bear with this
.delete(function(req,res){
    Producto.remove({
        _id: req.params.producto_id
    }, function(err,bear){
        if(err)
            res.send(err);
        res.json({message:'se borro el id = '+ req.params.producto_id});
    

    });

})*/



router.route('/productos/:producto_id')

    //get the producto with that id 
    .get(function (req, res) {
        Producto.findById(req.params.producto_id, function (err, productos) {
            if (err)
                res.send(err);
            res.json(productos);


        });

    })

    .put(function (req, res) {
        Producto.findById(req.params.producto_id, function (err, producto) {
            if (err)
                res.send(err);
            producto.nombre = req.body.nombre; //dato a actualizar
            producto.precio = req.body.precio; //dato a actualizar


            //save the producto
            producto.save(function (err) {
                if (err)
                    res.send(err);
                res.json({ message: 'Producto actualizado' });
            });
        });
    })
    //delete the bear with this
    .delete(function (req, res) {
        Producto.remove({
            _id: req.params.producto_id
        }, function (err, bear) {
            if (err)
                res.send(err);
            res.json({ message: 'se borro el id = ' + req.params.producto_id });


        });

    });



router.route('/usuarios/:usuario_id')

    .put(function (req, res) {
        Usuario.findById(req.params.usuario_id, function (err, usuario) {
            if (err)
                res.send(err);
            usuario.nombre = req.body.nombre; //dato a actualizar
            usuario.apellido = req.body.apellido; //dato a actualizar
            usuario.domicilio = req.body.domicilio; //dato a actualizar

            //save the producto
            usuario.save(function (err) {
                if (err)
                    res.send(err);
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
                res.send(err);
            res.json({ message: 'se borro el id = ' + req.params.producto_id });


        });

    });



// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);

