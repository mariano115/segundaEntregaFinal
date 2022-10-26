const { Schema, model } = require("mongoose");

const productosSchema = new Schema({
  timeStamp: { type: Date, required: true },
  nombre: { type: String, required: true },
  descripcion: { type: String, required: true },
  codigo: { type: String, required: true },
  foto: { type: String, required: true },
  precio: { type: Number, required: true },
  stock: { type: Number, required: true },
});

module.exports = model("productos", productosSchema);
