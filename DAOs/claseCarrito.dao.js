const { default: mongoose } = require("mongoose");
const carritosModel = require("../models/Carrito.model");

const getCarritos = async () => {
  return await carritosModel.find();
};

const crearCarrito = async () => {
  try {
    const carrito = {
      timeStamp: new Date(),
      productos: [],
    };
    const res = await new carritosModel(carrito).save();
    return res._id;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const vaciarEliminarCarrito = async (id) => {
  const res = await carritosModel.deleteOne({ _id: id });
  if (res.deletedCount > 0) {
    return true;
  } else {
    return false;
  }
};

const getProductosByIdOfCarrito = async (id) => {
  try {
    const carrito = await carritosModel.find({ _id: id });
    if (carrito[0]) {
      return carrito[0].productos;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

const addProductosByIdOfCarrito = async (id, producto) => {
  try {
    await carritosModel.updateOne(
      { _id: id },
      { $push: { productos: producto } }
    );
    return true;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const deleteProductosByIdOfCarritoAndIdProduct = async (id, idProducto) => {
  try {
    const res = await carritosModel.updateOne(
      { _id: id },
      { $pull: { productos: { id: idProducto } } }
    );

    console.log("res", res);
    const carrito = await carritosModel.find({ _id: id });

    console.log("carrito", carrito);

    return true;
  } catch (error) {
    console.log(error);
    return error;
  }
};

module.exports = {
  getCarritos,
  crearCarrito,
  vaciarEliminarCarrito,
  getProductosByIdOfCarrito,
  addProductosByIdOfCarrito,
  deleteProductosByIdOfCarritoAndIdProduct,
};
