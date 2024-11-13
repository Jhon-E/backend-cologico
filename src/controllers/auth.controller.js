import Usuario from "../models/Usuario.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export function generateAccesToken(user) {
  return jwt.sign(user, process.env.SECRET);
}

export const signUpUser = async (req, res) => {
  const { nombre, email, avatar, password, rol } = req.body;

  const user = new Usuario(nombre, email, avatar, null, rol);

  if (!nombre || !email || !password || !rol) {
    return res.status(400).send("Todos los campos son obligatorios");
  }

  try {
    const exist = await user.findUser(
      "SELECT * FROM usuario WHERE nombre LIKE @parameter1 AND email LIKE @parameter2",
      { parameter1: nombre, parameter2: email }
    );

    if (!!exist) {
      return res.status(409).send({ message: "El usuario ya está registrado" });
    }
    const accestToken = generateAccesToken({ user });

    await user.signUpUser({
      a: rol,
      b: nombre,
      c: email,
      d: password,
      f: accestToken,
    });

    res.status(201).send({ accestToken });
  } catch (e) {
    console.error("Error al registrar: ", e);
    res.status(501).send("Error interno del server");
  }
};

export const logInUser = async (req, res) => {
  const { email, password } = req.body;
  const user = new Usuario(null, email, null, password, null);

  try {
    const exist = await user.findUser(
      "SELECT * FROM usuario WHERE email = @parameter2",
      { parameter2: email }
    );

    if (!exist) {
      return res.status(409).send({ message: "El usuario no está registrado." });
    }

    const userToken = await user.logInUser({ email, password });
    const userDecoded = jwt.verify(userToken.token, process.env.SECRET);

    console.log({ ...userDecoded, token: userToken.token });
    res.status(200).send({ ...userDecoded, token: userToken.token });

  } catch (err) {
    console.error("Error al consultar la base de datos", err);
    res.status(500).send({ message: "Error interno del servidor." });
  }
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
