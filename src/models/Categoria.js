import db from "../db.js";
class Categoria {
  id;
  nombre;
  constructor() {}

  async getAllCategories(parameters = {}) {
    try {
      const pool = await db.getConection();
      const request = pool.request();

      const query = "select * from categorias";

      for (key in parameters) {
        request.input(key, parameters[key]);
      }

      const result = await request.query(query);
      return result.recordset;
    } catch (e) {
      console.error("Error al obtener categorias", e);
    } /* finally {
      await db.closeConection();
    } */
  }

  async getcategorieIdByName(parameters = {}) {
    try {
      const pool = await db.getConection();
      const request = pool.request();
      const query = "SELECT ID_categoria FROM categorias WHERE nombre = @n";

      for (const key in parameters) {
        request.input(key, parameters[key]);
      }

      const result = await request.query(query);
      return result.recordset[0].ID_categoria;
    } catch (e) {
      console.error("Error al obtener categoria", e);
    } /* finally {
      await db.closeConection();
    } */
  }
}

const categoria = new Categoria();

export default categoria;
