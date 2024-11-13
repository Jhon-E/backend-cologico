import Comentario from "../models/Comentario.js";
import dotenv from "dotenv";
import Usuario from "../models/Usuario.js";

dotenv.config();

export const getComentsByProduct = async (req, res) => {
  const id_pro = parseInt(req.params.idPro);
  try {
    const coments = await new Comentario().getComments({ id: id_pro });
    res.send(coments);
  } catch (err) {
    console.error("Error al consultar los comentarios: ", err);
    res.status(500).send("Error interno del server a");
  }
};

export const createCommentAt = async (req, res) => {
  const { token, id_producto, contenido, date } = req.body;

  const comentario = new Comentario();

  const fecha = new Date(date).toISOString().split('T')[0];

  try {
    const id_user = await new Usuario().findUser(
      "SELECT ID_usuario FROM usuario WHERE token = @t",
      { t: token }
    );

    const result = await comentario.saveComment({ a: id_user.ID_usuario, b:id_producto, c: contenido, d: fecha})
    console.log(result);

    res.send(result);
  } catch (err) {
    console.log("Error al guardar comentario: ",err);
    res.status(500).send("Internal server error.");
  }
};
