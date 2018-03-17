var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ProductoSchema = require('./producto');

var PedidoSchema = new Schema({
    id: Number,
    total: Number,
    iva: Number,
    subtotal: Number,
    producto: [{ type: Schema.Types.ObjectId, ref: 'Producto' }]
});

// PedidoSchema.pre('save', function (next) {
//     const doc = this;
//     const ids = doc.producto.map(ped => {
//         return { _id: ped._id };
//     });
//     console.log(ids);
//     ProductoSchema
//         .find({ $or: ids }, (err, productos) => {
//             doc.subtotal = 0;
//             doc.iva = 0;
//             doc.total = 0;

//             productos.forEach(prod => {
//                 doc.subtotal += prod.precio;
//                 doc.iva += prod.precio * 0.16;
//                 doc.total += doc.iva + doc.subtotal
//             });

//             next();
//         });
// });

module.exports = mongoose.model('Pedido', PedidoSchema);
