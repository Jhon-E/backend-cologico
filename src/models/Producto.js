import pool from "../db.js";

class Producto {
  id;
  id_cat;
  id_vendedor;
  nombre;
  desc;
  precio;
  stock;
  imagen;

  constructor() {}

  async createProduct(parameters = {}) {
    try {
      const columnMap = {
        e: "ID_categoria",
        g: "id_vendedor",
        a: "nombre",
        d: "descripcion",
        b: "precio",
        c: "stock",
        f: "imagen",
      };

     // const pool = await db.getConection();
      const request = pool.request();

      //const query = "INSERT INTO producto (nombre,precio,stock,descripcion,ID_categoria, imagen, id_vendedor) VALUES (@a,@b,@c,@d,@e,@f,@g)"

      // Agrega los parámetros al request si los hay
      for (const key in parameters) {
        if (columnMap[key]) {
          request.input(columnMap[key], parameters[key]);
        }
      }

      const result = await request.execute("sp_InsertarProductos");

      return result.recordset;
    } catch (e) {
      console.error("Error al crear producto: ", e);
      throw e;
    } /* finally {
      await db.closeConection();
    } */
  }

  async getProducts(parameters = {}) {
    try {
      //const pool = await db.getConection();
      const request = pool.request();

      for (const key in parameters) {
        request.input(key, parameters[key]);
      }

      const result = await request.execute("sp_MostrarProductos");

      return result.recordset;
    } catch (e) {
      console.error("Error al ejecutar la consulta:", e);
      throw e;
    } /* finally {
      await db.closeConection();
    } */
  }

  async getInfoSeller(parameters = {}) {
    try {
      const columnMap = {
        id: "ID_Producto",
      };
      //const pool = await db.getConection();
      const request = pool.request();

      for (const key in parameters) {
        if (columnMap[key]) {
          request.input(columnMap[key], parameters[key]);
        }
      }

      const result = await request.execute("sp_InformacionVendedor");

      return result.recordset;
    } catch (e) {
      console.error("Error al obtener informacion del vendedor:", e);
      throw e;
    } /* finally {
      await db.closeConection();
    } */
  }

  async getProduct(parameters = {}) {
    try {
      const columnMap = {
        id: "ID_Producto",
      };

      //const pool = await db.getConection();
      const request = pool.request();

      for (const key in parameters) {
        if (columnMap[key]) {
          request.input(columnMap[key], parameters[key]);
        }
      }

      const result = await request.execute("sp_BusquedaProducto");

      return result.recordset;
    } catch (e) {
      console.error("Error al ejecutar la consulta:", e);
      throw e;
    } /* finally {
      await db.closeConection();
    } */
  }

  async getProductBySeller(parameters = {}) {
    try {
      //const pool = await db.getConection();
      const request = pool.request();

      for (const key in parameters) {
        request.input(key, parameters[key]);
      }

      const query = "SELECT * FROM producto WHERE producto.id_vendedor = @i";

      const result = await request.query(query);

      return result.recordset;
    } catch (e) {
      console.error("Error al obtener productos del vendedor: ", e);
    }
  }
}

const producto = new Producto();

export default producto;
