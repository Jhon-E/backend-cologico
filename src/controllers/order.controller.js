import Order from "../models/Order.js";
import Usuario from "../models/Usuario.js";

export const createOrder = async (req, res) => {
  const body = req.body;
  const pedido = body.slice(0, body.length - 1);
  const { token } = body.pop();
  const totalPagar = pedido.reduce(
    (acc, pro) => acc + pro.quantity * pro.precio,
    0
  );

  console.log(pedido);
  
  const order = new Order();
  try {
    const user = await new Usuario().findUser(
      "SELECT * FROM usuario WHERE token = @parameter1",
      { parameter1: token }
    );

    try {
      await order.saveOrder({
        idUsuario: user.ID_usuario,
        Estado: "En curso",
        totalPagar: totalPagar,
      });

      const idPedido = await order.getOrderID();
      console.log({ id_ultimo_pedi: idPedido });

      for (const pro of pedido) {
        await order.saveItem({
          id_pedido: idPedido,
          id_producto: pro.ID_producto,
          cantidad_productos: pro.quantity,
        });
      }

      res.status(201).send({ message: "Pedido creado exitosamente" });
      
    } catch (e) {
      console.error("Error al crear pedido o insertar productos: ", e);
      res.status(500).send("Error al procesar el pedido");
    }
  } catch (err) {
    console.error("Error al encontrar usuario: ", err);
    res.status(500).send("Error al verificar el usuario");
  }
};


export const getOrder = async (req, res) => {
  const { token } = req.query;

  try {
    const user = await new Usuario().findUser(
      "SELECT * FROM usuario WHERE token = @parameter1",
      { parameter1: token }
    );
    const order = await new Order().getOrder({ idUsuario: user.ID_usuario });

    const productsOrder = await new Order().getProductsByOrder({
      id_p: order.ID_pedido,
    });

    console.log({productsOrder });
    

    res.status(200).send({ order, products: productsOrder });
  } catch (err) {
    console.error("Error al obtener la orden: ", err);
    res.status(500).send("Internal server error");
  }
};
