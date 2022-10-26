const { Schema, model } = require("mongoose");

const carritosSchema = new Schema({
  timeStamp: { type: Date, required: true },
  productos: { type: Array, required: true },
});

module.exports = model("carritos", carritosSchema);
