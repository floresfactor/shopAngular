// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var Producto = require('./models/producto');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost:27017/shop'); // connect to our database

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
    res.json({ message: 'hooray! welcome to our api!' });   
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

    //create a producto (accessed at POST /api/productos)
    .get(function(req,res){
        Producto.find(function(err,productos){
            if(err)
                res.send(err);
                res.json(productos);
        });
    });



// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);

