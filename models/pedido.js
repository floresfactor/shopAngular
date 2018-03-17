var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var ProductoSchema = require('./producto');

var PedidoSchema = new Schema({
    id: Number,
    total: Number,
    iva: Number,
    subtotal: Number,
    producto: [{ type: Schema.Types.ObjectId, ref: 'Producto' }]
});

module.exports = mongoose.model('Pedido', PedidoSchema);
