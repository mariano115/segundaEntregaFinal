const fs = require("fs");
const productosModel = require("../models/Producto.model");

const getProductos = async () => {
  return await productosModel.find();
};

const getProductosById = async (id) => {
  return await productosModel.find({ _id: id });
};

const crearProducto = async (nuevoProducto) => {
  try {
    const producto = {
      timeStamp: new Date(),
      nombre: nuevoProducto.nombre,
      descripcion: nuevoProducto.descripcion,
      codigo: nuevoProducto.codigo,
      foto: nuevoProducto.foto,
      precio: nuevoProducto.precio,
      stock: nuevoProducto.stock,
    };

    const res = await new productosModel(producto).save();
    return res._id;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const editarProducto = async (id, product) => {
  try {
    return await productosModel.findOneAndUpdate({ _id: id }, { ...product });
  } catch (error) {
    console.log(error);
    return false;
  }
};

const eliminarProducto = async (id) => {
  const res = await productosModel.deleteOne({ _id: id });
  if (res.deletedCount > 0) {
    return true;
  } else {
    return false;
  }
};

module.exports = {
  getProductos,
  getProductosById,
  crearProducto,
  editarProducto,
  eliminarProducto,
};
