const { Schema, model } = require("mongoose");

const carritosSchema = new Schema({
  timeStamp: { type: Date, required: true },
  productos: { type: Array, required: true },
});

/* class Carrito {
  constructor(id, productos = []) {
    this.id = id;
    this.timeStamp = Date.now();
    this.productos = productos;
  }
} */
module.exports = model("carritos", carritosSchema);
