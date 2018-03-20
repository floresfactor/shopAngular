var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ProductoSchema = require('./producto');

var PedidoSchema = new Schema({
    id: Number,
    total: Number,
    iva: Number,
    subtotal: Number,
    productos: [{
        producto: {
            type: Schema.Types.ObjectId,
            ref: 'Producto',
        },
        cantidad: Number,
        importe: Number
    }]
});

PedidoSchema.pre('save', function (next) {
    const pedido = this;

    pedido.populate("productos.producto", function (err, pedido) {

        if (err) next(err);

        pedido.subtotal = 0;
        pedido.productos.forEach((producto, i) => {
            producto.importe = producto.producto.precio * producto.cantidad;
            pedido.subtotal += producto.importe;
        });

        pedido.iva = pedido.subtotal * 0.16;
        pedido.total = pedido.subtotal + pedido.iva;

        // pedido.products unpopulate
        pedido.productos.forEach((producto) => {
            producto.producto = producto.producto._id;            
        });

        next();
    });
});

module.exports = mongoose.model('Pedido', PedidoSchema);
