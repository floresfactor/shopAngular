var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ProductoSchema   = new Schema({
    id: Number,
    nombre: String,
    precio: Number
});

module.exports = mongoose.model('Producto', ProductoSchema);
