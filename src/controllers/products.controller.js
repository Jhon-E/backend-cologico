import { pool } from "../db.js";

//LA CATEGORIA DEBERIA VENIR COMO EL ID DE ESTA

export const createProduct = async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  const {
    nombre,
    precio,
    stock,
    categoria,
    descripcion,
    imagen,
    nombreUser,
    emailUser,
  } = req.body;


  const cat_id = await pool.query(
    "SELECT ID_categoria FROM categorias WHERE nombre LIKE ?",
    [categoria]
  );

  const id_user = await pool.query(
    "SELECT usuario_vendedor.ID_usuarioVendedor FROM usuario_vendedor INNER JOIN usuario ON usuario.ID_usuario = usuario_vendedor.ID_usuario WHERE usuario.nombre LIKE ? AND usuario.email LIKE ?",
    [nombreUser, emailUser]
  );

  console.log(id_user[0][0].ID_usuario);

  try {
    await pool.query(
      "INSERT INTO producto (nombre,precio,stock,descripcion,ID_categoria, imagen, id_vendedor) VALUES (?,?,?,?,?,?,?)",
      [
        nombre,
        precio,
        stock,
        descripcion,
        cat_id[0][0].ID_categoria,
        imagen,
        id_user[0][0].ID_usuario,
      ]
    );
    res.status(200).send({ message: "producto publicado" });
  } catch (err) {
    console.error("Error al insertar en la database", err);
    res.status(500).send("Error interno del server");
  }
};

export const getProducts = async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
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
  res.header("Access-Control-Allow-Origin", "*");
  const productID = req.params.id;
  try {
    const product = await pool.query(
      "SELECT * FROM producto WHERE ID_producto = ?",
      [productID]
    );
    const infoSeller = await pool.query(
      "SELECT usuario.nombre, usuario_vendedor.reputacion, usuario_vendedor.ventasRealizadas FROM producto INNER JOIN usuario_vendedor ON id_vendedor = usuario_vendedor.ID_usuarioVendedor INNER JOIN usuario ON usuario_vendedor.ID_usuario = usuario.ID_usuario WHERE ID_producto = ?",
      [productID]
    );
    if (product[0].length > 0) {
      const response = { product: product[0], seller: infoSeller[0] };
      res.send(response);
    } else {
      res.status(404).send("producto no encontrado");
    }
  } catch (err) {
    console.error("Error al consultar los productos", err);
    res.status(500).send("Error interno del server");
  }
};

export const getProductBySeller = async (req, res) => {
  const { nombre, email } = req.body;
  try {
    //TENGO QUE OBTENER EL ID PERO DE VENDEDOR

    const userQuery = await pool.query(
      "SELECT ID_usuarioVendedor FROM usuario INNER JOIN usuario_vendedor ON usuario.ID_usuario = usuario_vendedor.ID_usuario WHERE nombre LIKE ? AND email LIKE ?;",
      [nombre, email]
    );

    const productsQuery = await pool.query(
      "SELECT * FROM producto WHERE producto.id_vendedor = ?",
      [userQuery[0][0].ID_usuarioVendedor]
    );

    const products = productsQuery[0];
    console.log(products);
    res.send(products);
  } catch (err) {
    console.error("Error al consultar los productos", err);
    res.status(500).send("Error interno del server");
  }
};
