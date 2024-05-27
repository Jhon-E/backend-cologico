import { pool } from "../db.js";

//LA CATEGORIA DEBERIA VENIR COMO EL ID DE ESTA

export const createProduct = async (req, res) => {
  const { nombre, precio, stock, categoria, descripcion, imagen } = req.body;

  const cat_id = await pool.query(
    "SELECT ID_categoria FROM categorias WHERE nombre LIKE ?",
    [categoria]
  );

  try {
    await pool.query(
      "INSERT INTO producto (nombre,precio,stock,descripcion,ID_categoria, imagen) VALUES (?,?,?,?,?,?)",
      [nombre, precio, stock, descripcion, cat_id[0][0].ID_categoria, imagen]
    );
    res.status(200).send({ message: "producto publicado" });
  } catch (err) {
    console.error("Error al insertar en la database", err);
    res.status(500).send("Error interno del server hptaa");
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await pool.query(
      'SELECT producto.*, categorias.nombre AS "nombre_categoria" FROM producto LEFT JOIN categorias ON producto.ID_categoria = categorias.ID_categoria;'
    );
    res.send(products[0]);
  } catch (err) {
    console.error("Error al consultar los productos", err);
    res.status(500).send("Error interno del server");
  }
};

export const getProduct = async (req, res) => {
  const productID = req.params.id;
  try {
    const product = await pool.query(
      "SELECT * FROM producto WHERE ID_producto = ?",
      [productID]
    );
    if (product[0].length > 0) {
      res.send(product[0]);
    } else {
      res.status(404).send("producto no encontrado");
    }
  } catch (err) {
    console.error("Error al consultar los productos", err);
    res.status(500).send("Error interno del server");
  }
};
