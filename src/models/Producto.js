import db from "../db.js";

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
      const pool = await db.getConection();
      const request = pool.request();

      const query = "INSERT INTO producto (nombre,precio,stock,descripcion,ID_categoria, imagen, id_vendedor) VALUES (@a,@b,@c,@d,@e,@f,@g)"

      // Agrega los parámetros al request si los hay
      for (const key in parameters) {
        request.input(key, parameters[key]);
      }

      const result = await request.query(query);

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
      const pool = await db.getConection();
      const request = pool.request();

      const query = "SELECT p.*, c.nombre as Nombre_cat FROM producto as p inner join categorias as c on c.ID_categoria = p.ID_categoria"

      for (const key in parameters) {
        request.input(key, parameters[key]);
      }

      const result = await request.query(query);      

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
      const pool = await db.getConection();
      const request = pool.request();

      const query = "SELECT usuario.nombre, usuario_vendedor.reputacion, usuario_vendedor.ventasRealizadas FROM producto INNER JOIN usuario_vendedor ON id_vendedor = usuario_vendedor.ID_usuarioVendedor INNER JOIN usuario ON usuario_vendedor.ID_usuario = usuario.ID_usuario WHERE ID_producto = @id"

      for (const key in parameters) {
        request.input(key, parameters[key]);
      }

      const result = await request.query(query);      

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
      const pool = await db.getConection();
      const request = pool.request();

      const query = "SELECT * FROM producto WHERE ID_producto = @id"

      for (const key in parameters) {
        request.input(key, parameters[key]);
      }

      const result = await request.query(query);      

      return result.recordset;
    } catch (e) {
      console.error("Error al ejecutar la consulta:", e);
      throw e;
    } /* finally {
      await db.closeConection();
    } */
  }

  async getProductBySeller( parameters ={} ){
    try {
      const pool = await db.getConection();
      const request = pool.request();

      for(const key in parameters){
        request.input(key,parameters[key])
      }

      const query = "SELECT * FROM producto WHERE producto.id_vendedor = @i"

      const result = await request.query(query)

      return result.recordset
    } catch (e){
      console.error("Error al obtener productos del vendedor: ", e);
      
    }
  }
}

const producto = new Producto();

export default producto;
