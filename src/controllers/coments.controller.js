import { pool } from "../db.js";
import dotenv from "dotenv";

dotenv.config();

export const getComentsByProduct = async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  const id_pro = parseInt(req.params.idPro);
  try {
    const coments = await pool.query(
      "SELECT usuario.nombre, usuario.avatar, comentario_pro.contenido, fecha FROM comentario_pro INNER JOIN usuario ON usuario.ID_usuario = comentario_pro.id_usuario INNER JOIN producto ON producto.ID_producto = comentario_pro.id_producto WHERE comentario_pro.id_producto = ?",
      [id_pro]
    );
    console.log(coments[0]);
    res.send(coments[0]);
  } catch (err) {
    console.error("Error al consultar la database", err);
    res.status(500).send("Error interno del server a");
  }
};

export const createCommentAt = async (req, res) => {
  const { token, id_producto, contenido } = req.body;
  res.header("Access-Control-Allow-Origin", "*");

  try {
    const idUsuario = await pool.query(
      "SELECT * FROM usuario WHERE token LIKE ?",
      [token]
    );
    console.log(idUsuario[0][0]);
    await pool.query(
      "INSERT INTO comentario_pro (id_usuario, id_producto, contenido) VALUES (?,?,?)",
      [idUsuario[0][0].ID_usuario, id_producto, contenido]
    );

    res.status(201).send("Comentario publicado.");
  } catch (err) {
    res.status(500).send("Internal server error.");
  }
};
