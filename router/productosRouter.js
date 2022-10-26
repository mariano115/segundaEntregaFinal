const router = require("express").Router();
const PersistenceProducto = require("../DAOs/claseProducto.dao");

function adminValidator(req, res, next) {
  if (JSON.parse(req.query.admin.toLowerCase())) {
    next();
  } else {
    res
      .status(500)
      .send({ error: -1, descripcion: `ruta ${req.baseUrl} no autorizada ` });
  }
}

router.get("/:id?", async (req, res) => {
  try {
    if (req.params.id) {
      res
        .status(200)
        .send(await PersistenceProducto.getProductosById(req.params.id));
    } else {
      res.status(200).send(await PersistenceProducto.getProductos());
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(`Hubo un problema al obtener el resultado`);
  }
});

router.post("/", adminValidator, async (req, res) => {
  res.status(201).send(await PersistenceProducto.crearProducto(req.body));
});

router.put("/:id", adminValidator, async (req, res) => {
  try {
    const response = await PersistenceProducto.editarProducto(
      req.params.id,
      req.body
    );
    if (response) {
      res.status(200).send(response);
      return;
    }
    res.status(404).send({ error: "producto no encontrado" });
  } catch (error) {
    console.log("Catch error: " + error);

    res
      .status(500)
      .json({ error: "Error inesperado, comuniquese con el administrador" });
  }
});

router.delete("/:id", adminValidator, async (req, res) => {
  console.log(req.params.id);
  try {
    if (await PersistenceProducto.eliminarProducto(req.params.id)) {
      res.send("producto eliminado correctamente");
      return;
    }
    res.status(404).send({ error: "producto no encontrado" });
  } catch (error) {
    console.log("Catch error: " + error);

    res
      .status(500)
      .json({ error: "Error inesperado, comuniquese con el administrador" });
  }
});

module.exports = router;
