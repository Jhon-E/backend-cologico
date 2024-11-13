import db from "../db.js";
import Usuario from "../models/Usuario.js";
import { generateAccesToken } from "./auth.controller.js";

/* export const getUsers = async (req, res) => {
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
}; */

/* export const getVendedor = async (req, res) => {
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
}; */

export const updateRol = async (req, res) => {
  const { rol, nombre, email } = req.body;
  try {
    const exist = await new Usuario().findUser(
      "SELECT avatar FROM usuario WHERE nombre LIKE @parameter1 AND email LIKE @parameter2",
      { parameter1: nombre, parameter2: email }
    );

    if (!!exist) {
      const user = {
        nombre,
        email: email,
        avatar: exist.avatar,
        rol,
      };
      const newToken = generateAccesToken({ user });

      //Luego de actualizar el rol actualizo el nuevo token de acceso
      const result = await new Usuario().updateRol({
        i: rol,
        e: email,
        n: nombre,
      });

      await new Usuario().updateToken({
        a: newToken,
        e: email,
        b: nombre,
        r: rol,
      });
      res.send(result);
    }
  } catch (err) {
    console.error("Error al actualizar rol: ", err);
  }
};
