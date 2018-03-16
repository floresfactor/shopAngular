// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var Producto = require('./models/producto');
var Pedido = require('./models/pedido');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var mongoose   = require('mongoose');
mongoose.connect('mongodb://jose:qwertyuiop@ds215709.mlab.com:15709/tienda'); // connect to our database

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'API ok! vamos bien...' });   
});

// more routes for our API will happen here
router.route('/productos')

    //create a producto (accessed at POST /api/productos)
    .post(function(req,res){
        var producto = new Producto(); // create a new instance of the producto model
        producto.nombre = req.body.nombre; // set the productos name (comes from the request)
        producto.precio = req.body.precio; 
        
        //save the producto and check for errors
        producto.save(function(err){
            if(err)
                res.send(err);
            res.json({ message: 'producto creado'});
        });
    })

    //Get all productos (accessed at POST /api/productos)
    .get(function(req,res){
        Producto.find(function(err,productos){
            if(err)
                res.send(err);
                res.json(productos);
        });
    });

    // more routes for our API will happen here
    router.route('/pedidos')
    
        //create a pedido (accessed at POST /api/pedido)
        .post(function(req,res){
            var pedido = new Pedido(); // create a new instance of the producto model
            pedido.producto = req.body.producto; // set the productos name (comes from the request)
            pedido.total = req.body.total; // set the productos name (comes from the request)
        

            /*total: Number,
    iva: Number,
    subtotal: Number,
    producto: ProductoSchema,
    precio: Number*/
            
            //save the producto and check for errors
            pedido.save(function(err){
                if(err)
                    res.send(err);
                res.json({ message: 'pedido creado'});
            });
        })
    
        //Get all productos (accessed at POST /api/productos)
        .get(function(req,res){
            Pedido.find(function(err,pedidos){
                if(err)
                    res.send(err);
                    res.json(pedidos);
            });
        });

router.route('/productos/:producto_id')

    //get the producto with that id 
    .get(function(req,res){
        Producto.findById(req.params.producto_id, function(err, producto){
            if(err)
                res.send(err);
            res.json(producto);


        });

    });

router.route('/productos/:producto_id')
    .put(function(req,res){
        Producto.findById(req.params.producto_id, function(err, producto){
            if(err)
                res.send(err);
            producto.nombre = req.body.nombre; //dato a actualizar
            producto.precio = req.body.precio; //dato a actualizar

            //save the producto
                producto.save(function(err){
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
        

        })

    })



// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);

