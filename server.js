// BASE SETUP
// =============================================================================

// call the packages we need
var express = require('express');        // call express
var app = express();                 // define our app using express
var bodyParser = require('body-parser');

var usuariosRouter = require('./routers/usuarios');
var pedidosRouter = require('./routers/pedidos');
var productosRouter = require('./routers/productos');

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
    console.log('algo esta pasando...');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function (req, res) {
    res.json({ message: 'API ok! vamos bien...' });
});

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', usuariosRouter);
app.use('/api', pedidosRouter);
app.use('/api', productosRouter);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Corriendo en el puerto:' + port);

