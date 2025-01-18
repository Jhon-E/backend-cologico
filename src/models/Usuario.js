import pool from "../db.js";
import dotenv from "dotenv";

dotenv.config();

class Usuario {
  id_rol;
  token;
  contra;
  avatar;
  nombre;
  email;

  constructor(nombre, email, avatar, password, rol) {
    this.id_rol = rol;
    this.contra = password;
    this.avatar = avatar;
    this.nombre = nombre;
    this.email = email;
  }

  async findUser(query, parameters = {}) {
    try {
     // const pool = await db.getConection();
      const request = pool.request();

      for (const key in parameters) {
        request.input(key, parameters[key]);
      }

      const result = await request.query(query);

      return result.recordset[0];
    } catch (e) {
      console.error("Error al buscar usuario: ", e);
      throw e;
    } /* finally {
      await db.closeConection();
    } */
  }

  async signUpUser(parameters = {}) {
    try {
      //const pool = await db.getConection();
      const request = pool.request();

      const query =
        "INSERT INTO usuario (ID_rol, nombre, email, password, avatar, token) VALUES(@a, @b, @c, @d, @r, @f)";

      for (const key in parameters) {
        request.input(key, parameters[key]);
      }

      const result = await request.query(query);

      return result.recordset;
    } catch (e) {
      console.error("Error al ejecutar la consulta de registrar usuario:", e);
      throw e;
    } /* finally {
      await db.closeConection();
    } */
  }

  async logInUser(parameters = {}) {
    try {
      const accestToken = await this.findUser(
        "SELECT token FROM usuario WHERE email = @parameter1 AND password = @parameter2",
        { parameter1: parameters.email, parameter2: parameters.password }
      );

      const query =
        "SELECT token FROM usuario WHERE email LIKE @email AND password LIKE @password";

      //const pool = await db.getConection();
      const request = pool.request();

      if (!accestToken) {
        return { message: "No existe este usuario." };
      }

      for (const key in parameters) {
        request.input(key, parameters[key]);
      }

      const result = await request.query(query);

      return result.recordset[0];
    } catch (e) {
      console.error("Error al loguear: ", e);
    } /* finally {
      await db.closeConection();
    } */
  }

  async updateRol(parameters = {}) {
    try {
      //const pool = await db.getConection();
      const request = pool.request();

      const query =
        "UPDATE usuario SET ID_rol = @i WHERE email LIKE @e AND nombre LIKE @n";

      for (const key in parameters) {
        request.input(key, parameters[key]);
      }

      const result = await request.query(query);
      return result.recordset;
    } catch (e) {
      console.error("Error al actualizar usuario: ", e);
      throw e;
    } /* finally {
      await db.closeConection();
    } */
  }

  async updateToken(parameters = {}) {
    try {
      //const pool = await db.getConection();
      const request = pool.request();

      for (const key in parameters) {
        request.input(key, parameters[key]);
      }

      const query =
        "update usuario set token = @a where email like @e and nombre like @b and ID_rol = @r";

      const result = await request.query(query);

      return result;

    } catch (e) {
      console.log("Error al actualizar el token: ", e);
    } /* finally {
      await db.closeConection();
    } */
  }
}

export default Usuario;