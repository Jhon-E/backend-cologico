import { pool } from "../db.js";

export const getUsers = async (req, res) => {
  try {
    const users = await pool.query(
      "INSERT INTO categorias (nombre,descripcion) VALUES (?,?)",
      [nombre, descripcion]
    );
    res.status(200).send(users[0]);
  } catch (err) {
    console.error("Error al consultar la database", err);
    res.status(500).send("Error interno del server a");
  }
};

export const getVendedor = async (req, res) => {
  const userID = req.params.id;
  try {
    const user = await pool.query(
      "SELECT * FROM usuario WHERE ID_usuario = ?",
      [userID]
    );
    if (user[0].length > 0) {
      res.send(user[0]);
    } else {
      res.status(404).send("Usuario no encontrado");
    }
  } catch (err) {
    console.error("Error al consultar los productos", err);
    res.status(500).send("Error interno del server");
  }
};