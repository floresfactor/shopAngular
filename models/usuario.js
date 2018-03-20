var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UsuarioSchema = new Schema({
    id: Number,
    nombre: String,
    apellido: String,
    domicilio: String,
    pedidos: [{        
        type: Schema.Types.ObjectId,
        ref: "Pedido"
    }]
});

module.exports = mongoose.model('Usuario', UsuarioSchema);