const express = require("express");
const ProductsManager = require("./ProductManager.js");
const app = express();
const port = 8080;
app.use(express.urlencoded({ extended: true }));

const productManager = new ProductsManager("Products.json");

app.get("/products", (req, res) => {
  const limit = req.query.limit;
  const products = productManager.getProducts();

  if (req.query && limit) {
    const productsSlice = products.slice(0, limit);

    return res.json({
      msg: "Producto/s: ",
      data: productsSlice,
    });
  } else {
    return res.json({
      msg: "Productos: ",
      data: products,
    });
  }
});

app.get("/products/:pid", (req, res) => {
  const id = req.params.pid;
  const productFindById = productManager.getProductById(parseInt(id));
  if (productFindById != undefined) {
    return res.json({
      msg: "Producto con el id ",
      data: { productFindById },
    });
  } else {
    return res.json({
      msg: "No existe el producto con el id " + id,
      data: {},
    });
  }
});

app.get("*", (req, res) => {
  return res.json({
    Error: "Ruta no encontrada",
  });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
