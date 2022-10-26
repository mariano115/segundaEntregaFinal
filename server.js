const express = require("express");
const mongoose = require("mongoose");
const carritoRouter = require("./router/carritoRouter");
const productosRouter = require("./router/productosRouter");
const Config = require("./config");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log("listening on port " + PORT);
});

mongoose.connect(
  Config.urlMongo,
  {
    useNewUrlParser: true,
  },
  (err) => {
    if (err) throw new Error(`Error de conexión a la base de datos ${err}`);
    console.log("Base de datos conectada");
  }
);

app.on("error", (error) =>
  console.log({ mensaje: `Hubo un error: ${error.message}` })
);

app.use("/api/productos", productosRouter);
app.use("/api/carrito", carritoRouter);
app.use((req, res) => {
  res.status(404).send({
    error: -2,
    descripcion: `ruta ${req.originalUrl} no implementada`,
  });
});
