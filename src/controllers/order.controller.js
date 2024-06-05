import { pool } from "../db.js";

export const createOrder = async (req, res) => {
  const body = req.body;
  const pedido = body.slice(0, body.length - 1);
  const totalPagar = pedido.reduce(
    (acc, pro) => acc + pro.quantity * pro.precio,
    0
  );
  const queryUser = await pool.query(
    "SELECT ID_usuario FROM usuario WHERE email LIKE ?",
    [body.pop()]
  );
  const idUser = queryUser[0][0].ID_usuario;
  //CREO EL PEDIDO
  try {
    await pool.query(
      "INSERT INTO pedido (idUsuario,Estado, totalPagar) VALUES (?,?,?)",
      [idUser, "En curso", totalPagar]
    );
    //INSERTO LOS PRODUCTOS EN PEDIDO_ITEM
    try {
      const idPedidoQuery = await pool.query(
        "SELECT MAX(ID_pedido) AS 'ID_pedido' from pedido"
      );
      const idPedido = idPedidoQuery[0][0].ID_pedido;
      console.log(idPedidoQuery);
      pedido.map(async (pro) => {
        await pool.query(
          "INSERT INTO pedido_item (id_pedido, id_producto, cantidad_productos) VALUES (?,?,?)",
          [idPedido, pro.ID_producto, pro.quantity]
        );
      });

      res.status(200).send("Pedido creado!");
    } catch (err) {
      console.error("Error al insertar los items del pedido: ", err);
    }
  } catch (err) {
    console.error("error al crear pedido: ", err);
  }
};

export const getOrder = async (req, res) => {
  const { nombre, email } = req.query;

  const queryUser = await pool.query(
    "SELECT ID_usuario FROM usuario WHERE nombre LIKE ? AND email LIKE ?",
    [nombre, email]
  );

  const userId = queryUser[0][0].ID_usuario;

  try {
    const orderQuery = await pool.query('SELECT * FROM pedido WHERE idUsuario = ? ORDER BY ID_pedido DESC LIMIT 1',[userId])

    const productsOrder = await pool.query('CALL obtenerProductosPedido(?)',[orderQuery[0][0].ID_pedido])

    res.status(200).send({ order: orderQuery[0][0], products: productsOrder[0][0]});
    console.log(orderQuery[0][0])
  } catch (err) {
    console.error("Error al obtener la orden: ", err);
    res.status(500).send("Internal server error")
  }
};
