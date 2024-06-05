import { pool } from "../db.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

function generateAccesToken(user) {
  return jwt.sign(user, process.env.SECRET);
}
//el objeto pool es asincrono y me devuelve una promesa.

export const signUpUser = async (req, res) => {
  const { nombre, email, avatar, password, rol } = req.body;
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");

  console.log(req.body);

  const usuario = await pool.query(
    `SELECT * FROM usuario WHERE nombre LIKE ? AND email LIKE ?;`,
    [nombre, email]
  );

  if (usuario[0].length > 0) {
    res.status(409).send("El usuario ya existe.");
  } else {
    const user = { nombre, email, avatar, password, rol };
    const accestToken = generateAccesToken(user);

    try {
      await pool.query(
        "INSERT INTO usuario (ID_rol, nombre, email, password, token) VALUES(?, ?, ?, ?, ?)",
        [rol, nombre, email, password, accestToken]
      );
      res.send({
        accestToken,
      });
    } catch (err) {
      console.error("Error al insertar el usuario: ", err);
      res.status(500).send("Error interno del servidor");
    }
  }
  res.end();
};

export const logInUser = async (req, res) => {
  const { email, password } = req.body;
  res.header("Access-Control-Allow-Origin", "*");
  console.log(req.body);
  try {
    const tokenQuery = await pool.query(
      `SELECT token FROM usuario WHERE email LIKE ? AND password LIKE ?`,
      [email, password]
    );
    const token = tokenQuery[0][0];
    if (token) {
      const user = await pool.query(
        "SELECT * FROM usuario WHERE token LIKE ?",
        [token.token]
      );
      res.send({
        nombre: user[0][0].nombre,
        avatar: user[0][0].avatar,
        rol: user[0][0].ID_rol,
        accest_token: token.token,
      });
    } else {
      res.status(404).send("No existe el usuario.");
    }
  } catch (err) {
    console.error("Error al consultar la ddbb");
    res.status(500).send("Error interno del server pa");
  }
  res.end();
};

export const getUserSession = async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  const token = req.headers.authorization.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    res.send(decoded);
  } catch (err) {
    console.error("token no válido:", err.message);
  }
  res.end();
};

export const updateRol = async (req, res) => {
  const { rol, nombre, email } = req.body;
  try {
    await pool.query(
      "UPDATE usuario SET ID_rol = ? WHERE email LIKE ? AND nombre LIKE ?",
      [rol, email, nombre]
    );
    res.status(200).send("ok!")
  } catch (err) {
    console.error("Error al actualizar: ", err);
  }
};
