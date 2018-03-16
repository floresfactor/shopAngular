var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
//var ProductoSchema = require('./producto');

var PedidoSchema   = new Schema({
    id: Number,
    total: Number,
    iva: Number,
    subtotal: Number,
    productos: [{ type: Schema.Types.ObjectId, ref: 'Producto' }],
    precio: Number
});

module.exports = mongoose.model('Pedido', PedidoSchema);
