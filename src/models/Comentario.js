import pool from "../db.js";

class Comentario {
  id;
  id_user;
  id_prod;
  contenido;
  constructor() {}

  createComment(id_user, id_pro, contenido) {
    this.id_user = id_user
    this.id_prod = id_pro;
    this.contenido = contenido;
  }

  async getComments(parameters = {}) {
    try {
      //const pool = await db.getConection();
      const request = pool.request();

      const query = "SELECT u.nombre, u.avatar, c.contenido, c.fecha FROM comentario_pro c INNER JOIN usuario u ON u.ID_usuario = c.id_usuario INNER JOIN vs_Productos v ON v.ID_producto = c.id_producto WHERE c.id_producto = @id"

      for (const key in parameters) {
        request.input(key, parameters[key]);
      }

      const result = await request.query(query);

      return result.recordset;
    } catch (e) {
      console.error("Error al obtener comentarios: ", e);
      
    } /* finally {
      await db.closeConection();
    } */
  }

  async saveComment(parameters = {}) {
    try {
      //const pool = await db.getConection();
      const request = pool.request();

      const query = "INSERT INTO comentario_pro (id_usuario, id_producto, contenido, fecha) VALUES (@a,@b,@c,@d)";

      for (const key in parameters) {
        request.input(key, parameters[key]);
      }

      const result = await request.query(query);

      console.log(result);
      

      return result.recordset;
    } catch (e) {
      console.error("Error al insertar producto: ", e);
      
    } /* finally {
      await db.closeConection();
    } */
  }
}

export default Comentario;
